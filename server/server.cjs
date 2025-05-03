// this is for testing
// ref: https://qualitywithmillan.github.io/tutorial/running-api-server-in-10-minutes.html
// https://apipark.com/techblog/en/how-to-set-up-an-api-a-step-by-step-guide-for-beginners-7/

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');

const SECRET_KEY = 'your-secret-key';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

function isAuthenticated({ email, password }) {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;
}

function getUserData({ email }) {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
  return userdb.users.find(user => user.email === email);
}

if (!fs.existsSync('./users.json')) {
  fs.writeFileSync('./users.json', JSON.stringify({ users: [] }));
}

server.use(middlewares);
server.use(bodyParser.json());

server.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!isAuthenticated({ email, password })) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }

  const userData = getUserData({ email });
  const access_token = createToken({ email, name: userData.name, _id: userData._id });

  res.status(200).json({ token: access_token });
});

server.post('/signup', (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));


  const userIndex = userdb.users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  const _id = Date.now().toString();
  const newUser = { _id, name, email, password, avatar: avatar || '' };
  userdb.users.push(newUser);

  fs.writeFileSync('./users.json', JSON.stringify(userdb));

  res.status(201).json({ _id, name, email, avatar: avatar || '' });
});

// Get current user endpoint
server.get('/users/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    // Get user data
    const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
    const user = userdb.users.find(user => user.email === decoded.email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data without password
    const { password, ...userData } = user;
    res.status(200).json(userData);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update user profile
server.patch('/users/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const { name, avatar } = req.body;

    // Get user data
    const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
    const userIndex = userdb.users.findIndex(user => user.email === decoded.email);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    if (name) userdb.users[userIndex].name = name;
    if (avatar) userdb.users[userIndex].avatar = avatar;

    fs.writeFileSync('./users.json', JSON.stringify(userdb));

    // Return updated user data without password
    const { password, ...userData } = userdb.users[userIndex];
    res.status(200).json(userData);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

server.use(/^(?!\/signin|\/signup).*$/, (req, res, next) => {
  // Skip authentication for GET /items
  if (req.method === 'GET' && req.url === '/items') {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Custom item routes for likes
server.put('/items/:id/likes', (req, res) => {
  const itemId = parseInt(req.params.id);
  const db = router.db.getState();

  // Find the item
  const item = db.items.find(item => item._id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Initialize likes array if it doesn't exist
  if (!item.likes) {
    item.likes = [];
  }

  // Add user ID to likes if not already there
  if (!item.likes.includes(req.user._id)) {
    item.likes.push(req.user._id);
    router.db.write();
  }

  res.status(200).json(item);
});

server.delete('/items/:id/likes', (req, res) => {
  const itemId = parseInt(req.params.id);
  const db = router.db.getState();

  // Find the item
  const item = db.items.find(item => item._id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Initialize likes array if it doesn't exist
  if (!item.likes) {
    item.likes = [];
  }

  // Remove user ID from likes
  const likeIndex = item.likes.indexOf(req.user._id);
  if (likeIndex !== -1) {
    item.likes.splice(likeIndex, 1);
    router.db.write();
  }

  res.status(200).json(item);
});

// Custom route for adding items
server.post('/items', (req, res) => {
  const db = router.db.getState();
  const { name, imageUrl, weather } = req.body;

  if (!name || !imageUrl || !weather) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create new item with owner
  const newItem = {
    _id: Date.now(),
    name,
    imageUrl,
    weather,
    owner: req.user._id,
    likes: []
  };

  db.items.push(newItem);
  router.db.write();

  res.status(201).json(newItem);
});

// Custom route for deleting items
server.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const db = router.db.getState();

  // Find the item
  const itemIndex = db.items.findIndex(item => item._id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Check if user is the owner
  const item = db.items[itemIndex];
  if (item.owner && item.owner !== req.user._id) {
    return res.status(403).json({ message: 'You do not have permission to delete this item' });
  }

  // Remove the item
  db.items.splice(itemIndex, 1);
  router.db.write();

  res.status(200).json({ message: 'Item deleted successfully' });
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server with authentication is running on port 3001');
});
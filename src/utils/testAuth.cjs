// Auth Component Testing Script (CommonJS Version)
// This script helps test React auth components with mock API calls

// File: src/utils/testAuth.cjs

// Mock version of auth.js for testing components
const mockAuthAPI = {
  // Store for simulating a database during testing
  _users: [],
  _tokens: {}, // Map of tokens to user IDs for proper association
  _currentToken: null,

  // Reset the mock database
  reset() {
    this._users = [];
    this._tokens = {};
    this._currentToken = null;
    localStorage.removeItem('jwt');
    console.log('Auth test state reset');
  },

  // Add a test user
  addTestUser(user) {
    const existingUser = this._users.find(u => u.email === user.email);
    if (existingUser) {
      console.log('Test user already exists');
      return existingUser._id;
    }

    const userId = Date.now().toString();
    this._users.push({
      _id: userId,
      ...user
    });
    console.log('Test user added:', user.email);
    return userId;
  },

  // Register function (mock)
  register({ name, avatar, email, password }) {
    console.log('Mock register called:', { name, email });

    return new Promise((resolve, reject) => {
      // Check if user already exists
      const existingUser = this._users.find(u => u.email === email);
      if (existingUser) {
        return reject(new Error('User already exists'));
      }

      const userId = Date.now().toString();
      const newUser = {
        _id: userId,
        name,
        avatar,
        email,
        password
      };

      this._users.push(newUser);

      // Return user data without password
      const { password: _, ...userData } = newUser;
      resolve(userData);
    });
  },

  // Login function (mock)
  login({ email, password }) {
    console.log('Mock login called:', email);

    return new Promise((resolve, reject) => {
      // Find user
      const user = this._users.find(u => u.email === email && u.password === password);
      if (!user) {
        return reject(new Error('Invalid email or password'));
      }

      // Create mock token (in real app this would be JWT)
      this._currentToken = `mock_token_${Date.now()}`;

      // Associate token with this user ID
      this._tokens[this._currentToken] = user._id;

      // Store in localStorage as the real app would
      localStorage.setItem('jwt', this._currentToken);

      resolve({ token: this._currentToken });
    });
  },

  // Check token function (mock)
  checkToken(token) {
    console.log('Mock checkToken called with token:', token);

    return new Promise((resolve, reject) => {
      // Check if token exists in our records
      if (!this._tokens[token]) {
        return reject(new Error('Invalid token'));
      }

      // Find user associated with this token
      const userId = this._tokens[token];
      const user = this._users.find(u => u._id === userId);

      if (!user) {
        return reject(new Error('User not found'));
      }

      // Return user data without password
      const { password: _, ...userData } = user;
      resolve(userData);
    });
  },

  // Utility to verify login state
  isLoggedIn() {
    const token = localStorage.getItem('jwt');
    return token && this._tokens[token] ? true : false;
  },

  // Utility to get current user data
  getCurrentUser() {
    const token = localStorage.getItem('jwt');
    if (!token || !this._tokens[token]) return null;

    const userId = this._tokens[token];
    const user = this._users.find(u => u._id === userId);
    if (!user) return null;

    const { password: _, ...userData } = user;
    return userData;
  }
};

// Example of how to use this mock for testing
function demoUsage() {
  // Reset state
  mockAuthAPI.reset();

  // Add test user if testing login directly
  mockAuthAPI.addTestUser({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/300'
  });

  // Test registration
  mockAuthAPI.register({
    name: 'New User',
    email: 'new@example.com',
    password: 'newpass123',
    avatar: 'https://i.pravatar.cc/300'
  })
    .then(userData => {
      console.log('Registration successful:', userData);

      // Test login
      return mockAuthAPI.login({
        email: 'new@example.com',
        password: 'newpass123'
      });
    })
    .then(authData => {
      console.log('Login successful:', authData);

      // Test token validation
      return mockAuthAPI.checkToken(authData.token);
    })
    .then(userData => {
      console.log('Token validation successful:', userData);
      console.log('Is logged in?', mockAuthAPI.isLoggedIn());
      console.log('Current user:', mockAuthAPI.getCurrentUser());
    })
    .catch(err => {
      console.error('Test failed:', err);
    });
}

// If you want to run this directly from Node.js for testing
if (typeof window === 'undefined') {
  // Simulate localStorage for Node environment
  global.localStorage = {
    _data: {},
    setItem(key, value) {
      this._data[key] = value;
    },
    getItem(key) {
      return this._data[key];
    },
    removeItem(key) {
      delete this._data[key];
    }
  };

  // Run demo
  demoUsage();
} else {
  // Export for browser use
  if (typeof window !== 'undefined') {
    window.mockAuthAPI = mockAuthAPI;
    console.log('Mock Auth API ready for testing');
  }
}

// Export for CommonJS environments
module.exports = mockAuthAPI;
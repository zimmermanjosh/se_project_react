# Setting Up JSON Server with Authentication

Follow these steps to set up a JSON Server with authentication for testing your app:

## Step 1: Install Required Dependencies

```bash
# Make sure you have json-server installed globally
npm install -g json-server@0.17.4

# Install required dependencies for the authentication server
npm install jsonwebtoken body-parser
```

## Step 2: Create Initial Files

1. Create a `users.json` file in your project root:

```bash
echo '{"users": []}' > users.json
```

2. Make sure your `db.json` file is in the project root

## Step 3: Add Server Script to package.json

Add the following to your scripts section in package.json:

```json
"server": "node server.js"
```

## Step 4: Start the Server

```bash
npm run server
```

This will start the JSON Server with authentication on port 3001.

## Step 5: Test the API Endpoints

You can test the API endpoints using tools like Postman or curl:

### Register a new user:

```bash
curl -X POST http://localhost:3001/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "avatar": "https://i.pravatar.cc/300"
  }'
```

### Login:

```bash
curl -X POST http://localhost:3001/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

This will return a JWT token that you can use for authenticated requests.

### Get Current User:

```bash
curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Profile:

```bash
curl -X PATCH http://localhost:3001/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Updated Name",
    "avatar": "https://i.pravatar.cc/300?updated"
  }'
```

### Add Item:

```bash
curl -X POST http://localhost:3001/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Item",
    "imageUrl": "https://via.placeholder.com/300",
    "weather": "hot"
  }'
```

### Like Item:

```bash
curl -X PUT http://localhost:3001/items/ITEM_ID/likes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Unlike Item:

```bash
curl -X DELETE http://localhost:3001/items/ITEM_ID/likes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Delete Item:

```bash
curl -X DELETE http://localhost:3001/items/ITEM_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Step 6: Run your React app

In a separate terminal:

```bash
npm start
```

Your React app should now be able to communicate with the authentication-enabled JSON Server.

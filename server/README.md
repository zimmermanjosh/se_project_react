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
"server": "node server.cjs"
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


## Response when successful
```` return data
Auth test state reset
Test user added: test@example.com
Mock register called: { name: 'New User', email: 'new@example.com' }
Registration successful: {
_id: '1746145990224',
name: 'New User',
avatar: 'https://i.pravatar.cc/300',
email: 'new@example.com'
}
Mock login called: new@example.com
Login successful: { token: 'mock_token_1746145990225' }
Mock checkToken called with token: mock_token_1746145990225
Token validation successful: {
_id: '1746145990224',
name: 'New User',
avatar: 'https://i.pravatar.cc/300',
email: 'new@example.com'
}
Is logged in? true
Current user: {
_id: '1746145990224',
name: 'New User',
avatar: 'https://i.pravatar.cc/300',
email: 'new@example.com'
}
➜  se_project_react git:(sprint14/auth-reg) ✗ node src/utils/server-auth-test.cjs
Starting authentication tests...
🔍 STARTING SERVER AUTHENTICATION TESTS
🔍 Server: localhost:3001
🔍 Test user: dallas_tester@example.com
===== TESTING USER REGISTRATION =====
✅ Registration successful!
User data: {
_id: '1746146006694',
name: 'Dallas Tester',
email: 'dallas_tester@example.com',
avatar: 'https://i.pravatar.cc/300'
}
===== TESTING USER LOGIN =====
✅ Login successful!
Token received
===== TESTING USER PROFILE RETRIEVAL =====
✅ Profile retrieval successful!
User data: {
_id: '1746146006694',
name: 'Dallas Tester',
email: 'dallas_tester@example.com',
avatar: 'https://i.pravatar.cc/300'
}
===== TESTING COMPLETE =====
You can use this token for future API requests:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbGxhc190ZXN0ZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiRGFsbGFzIFRlc3RlciIsIl9pZCI6IjE3NDYxNDYwMDY2OTQiLCJpYXQiOjE3NDYxNDYwMDYsImV4cCI6MTc0NjE0OTYwNn0.iN1nQsti8skOKLynv6D11BWhBdWkc5b_aNfeApMx2Xw
```

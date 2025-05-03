// Simple Server Auth Test Script
// Tests WTWR server authentication endpoints

const http = require('http');

// Configuration
const BASE_URL = 'localhost';
const PORT = 3001;
const TEST_USER = {
  name: 'Dallas Tester',
  email: 'dallas_tester@example.com',
  password: 'dallas123',
  avatar: 'https://i.pravatar.cc/300'
};

// Helper function for making HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Step 1: Register a user
async function registerUser() {
  console.log('\n===== TESTING USER REGISTRATION =====');

  const options = {
    hostname: BASE_URL,
    port: PORT,
    path: '/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await makeRequest(options, TEST_USER);

    if (response.statusCode === 201) {
      console.log('✅ Registration successful!');
      console.log('User data:', response.data);
      return true;
    } else if (response.statusCode === 400 && response.data.message === 'User already exists') {
      console.log('ℹ️ User already exists - this is expected if test run multiple times');
      return true;
    } else {
      console.log('❌ Registration failed!');
      console.log('Status code:', response.statusCode);
      console.log('Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Error making registration request:', error.message);
    return false;
  }
}

// Step 2: Login
async function loginUser() {
  console.log('\n===== TESTING USER LOGIN =====');

  const options = {
    hostname: BASE_URL,
    port: PORT,
    path: '/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const loginData = {
    email: TEST_USER.email,
    password: TEST_USER.password
  };

  try {
    const response = await makeRequest(options, loginData);

    if (response.statusCode === 200 && response.data.token) {
      console.log('✅ Login successful!');
      console.log('Token received');
      return response.data.token;
    } else {
      console.log('❌ Login failed!');
      console.log('Status code:', response.statusCode);
      console.log('Response:', response.data);
      return null;
    }
  } catch (error) {
    console.log('❌ Error making login request:', error.message);
    return null;
  }
}

// Step 3: Get user profile
async function getUserProfile(token) {
  console.log('\n===== TESTING USER PROFILE RETRIEVAL =====');

  if (!token) {
    console.log('❌ Cannot test profile retrieval without valid token');
    return false;
  }

  const options = {
    hostname: BASE_URL,
    port: PORT,
    path: '/users/me',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await makeRequest(options);

    if (response.statusCode === 200) {
      console.log('✅ Profile retrieval successful!');
      console.log('User data:', response.data);
      return true;
    } else {
      console.log('❌ Profile retrieval failed!');
      console.log('Status code:', response.statusCode);
      console.log('Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Error making profile request:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🔍 STARTING SERVER AUTHENTICATION TESTS');
  console.log(`🔍 Server: ${BASE_URL}:${PORT}`);
  console.log(`🔍 Test user: ${TEST_USER.email}`);

  // Step 1: Register
  const registrationSuccess = await registerUser();

  // Step 2: Login
  const token = await loginUser();

  if (!token) {
    console.log('\n❌ Login failed - cannot continue with authenticated tests');
    return;
  }

  // Step 3: Get profile
  await getUserProfile(token);

  console.log('\n===== TESTING COMPLETE =====');
  console.log('You can use this token for future API requests:');
  console.log(token);
}

// Start the tests
console.log('Starting authentication tests...');
runTests().catch(error => {
  console.error('Test runner error:', error);
});
// from dot basic login test
// src/utils/testLogin.js

import { login, checkToken } from '../auth.jsx';

// Test login with valid credentials
async function testValidLogin() {
  console.log("=== Testing Valid Login ===");
  try {
    // Replace with a valid test account
    const response = await login({
      email: "test@example.com",
      password: "password123"
    });

    console.log("Login response:", response);

    if (response && response.token) {
      console.log("✅ Login successful, token received");

      // Test token validation
      try {
        const userData = await checkToken(response.token);
        console.log("User data:", userData);
        console.log("✅ Token validation successful");
      } catch (error) {
        console.error("❌ Token validation failed:", error);
      }
    } else {
      console.error("❌ Login failed: No token in response");
    }
  } catch (error) {
    console.error("❌ Login test failed with error:", error);
  }
}

// Test login with invalid credentials
async function testInvalidLogin() {
  console.log("\n=== Testing Invalid Login ===");
  try {
    const response = await login({
      email: "nonexistent@example.com",
      password: "wrongpassword"
    });

    console.log("Login response:", response);
    console.log("❌ Test failed: Login should have been rejected");
  } catch (error) {
    console.log("✅ Login correctly rejected:", error);
  }
}

// Run the tests
export function runLoginTests() {
  console.log("Starting login tests...");
  testValidLogin()
    .then(() => testInvalidLogin())
    .then(() => console.log("\nAll login tests completed"))
    .catch(err => console.error("Error running tests:", err));
}

// Export individual tests for manual running
export { testValidLogin, testInvalidLogin };
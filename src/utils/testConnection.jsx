// testConnection.jsx

const fetch = require('node-fetch');

const baseUrl = "http://localhost:3001";

const testConnection = async () => {
  try {
    // Test GET /items endpoint (public)
    console.log("\nTesting GET /items endpoint...");
    const itemsResponse = await fetch(`${baseUrl}/items`);
    if (!itemsResponse.ok) {
      throw new Error(`Error fetching items: ${itemsResponse.status}`);
    }
    const itemsData = await itemsResponse.json();
    console.log("✅ Items endpoint working!");
    console.log(`Found ${itemsData.data.length} items`);

    // Test user registration
    console.log("\nTesting user registration...");
    const testEmail = `test${Date.now()}@example.com`; // Unique email
    const registerResponse = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        avatar: "https://example.com/avatar.jpg",
        email: testEmail,
        password: "password123",
      }),
    });
    if (!registerResponse.ok) {
      throw new Error(`Error registering user: ${registerResponse.status}`);
    }
    const registerData = await registerResponse.json();
    console.log("✅ Registration endpoint working!");
    console.log("Registered user:", registerData);

    // Test user login
    console.log("\nTesting user login...");
    const loginResponse = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: testEmail,
        password: "password123",
      }),
    });
    if (!loginResponse.ok) {
      throw new Error(`Error logging in: ${loginResponse.status}`);
    }
    const loginData = await loginResponse.json();
    console.log("✅ Login endpoint working!");
    console.log("Received token:", loginData.token);

    // Test protected endpoint
    console.log("\nTesting protected endpoint (GET /users/me)...");
    const userResponse = await fetch(`${baseUrl}/users/me`, {
      headers: {
        "Authorization": `Bearer ${loginData.token}`,
      },
    });
    if (!userResponse.ok) {
      throw new Error(`Error accessing protected endpoint: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    console.log("✅ Protected endpoint working!");
    console.log("User data:", userData);

    console.log("\n🎉 All tests passed! Connection is working properly.");
  } catch (error) {
    console.error("\n❌ Connection test failed:", error.message);
  }
};

testConnection();
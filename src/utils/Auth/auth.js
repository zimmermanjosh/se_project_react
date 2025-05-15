// src/components/Auth/auth.js
const BASE_URL = "http://localhost:3001"; // Local JSON server URL

// helper fetch req
const request = (url, options) => {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
  });
};

// Login a user
export const login = ({email, password}) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  })
};

// Check if token is valid
export const checkToken = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
};

// Update user profile
export const updateUserProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error updating profile:", error);
      throw error;
    });
};

// Registration endpoint
export const register = ({ name, avatar, email, password }) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // If server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
};

// Login endpoint
export const login = ({ email, password }) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
};

// Check token validity
export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
};
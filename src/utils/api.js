const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status} ${res.statusText}}`);
  }
};

// GET request - public
export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
};

// POST request with auth
export const addItems = (data, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error adding items:", error);
      throw error;
    });
};

// DELETE request with auth
export const deleteItems = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error deleting items:", error);
      throw error;
    });
};

// AUTHENTICATION FUNCTIONS

// Register a new user
export const register = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error registering user:", error);
      throw error;
    });
};

// Login a user
export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error;
    });
};

// Check if token is valid
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error validating token:", error);
      throw error;
    });
};

// Get current user
export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error getting user data:", error);
      throw error;
    });
};

// Update user profile
export const updateUserProfile = (name, avatar, token) => {
  return fetch(`${baseUrl}/users/me`, {
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

// Like an item
export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error liking item:", error);
      throw error;
    });
};

// Remove like from item
export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error removing like:", error);
      throw error;
    });
};
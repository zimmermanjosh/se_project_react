const baseUrl = "http://localhost:3001";

const request = (url, options) => {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
  });
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }
};

// GET request - public
export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => checkResponse(res))
    .then((data) => data.data) // Important: The backend returns { data: items }
    .catch((error) => {
      console.error("Error fetching items:", error);
      throw error;
    });
};

// POST request with auth
export const addItems = (data) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse(res))
    .then((data) => data.data) // Important: The backend returns { data: item }
    .catch((error) => {
      console.error("Error adding items:", error);
      throw error;
    });
};

// DELETE request with auth
export const deleteItems = (id) => {
  const token = localStorage.getItem("jwt");
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
export const register = ({name, avatar, email, password}) => {
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

// Like an item
export const addCardLike = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data.data) // Important: The backend returns { data: item }
    .catch((error) => {
      console.error("Error liking item:", error);
      throw error;
    });
};

// Remove like from item
export const removeCardLike = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data.data) // Important: The backend returns { data: item }
    .catch((error) => {
      console.error("Error removing like:", error);
      throw error;
    });
};
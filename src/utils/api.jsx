import { BASE_URL } from "./config.jsx";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }
};

// Helper function for fetching
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// GET request - public
export const getItems = () => {
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return request(`${BASE_URL}/items`, { headers })
    .then((data) => data.data);
};

// POST request with auth
export const addItems = (data) => {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.data)
    .catch((error) => {
      console.error("Error adding items:", error);
      throw error;
    });
};

// DELETE request with auth
export const deleteItems = (id) => {
  console.log("🔧 Frontend deleteItems called with:", id);
  console.log("🔧 ID type:", typeof id);
  console.log("🔧 ID length:", id?.length);

  const token = localStorage.getItem("jwt");
  const fullUrl = `${BASE_URL}/items/${id}`;
  console.log("🔧 Full delete URL:", fullUrl);

  return request(`${BASE_URL}/items/${id}`, {
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

// Like an item
export const addCardLike = (id) => {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((data) => data.data)
    .catch((error) => {
      console.error("Error liking item:", error);
      throw error;
    });
};

// Remove like from item
export const removeCardLike = (id) => {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((data) => data.data)
    .catch((error) => {
      console.error("Error removing like:", error);
      throw error;
    });
};
const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

// GET request
export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
};

// POST request
export const addItems = (data) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error adding items:", error);
      throw error;
    });
};

// DELETE request
export const deleteItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => checkResponse(res))
    .catch((error) => {
      console.error("Error deleting items:", error);
      throw error;
    });
};


// helper fetch req
const request = (url, options) => {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
  });
}

// Update user profile
export const updateUserProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");
  return request(`${url}/users/me`, {
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


import { checkResponse } from "./api.jsx";
import {BASE_URL} from "./config.jsx";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}


export const register = ({ name, avatar, email, password }) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};
export const login = ({email, password}) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email, password}),
  });
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

// Update user profile
export const updateUserProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");

  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({name, avatar}),
  });
};

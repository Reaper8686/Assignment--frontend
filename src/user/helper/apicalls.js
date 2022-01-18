import {API} from "../../backendApi";

export const registerUser = (user) => {
  return fetch(`${API}/user/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const loginUser = (user) => {
  return fetch(`${API}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    next();
  }
};

export const isAuthenticate = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return false;
};

export const orderDetails = (userId) => {
  return fetch(`${API}/order/${userId}`, {method: "GET"})
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

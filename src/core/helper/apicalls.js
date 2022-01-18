import {API} from "../../backendApi";

export const AllProducts = () => {
  return fetch(`${API}/products`, {method: "GET"})
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const orderProducts = (order) => {
  return fetch(`${API}/order/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

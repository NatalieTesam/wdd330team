const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  console.log(response);
  console.log("baseURL" + baseURL);
  // response is expected to have an accessToken property (or be the token directly)
  // handle both shapes: { accessToken: '...' } or '...'
  return response?.accessToken ?? response;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  // The API may return { orders: [...] } or { Result: [...] } or the array directly
  return response.orders || response.Result || response || [];
}
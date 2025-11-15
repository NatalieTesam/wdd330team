import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    console.log("Orders received:", orders);
    const parent = document.querySelector(`${selector} tbody`);
    console.log("Parent element:", parent);
    if (!Array.isArray(orders)) {
      console.warn("Orders is not an array:", orders);
      parent.innerHTML = "<tr><td colspan='4'>No orders found</td></tr>";
      return;
    }
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

function orderTemplate(order) {
    // console.log(order)
    return `<tr><td>${order.id}</td>
    <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
    <td>${order.items?.length || 0}</td>
    <td>${order.orderTotal}</td></tr>`;
}
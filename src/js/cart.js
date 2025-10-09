import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.closest(".cart-card").dataset.id;
      removeCartItem(itemId);
    });
  });
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider" data-id="${item.Id}">
    <button class="remove-item" aria-label="Remove item">✕</button>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function removeCartItem(itemId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id != itemId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();

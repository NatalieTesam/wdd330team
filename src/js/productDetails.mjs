import { findProductById } from "./productData.mjs";
import {
  getLocalStorage,
  setLocalStorage,
  renderWithTemplate,
} from "./utils.mjs";

let product = {};

// get product details using 'productId'
export default async function productDetails(productId) {
  product = await findProductById(productId);
  if (product != undefined) {
    // renderProductDetails();
    renderWithTemplate(
      productDetailsTemplate,
      document.querySelector("main"),
      product,
    );
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } else {
    document.querySelector("main").innerHTML = `
      <section class="error-message">
        <h2>Product not found.</h2>
      </section>`;
  }
}

// add item to cart
function addToCart() {
  // Get whatever is already in local storage
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems && Object.keys(cartItems).length ? [cartItems] : [];
  }
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);

  // 🪄 Animate the cart icon
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.classList.remove("cart-animate"); // reset if it’s mid-animation
    void cartIcon.offsetWidth; // force reflow to restart animation
    cartIcon.classList.add("cart-animate");
  }
}

function productDetailsTemplate(product) {
  const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
  const discountPercent = (discountAmount / product.SuggestedRetailPrice) * 100;

  return `
    <section class="product-detail" id="product-detail">
      <h3 id="productName">${product.Brand.Name}</h3>
      <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
      <img id="productImage" class="divider" src="${product.Image}" alt="${product.Name}" />
      <p class="card__price">
        <span class="final-price">$${product.FinalPrice.toFixed(2)}</span>
        <span class="suggested-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
       ${
         discountAmount > 0
           ? `
  <p class="discount-indicator">
    You save $${discountAmount.toFixed(2)} (${discountPercent.toFixed(0)}% off)
  </p>`
           : ""
       }

      </p>
      <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
      <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

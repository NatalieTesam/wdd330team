import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, renderWithTemplate } from "./utils.mjs";

let product = {};

// get product details using 'productId'
export default async function productDetails(productId) {
  product = await findProductById(productId);
  if (product != undefined) {
    // renderProductDetails();
    renderWithTemplate(productDetailsTemplate, document.querySelector("main"), product)
    document.getElementById("addToCart").addEventListener("click", addToCart);
  }
  else {
    document.querySelector("main").innerHTML = `
      <section class="error-message">
        <h2>Product not found.</h2>
      </section>`
  }
}

// add item to cart
function addToCart() {
  // Get whatever is already in local storage
  let cartItems = getLocalStorage("so-cart");
  // If it's not an array (e.g., null or a single object), convert it
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems && Object.keys(cartItems).length ? [cartItems] : [];
  }
  // Add the new product
  cartItems.push(product);
  // Save the updated array
  setLocalStorage("so-cart", cartItems);
}

// display the product details in each product page
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productSuggestedPrice").innerText = `$${product.SuggestedRetailPrice.toFixed(2)}`;
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}


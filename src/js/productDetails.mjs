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

function productDetailsTemplate(product) {
  return  `
    <section class="product-detail" id="product-detail">
      <h3 id="productName">${product.Brand.Name}</h3>
      <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
      <img id="productImage" class="divider" src="${product.Image}" alt="${product.Name}" />
      <p class="card__price">
        <span class="final-price">$${product.FinalPrice.toFixed(2)}</span>
        <span class="suggested-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      </p>
      <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
      <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `
}

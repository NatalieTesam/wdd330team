import { getData } from "./productData.mjs";
import { renderList } from "./utils.mjs";

function productCardTemplate(product) { 
    return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="card__price">
          <span class="final-price">$${product.FinalPrice.toFixed(2)}</span>
          <span class="suggested-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
        </p>
      </a>
    </li>
  `
}

export default async function productList(selector, category) {
// get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products

  const products = await getData(category);
  const filteredProducts = products.keys().filter(id => id != "989CG" || "880RT");
  console.log(filteredProducts);
  // render out the product list to the element
  renderList(productCardTemplate, el, products);
}

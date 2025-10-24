import { getData } from "./productData.mjs";
import { renderList, renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) { 
    return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
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
  console.log(products);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}

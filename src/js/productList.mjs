import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

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

export function sortContent(products, criteria) {
  const sorted = [...products]; // copy to avoid mutating

  switch (criteria) {
    case "nameAsc":
      sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      break;
    case "nameDesc":
      sorted.sort((a, b) => b.Name.localeCompare(a.Name));
      break;
    case "priceAsc":
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
      break;
    case "priceDesc":
      sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
      break;
  }
  return sorted;
};

export default async function productList(selector, category) {
// get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products

  const products = await getData(category);
  console.log(category);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;

  const dropdown = document.querySelector(".sortDropdown");
  if (dropdown) {
    dropdown.addEventListener("change", e => {
      const sorted = sortContent(products, e.target.value);
      renderListWithTemplate(productCardTemplate, el, sorted);
    });
  }
}


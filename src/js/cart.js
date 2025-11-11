import { renderCartContents } from "./shoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

(async () => {
  renderCartContents();
  await loadHeaderFooter();
})();

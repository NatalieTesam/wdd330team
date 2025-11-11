import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

(async () => {
  await loadHeaderFooter();
  checkoutProcess.init("so-cart", ".orderSummary");
})();


document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess),
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkoutForm"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  checkoutProcess.checkout(e.target);
});

// listening for click on the button
// document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
//   e.preventDefault();

//   checkoutProcess.checkout(document.forms['checkout']);
// });

import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { updateCartBadge } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId);

// Ensure the cart badge reflects current cart on product pages
updateCartBadge();

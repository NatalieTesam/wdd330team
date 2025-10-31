import productList, { sortContent } from "./productList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
productList(".product-list", category);

sortContent();
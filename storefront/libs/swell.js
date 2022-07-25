import swell from "swell-js";
import { SWELL_STOCK_STATUS } from "./constants";
import getWeb3 from "./web3";

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
);
export default swell;

/**
 *
 * @param {import("../types/swell").Product} product
 */
export function isInStock(product) {
  return (
    product.stock_status === SWELL_STOCK_STATUS.IN_STOCK ||
    isStockNotTracked(product)
  );
}

/**
 *
 * @param {import("../types/swell").Product} product
 */
export function isStockNotTracked(product) {
  return product.stock_status === null;
}

export async function getStoreProducts(opts) {
  const category = await getCategory("store");
  const storeCategories = category.children.results
    .sort((a, b) => a.sort - b.sort)
    .map(({ id }) => id)
    .concat([category.id]);

  const products = await getProducts({ ...opts, categories: storeCategories });

  return products;
}

export async function getProducts(opts) {
  /**
   * @type {{results: import("../types/swell").Product[]}}
   */
  const products = await swell.products.list({ ...opts });

  return products;
}

export async function getProduct(slugOrId) {
  /**
   * @type {import("../types/swell").Product}
   */
  const product = await swell.products.get(slugOrId);

  return product;
}

export async function getCategory(slugOrId) {
  /**
   * @type {{results: import("../types/swell").Product}}
   */
  const category = await swell.categories.get(slugOrId);

  return category;
}

/**
 *
 * @param {import("../types/swell").Cart} cart
 */
export function calculateCartPrice(cart, providedWeb3) {
  const web3 = providedWeb3 ?? getWeb3();
  if (!web3) {
    throw new Error("Web3 not loaded");
  }

  const BN = web3.utils.BN;

  /**
   * @type {import("bn.js")}
   */
  const total = cart.items?.reduce((acc, item) => {
    const p = new BN(item.product.attributes?.brute_price);

    return acc.add(p);
  }, new BN(0));

  return total;
}

export function getProductsQuery() {
  return getStoreProducts({
    expand: ["attributes"],
  });
}

export function getQuestsQuery() {
  return getProducts({
    category: "quests",
  });
}

export function getFAQQuery() {
  return getProduct("faq");
}

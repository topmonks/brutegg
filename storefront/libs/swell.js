import swell from "swell-js";

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
);
export default swell;

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
   * @type {{results: import("../../types/swell").Product}}
   */
  const product = await swell.products.get(slugOrId);

  return product;
}

export async function getCategory(slugOrId) {
  /**
   * @type {{results: import("../../types/swell").Product}}
   */
  const category = await swell.categories.get(slugOrId);

  return category;
}

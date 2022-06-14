import swell from "swell-js";

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY
);
export default swell;

export async function getProducts() {
  /**
   * @type {{results: import("../types/swell").Product[]}}
   */
  const products = await swell.products.list({ expand: ["variants"] });

  return products;
}

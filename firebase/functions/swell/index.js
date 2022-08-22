import { onMessagePublished } from "firebase-functions/v2/pubsub";

import swell from "swell-node";
import BN from "bn.js";

export const swellNodeClient = swell.createClient(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

export const recalculatespent = onMessagePublished(
  {
    topic: "projects/brute-gg/topics/recalculate-brute-spent",
    region: "us-central1",
    memory: "4GiB",
    minInstances: 0,
    maxInstances: 1,
    concurrency: 200,
  },
  async () => {
    let LIMIT = 1000;
    let page = 1;
    let hasNextPage = true;

    const usersSpent = {};

    while (hasNextPage && page < 100 /* safety break */) {
      let result = await swellNodeClient.get("/orders", {
        limit: LIMIT,
        page: page,
        expand: ["items.product"],
      });

      page += 1;
      hasNextPage = Boolean(result.pages?.[page]);

      for (const order of result.results) {
        /**
         * @type {import("bn.js")}
         */
        const total = order.items?.reduce((acc, item) => {
          const p = new BN(item.product.attributes?.brute_price);

          return acc.add(p);
        }, new BN(0));

        const userId = order.account_id;

        usersSpent[userId] = usersSpent[userId]
          ? usersSpent[userId].add(total)
          : total;
      }
    }

    for (const [userId, spent] of Object.entries(usersSpent)) {
      console.log({ userId, spent: spent.toNumber() });
      await swellNodeClient.put("/accounts/{id}", {
        id: userId,
        order_value: spent.toNumber(),
      });
    }
  }
);

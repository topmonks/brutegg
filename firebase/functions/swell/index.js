import { onMessagePublished } from "firebase-functions/v2/pubsub";

import swell from "swell-node";
import BN from "bn.js";

export const swellNodeClient = swell.createClient(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

async function* iterate(query) {
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && page < 100 /* safety break */) {
    let result = await query(page);

    yield result;

    page += 1;
    hasNextPage = Boolean(result.pages?.[page]);
  }
}

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

    const usersSpent = {};

    const ordersQuery = (page) =>
      swellNodeClient.get("/orders", {
        limit: LIMIT,
        page: page,
        expand: ["items.product"],
      });

    for await (const result of iterate(ordersQuery)) {
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

    // clear current brute spent, before new amount is assigned
    // in cases where orders of some users get deleted
    const usersQuery = (page) =>
      swellNodeClient.get("/accounts", {
        limit: LIMIT,
        page: page,
        where: {
          spent_brute: {
            $ne: null,
          },
        },
      });

    const userIdsWithSpent = Object.keys(usersSpent);

    for await (const result of iterate(usersQuery)) {
      for (const user of result.results) {
        // user with some spent will be updated anyway
        if (userIdsWithSpent.includes(user.id)) {
          continue;
        }

        await swellNodeClient.put("/accounts/{id}", {
          id: user.id,
          order_value: 0,
          spent_brute: null,
        });
      }
    }

    for (const [userId, spent] of Object.entries(usersSpent)) {
      console.log({ userId, spent: spent.toNumber() });
      await swellNodeClient.put("/accounts/{id}", {
        id: userId,
        order_value: spent.toNumber(),
        spent_brute: spent.toNumber(),
      });
    }
  }
);

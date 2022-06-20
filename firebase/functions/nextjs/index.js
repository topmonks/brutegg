import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";

import next from "next";

import config from "./next.config.cjs";

const app = next({
  conf: { ...config, distDir: "nextjs/.next" },
});
const handle = app.getRequestHandler();

const CACHE_EXCLUDE_PATH_REGEX = [
  /\/store(\.json)?$/,
  /\/store\/item\/.+\/.+$/,
  /\/quests(\.json)?$/,
  /\/quests\/.+\/.+$/,
  /\/faq(\.json)?$/,
];

export const server = onRequest(
  {
    cors: ["brute-gg.web.app"],
    // firebase hosting only supports us-central1
    region: "us-central1",
    memory: "2GiB",
    maxInstances: 100,
  },
  (request, response) => {
    logger.info("File: " + request.originalUrl, {
      structuredData: true,
    });

    if ([".js", ".css"].find((ext) => request.originalUrl.endsWith(ext))) {
      response.set(
        "Cache-Control",
        "public, max-age=31536000, s-maxage=31536000"
      ); //max-age=1year, s-maxage=1year
    }

    if (CACHE_EXCLUDE_PATH_REGEX.find((r) => r.test(request.path))) {
      logger.info("Exclude: " + request.path, {
        structuredData: true,
      });
    } else {
      // default cache
      response.set("Cache-Control", "public, max-age=300, s-maxage=86400"); //max-age=5minutes, s-maxage=1 day
    }

    return app.prepare().then(() => handle(request, response));
  }
);

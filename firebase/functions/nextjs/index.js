import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";

import next from "next";

import config from "./next.config.cjs";

const app = next({
  conf: { ...config, distDir: "nextjs/.next" },
});
const handle = app.getRequestHandler();

export const server = onRequest(
  {
    cors: ["brute-gg.web.app"],
    // firebase hosting only supports us-central1
    region: "us-central1",
    memory: "1GiB",
  },
  (request, response) => {
    logger.info("File: " + request.originalUrl, {
      structuredData: true,
    });

    response.set("Cache-Control", "public, max-age=300, s-maxage=3600"); //max-age=5minutes, s-maxage=1hour

    return app.prepare().then(() => handle(request, response));
  }
);

import functions from "firebase-functions";
import next from "next";

import config from "./next.config.cjs";

const app = next({
  conf: { ...config, distDir: "nextjs/.next" },
});
const handle = app.getRequestHandler();

export const server = functions
  // firebase hosting only supports us-central1
  .region("us-central1")
  .https.onRequest((request, response) => {
    functions.logger.info("File: " + request.originalUrl, {
      structuredData: true,
    });

    response.set("Cache-Control", "public, max-age=300, s-maxage=3600");

    return app.prepare().then(() => handle(request, response));
  });

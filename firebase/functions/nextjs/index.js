import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";

import next from "next";

import config from "./next.config.cjs";

const app = next({
  conf: { ...config, distDir: "nextjs/.next" },
});
const handle = app.getRequestHandler();

const excludeCache = [
  (req) => req.path.startsWith("/api"),
  (req) => /\/checkout(.json)?$/.test(req.path),
  (req) => /\/profile(.json)?$/.test(req.path),
];

export const server = onRequest(
  {
    cors: ["brute-gg.web.app", "brute.cz"],
    // firebase hosting only supports us-central1
    region: "us-central1",
    memory: "4GiB",
    minInstances: 0,
    maxInstances: 100,
    concurrency: 200,
  },
  (request, response) => {
    logger.info("File: " + request.originalUrl, {
      structuredData: true,
    });

    // default cache
    response.set("Cache-Control", "public, max-age=300, s-maxage=86400"); //max-age=5minutes, s-maxage=1 day

    if ([".js", ".css"].find((ext) => request.originalUrl.endsWith(ext))) {
      response.set(
        "Cache-Control",
        "public, max-age=31536000, s-maxage=31536000"
      ); //max-age=1year, s-maxage=1year
    }

    if (excludeCache.some((fn) => fn(request))) {
      response.set("Cache-Control", "private, max-age=0");
    }

    return app.prepare().then(() => handle(request, response));
  }
);

import fetch from "node-fetch";

export const rebuild = onRequest(
  {
    // firebase hosting only supports us-central1
    region: "us-central1",
    memory: "256MiB",
    minInstances: 0,
    maxInstances: 1,
    concurrency: 10,
    timeoutSeconds: 10,
  },
  (request, response) => {
    if (
      request.query.NEXT_REBUILD_PASSWORD !== process.env.NEXT_REBUILD_PASSWORD
    ) {
      response.status(403);
      response.end();
      return;
    }

    fetch("https://api.github.com/repos/topmonks/brutegg/dispatches", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + process.env.GH_DISPATCH_ACCESS_TOKEN,
      },
      body: JSON.stringify({ event_type: "next-rebuild" }),
    }).then((res) => {
      res.body.pipe(response);
    });
  }
);

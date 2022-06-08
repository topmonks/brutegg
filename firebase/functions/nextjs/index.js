const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config");

admin.initializeApp();

// const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev: false,
  conf: config,
});
const handle = app.getRequestHandler();

const server = functions
  // firebase hosting only support us-central1
  .region("us-central1")
  .https.onRequest((request, response) => {
    functions.logger.info("File: " + request.originalUrl, {
      structuredData: true,
    });

    response.set("Cache-Control", "public, max-age=300, s-maxage=600");

    return app.prepare().then(() => handle(request, response));
  });

module.exports = { server };

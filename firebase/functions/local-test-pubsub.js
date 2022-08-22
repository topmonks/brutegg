import { PubSub, Topic } from "@google-cloud/pubsub";

(async () => {
  const pubsub = new PubSub({
    projectId: "brute-gg",
    apiEndpoint: "localhost:8085",
  });

  const topic = new Topic(
    pubsub,
    "projects/brute-gg/topics/recalculate-brute-spent"
  );
  await topic.publish(Buffer.from("no-body"));
})();

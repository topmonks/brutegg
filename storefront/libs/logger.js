const project = "brute-gg";

export function log({ message, severity = "DEBUG", req, ...rest }) {
  const globalLogFields = {};

  if (req) {
    const traceHeader = req.header("X-Cloud-Trace-Context");
    if (traceHeader) {
      const [trace] = traceHeader.split("/");
      globalLogFields[
        "logging.googleapis.com/trace"
      ] = `projects/${project}/traces/${trace}`;
    }
  }

  const entry = Object.assign(
    {
      severity,
      message,
      ...rest,
    },
    globalLogFields
  );

  console.log(JSON.stringify(entry));
}

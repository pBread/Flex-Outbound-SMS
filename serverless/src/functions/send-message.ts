// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import type { ServerlessFunctionSignature } from "@twilio-labs/serverless-runtime-types/types";

type Event = {
  Body?: string;
};

export const handler: ServerlessFunctionSignature = function (
  context,
  event: Event,
  callback
) {
  callback(null, "Hello World");
};

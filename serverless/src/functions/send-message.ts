// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import type { ServerlessFunctionSignature } from "@twilio-labs/serverless-runtime-types/types";

type EnvVariables = {
  CONVERSATIONS_SVC: string;
  QUEUE_SID: string;
  WORKFLOW_SID: string;
  WORKSPACE_SID: string;
};

type Event = {
  body: string;
  to: string;
  workerName: string;
  workerSid: string;
};

export const handler: ServerlessFunctionSignature<EnvVariables, Event> = async (
  ctx,
  event,
  callback
) => {
  const client = ctx.getTwilioClient();
  const { CONVERSATIONS_SVC, QUEUE_SID, WORKFLOW_SID, WORKSPACE_SID } = ctx;

  const workerSid = event.workerSid;
  const workerName = event.workerName;

  const interaction = await client.flexApi.v1.interaction.create({
    channel: {
      type: "sms",
      initiated_by: "agent",
      properties: { type: "sms" },
      participants: [
        {
          address: to10DLC(event.to),
          proxy_address: "+15304530336",
          type: "sms",
        },
      ],
    },
    routing: {
      properties: {
        workspace_sid: WORKSPACE_SID,
        workflow_sid: WORKFLOW_SID,
        queue_sid: QUEUE_SID,
        worker_sid: workerSid,
        task_channel_unique_name: "sms",
        attributes: {
          customerName: "Ralph Wiggum",
          customerAddress: "+15304530336",
        },
      },
    },
  });

  const attributes = JSON.parse(interaction.routing.properties.attributes);

  const message = await client.conversations
    .conversations(attributes.conversationSid)
    .messages.create({ author: workerName, body: event.body });

  callback(null, { attributes, interaction, message });
};

export function to10DLC(phone: string) {
  const { area, prefix, line } =
    phone.match(
      /^\s*(?:\+?(?<country>\d{1,3}))?[-. (]*(?<area>\d{3})[-. )]*(?<prefix>\d{3})[-. ]*(?<line>\d{4})(?: *x(\d+))?\s*$/
    )?.groups || {};

  return `+${1}${area}${prefix}${line}`;
}

import { WebClient } from "@slack/web-api";

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export const CHANNELS = {
  aiNews: "C0ASR9CQCBA",
} as const;

export async function postToSlack(channel: string, text: string) {
  await slack.chat.postMessage({ channel, text });
}

export async function createCanvasInChannel(
  channel: string,
  title: string,
  markdown: string
) {
  const result = await slack.conversations.canvases.create({
    channel_id: channel,
    document_content: { type: "markdown", markdown },
    title,
  });
  return result.canvas_id;
}

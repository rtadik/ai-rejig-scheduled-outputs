import { schedules } from "@trigger.dev/sdk";
import { postToSlack, createCanvasInChannel, CHANNELS } from "../lib/slack";

const REPO_RAW_BASE =
  "https://raw.githubusercontent.com/rtadik/ai-rejig-scheduled-outputs/master/outputs/briefs";

function todayDate(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function extractHeadlines(brief: string): string[] {
  return brief
    .split("\n")
    .filter((line) => line.startsWith("### "))
    .map((line) => line.replace(/^###\s*/, "").replace(/^\[\d+\/\d+\]\s*/, ""))
    .slice(0, 5);
}

export const dailyBriefToSlack = schedules.task({
  id: "daily-brief-to-slack",
  cron: "10 0 * * *", // 00:10 UTC = 07:10 Bangkok
  run: async () => {
    const date = todayDate();
    const url = `${REPO_RAW_BASE}/${date}.md`;

    const res = await fetch(url);
    if (!res.ok) {
      console.log(`[daily-brief] No brief found for ${date} (${res.status})`);
      return { skipped: true, date, reason: "no brief found" };
    }

    const brief = await res.text();
    const headlines = extractHeadlines(brief);
    const storyCount = headlines.length;

    // Create canvas with full brief
    await createCanvasInChannel(
      CHANNELS.aiNews,
      `AI Daily Brief — ${date}`,
      brief
    );

    // Post summary message
    const headlineList = headlines.map((h) => `- ${h}`).join("\n");
    const summary = `*AI Daily Brief — ${date}* | ${storyCount} stories\n\n${headlineList}\n\nFull brief in canvas above`;

    await postToSlack(CHANNELS.aiNews, summary);

    console.log(`[daily-brief] Delivered ${storyCount} stories for ${date}`);
    return { delivered: true, date, storyCount };
  },
});

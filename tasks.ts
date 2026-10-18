export const TASK_TYPES = [
  "youtube_subscribe",
  "discord_join",
  "instagram_follow",
  "telegram_join",
  "website_visit"
] as const;

export type TaskType = typeof TASK_TYPES[number];

export const TASK_LABELS: Record<TaskType, string> = {
  youtube_subscribe: "Subscribe on YouTube",
  discord_join: "Join Discord",
  instagram_follow: "Follow on Instagram",
  telegram_join: "Join Telegram",
  website_visit: "Visit a website"
};

// Only website_visit has a first-party event check in this starter.
// Social tasks remain unverified until the corresponding provider OAuth/API integration is configured.
export function isProviderVerified(type: TaskType): boolean {
  return type === "website_visit";
}

export function providerNote(type: TaskType): string {
  if (type === "website_visit") return "We'll record a signed visit event when you open the target site.";
  if (type === "discord_join") return "Requires Discord OAuth/bot membership verification; not enabled in this starter.";
  if (type === "telegram_join") return "Requires a Telegram bot with membership-check permissions; not enabled in this starter.";
  if (type === "youtube_subscribe") return "YouTube subscription checks have API/privacy limitations and are not enabled in this starter.";
  return "Instagram follow verification is not generally available for arbitrary accounts; not enabled in this starter.";
}

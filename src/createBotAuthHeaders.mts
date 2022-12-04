import type { Env } from "./env.mjs";

export function createBotAuthHeaders(env: Env, headers?: HeadersInit): Headers {
    const result = new Headers(headers);
    result.append("Authorization", `Bot ${env.bot_token}`);
    result.append("User-Agent", "DiscordBot (https://github.com/puppy0cam/discord-faq-bot, 1.1.0)");
    return result;
}

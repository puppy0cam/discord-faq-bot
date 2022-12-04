import type { APIPartialGuild } from "discord-api-types/v10";
import { createBotAuthHeaders } from "./createBotAuthHeaders.mjs";
import type { Env } from "./env.mjs";

export async function getBotGuilds(env: Env): Promise<APIPartialGuild[]> {
    const response = await fetch(`https://discord.com/api/v10/users/@me/guilds?limit=9`, {
        headers: createBotAuthHeaders(env),
    });
    if (!response.ok) {
        throw new Error(`Failed to get guilds: ${await response.text()}`);
    }
    return response.json();
}

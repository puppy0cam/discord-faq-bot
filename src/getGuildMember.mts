import type { APIGuildMember } from "discord-api-types/v10.js";
import { createBotAuthHeaders } from "./createBotAuthHeaders.mjs";
import type { Env } from "./env.mjs";
import { handleResult } from "./handleResult.mjs";

export async function getGuildMember(env: Env, guild_id: string, user_id: string): Promise<APIGuildMember> {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guild_id}/members/${user_id}`, {
        method: "GET",
        headers: createBotAuthHeaders(env),
    }).then(handleResult);
    return response.json();
}

import type { APIRole } from "discord-api-types/v10.js";
import { createBotAuthHeaders } from "./createBotAuthHeaders.mjs";
import type { Env } from "./env.mjs";
import { handleResult } from "./handleResult.mjs";

export async function getGuildRoles(env: Env, guild_id: string): Promise<APIRole[]> {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guild_id}/roles`, {
        method: "GET",
        headers: createBotAuthHeaders(env),
    }).then(handleResult);
    return response.json();
}

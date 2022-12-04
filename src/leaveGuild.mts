import { createBotAuthHeaders } from "./createBotAuthHeaders.mjs";
import type { Env } from "./env.mjs";
import { handleResult } from "./handleResult.mjs";

export async function leaveGuild(env: Env, guild_id: string): Promise<void> {
    await fetch(`https://discord.com/api/v10/users/@me/guilds/${guild_id}`, {
        method: "DELETE",
        headers: createBotAuthHeaders(env),
    }).then(handleResult);
}

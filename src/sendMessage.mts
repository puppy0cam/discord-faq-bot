import type { APIMessage, RESTPostAPIChannelMessageJSONBody } from "discord-api-types/v10.js";
import { createBotAuthHeaders } from "./createBotAuthHeaders.mjs";
import type { Env } from "./env.mjs";
import { handleResult } from "./handleResult.mjs";

export async function sendMessage(env: Env, channel_id: string, data: RESTPostAPIChannelMessageJSONBody): Promise<APIMessage> {
    const response = await fetch(`https://discord.com/api/v10/channels/${channel_id}/messages`, {
        method: "POST",
        headers: createBotAuthHeaders(env, {
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
    }).then(handleResult);
    return response.json();
}

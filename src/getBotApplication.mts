import type { APIApplication } from "discord-api-types/v10";
import { createBotAuthHeaders } from "./createBotAuthHeaders.mjs";
import type { Env } from "./env.mjs";
import { handleResult } from "./handleResult.mjs";

export async function getBotApplication(env: Env): Promise<APIApplication> {
    const response = await fetch("https://discord.com/api/v10/oauth2/applications/@me", {
        headers: createBotAuthHeaders(env),
    }).then(handleResult);
    return response.json();
}

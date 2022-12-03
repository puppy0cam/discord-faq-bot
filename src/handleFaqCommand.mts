import type { APIChatInputApplicationCommandGuildInteraction } from "discord-api-types/v10";
import { asyncResponseHandler } from "./asyncResponseHandler.mjs";
import { callbackFaq } from "./callbackFaq.mjs";
import type { Env } from "./env.mjs";

export function handleFaqCommand(interaction: APIChatInputApplicationCommandGuildInteraction, env: Env, context: FetchEvent): Response {
    // queue up response handling to run after the request is finished.
    // Because discord gives us literally just 3 seconds to respond to an interaction,
    // We need to do this outside the request's lifecycle to avoid timing out.
    // Cloudflare gives us at least 30 seconds after the response has been received to be finished with the request.
    // It normally only takes us at most half a second to get a proper response, so we have plenty of time.
    // And if there's a bottleneck somewhere, it means that we should *eventually* send the response.
    context.waitUntil(callbackFaq(interaction, env));
    // return an empty response to acknowledge the command and let the client know that the result will be updated later.
    return asyncResponseHandler();
}

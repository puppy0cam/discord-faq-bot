import type { APIApplicationCommandAutocompleteGuildInteraction } from "discord-api-types/v10";
import { createJsonResponse } from "./createJsonResponse.mjs";
import type { Env } from "./env.mjs";
import { unknownResponse } from "./unknownResponse.mjs";

export async function handleAutocompleteInteraction(interaction: APIApplicationCommandAutocompleteGuildInteraction, env: Env): Promise<Response> {
    // we don't need to figure out what command this is,
    // because both instances of commands that can be autocompleted share the same parameter name.
    // And they both have the same autocomplete handler.
    // So we know that this is *always* asking for a list of faq names.
    const {
        guild_id,
        data: {
            options: [
                option,
            ],
        },
    } = interaction;
    if (option.type !== 3) {
        // this should never happen, but we do this check to satisy the type checker.
        return unknownResponse();
    }
    // fetch results
    const results = await env.server_config.list({
        limit: 25,
        prefix: `${guild_id}:${(option.value || "").toLowerCase().trim()}`,
    });
    // return the results
    return createJsonResponse({
        type: 8,
        data: {
            choices: results.keys.map((key) => {
                return {
                    name: key.name.slice(guild_id.length + 1),
                    value: key.name.slice(guild_id.length + 1),
                };
            }),
        },
    });
}

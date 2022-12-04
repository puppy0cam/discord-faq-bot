import type { APIApplicationCommandAutocompleteInteraction } from "discord-api-types/v10";
import { createJsonResponse } from "./createJsonResponse.mjs";
import type { Env } from "./env.mjs";
import { getCommandParameter } from "./getCommandParameter.mjs";
import { getServerKeyForInteraction } from "./getServerKeyForInteraction.mjs";
import { unknownResponse } from "./unknownResponse.mjs";

export async function handleAutocompleteInteraction(interaction: APIApplicationCommandAutocompleteInteraction, env: Env): Promise<Response> {
    // we don't need to figure out what command this is,
    // because both instances of commands that can be autocompleted share the same parameter name.
    // And they both have the same autocomplete handler.
    // So we know that this is *always* asking for a list of faq names.
    const namespace = getServerKeyForInteraction(interaction);
    const option = getCommandParameter(interaction, 'question');
    if (option?.type !== 3) {
        return unknownResponse();
    }
    // fetch results
    const results = await env.server_config.list({
        limit: 25,
        prefix: `${namespace}:${(option.value || "").toLowerCase().trim()}`,
    });
    // return the results
    return createJsonResponse({
        type: 8,
        data: {
            choices: results.keys.map((key) => {
                return {
                    name: key.name.slice(namespace.length + 1),
                    value: key.name.slice(namespace.length + 1),
                };
            }),
        },
    });
}

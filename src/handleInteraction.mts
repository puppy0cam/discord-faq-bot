import type { APIInteraction } from "discord-api-types/v10";
import { createPongResponse } from "./createPongResponse.mjs";
import type { Env } from "./env.mjs";
import { handleAutocompleteInteraction } from "./handleAutocompleteInteraction.mjs";
import { handleCommand } from "./handleCommand.mjs";
import { unknownResponse } from "./unknownResponse.mjs";

export function handleInteraction(interaction: APIInteraction, env: Env, context: ExecutionContext): Promise<Response> | Response {
    if (interaction.type === 1) {
        // discord is pinging us. Probably to make sure we are capable of responding to interactions.
        // Or maybe they are double checking that we properly checked the signature.
        // Either way, we can just return a pong response.
        return createPongResponse();
    }
    if (interaction.type === 2) {
        // this is a slash command.
        // or some other kind of command interaction (user, message)
        // We can pass this along to the command handler.
        return handleCommand(interaction, env, context);
    }
    if (interaction.type === 4) {
        // this is an autocomplete interaction.
        // We actually can't defer a response for later,
        // so the request response could theoretically fail the timeout.
        return handleAutocompleteInteraction(interaction, env);
    }
    // no idea what it is.
    // We can *try* to send a response that says we don't know what it is.
    // but it's not really garunteed to work (not all interactions accept message responses).
    // Even if it doesn't work, It's not like we can do anything about it.
    return unknownResponse();
}

import type { APIChatInputApplicationCommandGuildInteraction, APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";
import { createJsonResponse } from "./createJsonResponse.mjs";
import type { Env } from "./env.mjs";
import { handleAddfaqCommand } from "./handleAddfaqCommand.mjs";
import { handleFaqCommand } from "./handleFaqCommand.mjs";
import { handleRemovefaqCommand } from "./handleRemovefaqCommand.mjs";
import { unknownResponse } from "./unknownResponse.mjs";

export function handleSlashCommand(interaction: APIChatInputApplicationCommandInteraction, env: Env, context: FetchEvent): Response {
    // destructure needed values from the interaction
    const {
        data: {
            name: commandName,
        },
        member,
        guild_id,
    } = interaction;
    // check if this is being run from outside a guild.
    // This should be impossible, but it's good to check anyways.
    if (!member || !guild_id) {
        return createJsonResponse({
            type: 4,
            data: {
                content: "You must be in a guild to use this command.",
                flags: 68,
            },
        });
    }
    // command handlers
    if (commandName === 'addfaq') {
        return handleAddfaqCommand(interaction as APIChatInputApplicationCommandGuildInteraction, env, context);
    }
    if (commandName === 'faq') {
        return handleFaqCommand(interaction as APIChatInputApplicationCommandGuildInteraction, env, context);
    }
    if (commandName === 'removefaq') {
        return handleRemovefaqCommand(interaction as APIChatInputApplicationCommandGuildInteraction, env, context);
    }
    // unknown command
    return unknownResponse();
}

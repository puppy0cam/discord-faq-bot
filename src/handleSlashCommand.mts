import type { APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import { handleAddfaqCommand } from "./handleAddfaqCommand.mjs";
import { handleFaqCommand } from "./handleFaqCommand.mjs";
import { handleRemovefaqCommand } from "./handleRemovefaqCommand.mjs";
import { unknownResponse } from "./unknownResponse.mjs";

export function handleSlashCommand(interaction: APIChatInputApplicationCommandInteraction, env: Env, context: ExecutionContext): Response {
    // destructure needed values from the interaction
    const commandName = interaction.data.name;
    // command handlers
    if (commandName === 'addfaq') {
        return handleAddfaqCommand(interaction, env, context);
    }
    if (commandName === 'faq') {
        return handleFaqCommand(interaction, env, context);
    }
    if (commandName === 'removefaq') {
        return handleRemovefaqCommand(interaction, env, context);
    }
    // unknown command
    return unknownResponse();
}

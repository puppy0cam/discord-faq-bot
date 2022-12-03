import type { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import { handleSlashCommand } from "./handleSlashCommand.mjs";
import { unknownResponse } from "./unknownResponse.mjs";

export function handleCommand(interaction: APIApplicationCommandInteraction, env: Env, context: FetchEvent): Response {
    // check if this is a slash command.
    // Because it's possible for multiple commands of different types to share the same name,
    // We have to route them to the correct handler based on the type.
    if (interaction.data.type === 1) {
        return handleSlashCommand(interaction as APIChatInputApplicationCommandInteraction, env, context);
    }
    // Unknown or unsupported command type
    // It shouldn't really be possible to get here,
    // but we need to return something anyways.
    return unknownResponse();
}

import type { APIApplicationCommandInteractionDataStringOption, APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import { getServerKeyForInteraction } from "./getServerKeyForInteraction.mjs";
import { updateResponse } from "./updateResponse.mjs";

export async function callbackRemovefaq(interaction: APIChatInputApplicationCommandInteraction, env: Env, question: APIApplicationCommandInteractionDataStringOption): Promise<void> {
    // gets the namespace
    const namespace = getServerKeyForInteraction(interaction);
    // delete the faq.
    // If it doesn't exist, it's not really important.
    // We just want to make sure that it's not there.
    await env.server_config.delete(`${namespace}:${question.value.toLowerCase().trim()}`);
    // return a success message.
    await updateResponse(interaction, {
        content: "FAQ entry removed (if it existed).\nNote that it may take up to a minute for the change to take effect.",
        flags: 4,
    });
}

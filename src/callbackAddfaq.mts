import type { APIApplicationCommandInteractionDataStringOption, APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import { getServerKeyForInteraction } from "./getServerKeyForInteraction.mjs";
import { updateResponse } from "./updateResponse.mjs";

export async function callbackAddfaq(interaction: APIChatInputApplicationCommandInteraction, env: Env, question: APIApplicationCommandInteractionDataStringOption, answer: APIApplicationCommandInteractionDataStringOption): Promise<void> {
    // get the namespace
    const namespace = getServerKeyForInteraction(interaction);
    // add the faq
    await env.server_config.put(`${namespace}:${question.value.toLowerCase().trim()}`, JSON.stringify({
        content: answer.value,
    }));
    // return a success message.
    await updateResponse(interaction, {
        content: "FAQ entry added.\nNote that it may take up to a minute for the change to take effect.",
        flags: 4,
    });
}

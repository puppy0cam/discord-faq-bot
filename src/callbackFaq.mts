import type { APIApplicationCommandInteractionDataStringOption, APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import type { FaqEntry } from "./FaqEntry.mjs";
import { getServerKeyForInteraction } from "./getServerKeyForInteraction.mjs";
import { updateResponse } from "./updateResponse.mjs";

export async function callbackFaq(interaction: APIChatInputApplicationCommandInteraction, env: Env, question: APIApplicationCommandInteractionDataStringOption): Promise<void> {
    // get the namespace
    const namespace = getServerKeyForInteraction(interaction);
    // get the faq entry from the database.
    const faq_content = await env.server_config.get<FaqEntry>(`${namespace}:${question.value.toLowerCase().trim()}`, {
        type: "json",
    });
    // if the faq entry doesn't exist, return an error.
    if (faq_content === null) {
        await updateResponse(interaction, {
            content: "This question does not exist",
            flags: 4,
        });
        return;
    }
    // return the faq entry.
    await updateResponse(interaction, {
        content: faq_content.content,
    });
}

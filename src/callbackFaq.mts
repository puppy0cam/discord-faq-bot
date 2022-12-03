import type { APIChatInputApplicationCommandGuildInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import type { FaqEntry } from "./FaqEntry.mjs";
import { updateResponse } from "./updateResponse.mjs";

export async function callbackFaq(interaction: APIChatInputApplicationCommandGuildInteraction, env: Env): Promise<void> {
    const {
        guild_id,
        data: {
            options: commandOptions,
        },
    } = interaction;
    // get the question parameter.
    const question = commandOptions!.find((option) => {
        return option.name === "question";
    });
    // satisfy the type checker
    if (question?.type !== 3) {
        await updateResponse(interaction, {
            content: "You must provide a question",
            flags: 4,
        });
        return;
    }
    // get the faq entry from the database.
    const faq_content = await env.server_config.get<FaqEntry>(`${guild_id}:${question.value.toLowerCase().trim()}`, {
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

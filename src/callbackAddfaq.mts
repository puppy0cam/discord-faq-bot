import type { APIChatInputApplicationCommandGuildInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import { updateResponse } from "./updateResponse.mjs";

export async function callbackAddfaq(interaction: APIChatInputApplicationCommandGuildInteraction, env: Env): Promise<void> {
    const {
        guild_id,
        data: {
            options: commandOptions,
        },
    } = interaction;
    // get the parameters.
    const question = commandOptions!.find((option) => {
        return option.name === "question";
    });
    const answer = commandOptions!.find((option) => {
        return option.name === "answer";
    });
    // satisfy the type checker
    if (!question || !answer) {
        await updateResponse(interaction, {
            content: "Missing required options",
            flags: 4,
        });
        return;
    }
    // satisfy the type checker
    if (question.type !== 3 || answer.type !== 3) {
        await updateResponse(interaction, {
            content: "Invalid option types",
            flags: 4,
        });
        return;
    }
    // add the faq
    await env.server_config.put(`${guild_id}:${question.value.toLowerCase().trim()}`, JSON.stringify({
        content: answer.value,
    }));
    // return a success message.
    await updateResponse(interaction, {
        content: "FAQ entry added.\nNote that it may take up to a minute for the change to take effect.",
        flags: 4,
    });
}

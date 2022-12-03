import { APIChatInputApplicationCommandGuildInteraction } from "discord-api-types/v10";
import { Env } from "./env.mjs";
import { updateResponse } from "./updateResponse.mjs";

export async function callbackRemovefaq(interaction: APIChatInputApplicationCommandGuildInteraction, env: Env): Promise<void> {
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
    // if parameter is missing, return an error.
    if (!question) {
        await updateResponse(interaction, {
            content: "Missing required options",
            flags: 4,
        });
        return;
    }
    // satisfy the type checker
    if (question.type !== 3) {
        await updateResponse(interaction, {
            content: "Invalid option types",
            flags: 4,
        });
        return;
    }
    // delete the faq.
    // If it doesn't exist, it's not really important.
    // We just want to make sure that it's not there.
    await env.server_config.delete(`${guild_id}:${question.value.toLowerCase().trim()}`);
    // return a success message.
    await updateResponse(interaction, {
        content: "FAQ entry removed (if it existed).\nNote that it may take up to a minute for the change to take effect.",
        flags: 4,
    });
}

import type { APIInteraction, APIInteractionResponseCallbackData } from "discord-api-types/v10";
import { handleResult } from "./handleResult.mjs";

export async function updateResponse(interaction: APIInteraction, newResponse: APIInteractionResponseCallbackData) {
    // send patch request to discord to update the response with the new content.
    const response = await fetch(`https://discord.com/api/v10/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResponse),
    });
    // handle the result
    return handleResult(response);
}

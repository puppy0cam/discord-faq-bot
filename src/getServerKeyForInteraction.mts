import type { APIInteraction } from "discord-api-types/v10";

/**
 * If executed in a guild, this is the guild id.
 * If executed in a DM, this is the user id.
 * If somehow both conditions are not met, then it will try to get the channel id.
 * As a last resort, it will use the interaction id.
 * If we reached the point where we are using the interaction id,
 * then you will probably end up with it being always treated as if it's a new server.
 */
export function getServerKeyForInteraction(interaction: APIInteraction) {
    return interaction.guild_id ?? interaction.user?.id ?? interaction.channel_id ?? interaction.id;
}

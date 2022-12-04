import type { APIApplication, APIPartialGuild } from "discord-api-types/v10";
import { computeChannelPermissions } from "./computeChannelPermissions.mjs";
import { computeGuildPermissions } from "./computeGuildPermissions.mjs";
import type { Env } from "./env.mjs";
import { getGuildChannels } from "./getGuildChannels.mjs";
import { getGuildMember } from "./getGuildMember.mjs";
import { getGuildRoles } from "./getGuildRoles.mjs";
import { leaveGuild } from "./leaveGuild.mjs";
import { sendMessage } from "./sendMessage.mjs";

export async function handleBotGuild(env: Env, guild: APIPartialGuild, application: APIApplication) {
    const self_request = getGuildMember(env, guild.id, application.id);
    const roles_request = getGuildRoles(env, guild.id);
    const channels_request = getGuildChannels(env, guild.id);
    const [
        self,
        roles,
    ] = await Promise.all([
        self_request,
        roles_request,
    ]);
    const base_permissions = computeGuildPermissions(guild, roles, self);
    const channels = await channels_request;
    let warning_channel = null;
    for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        if (channel.type !== 0) {
            continue;
        }
        const permissions = computeChannelPermissions(guild, base_permissions, self, channel);
        if (permissions & 8n || (permissions & 3072n) === 3072n) {
            warning_channel = channel;
            break;
        }
    }
    if (warning_channel !== null) {
        await sendMessage(env, warning_channel.id, {
            content: `You cannot use the \`bot\` scope when adding this application to a server.\nPlease use the following link to add the bot to the guild instead: https://discord.com/oauth2/authorize?client_id=${application.id}&scope=applications.commands&guild_id=${guild.id}&disable_guild_select=true`,
        });
    }
    await leaveGuild(env, guild.id);
}

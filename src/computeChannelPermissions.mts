import type { APIGuildChannelResolvable, APIGuildMember, APIPartialGuild } from "discord-api-types/v10";
import FULL_PERMISSIONS from "./FULL_PERMISSIONS.mjs";

export function computeChannelPermissions(guild: APIPartialGuild, base_permissions: bigint, member: APIGuildMember, channel: APIGuildChannelResolvable) {
    let permissions = base_permissions;
    if (permissions & (1n << 3n)) {
        return FULL_PERMISSIONS;
    }
    const overwrites = channel.permission_overwrites;
    if (overwrites == null) {
        return permissions;
    }
    let allow = 0n;
    let deny = 0n;
    let member_overwrite = null;
    const guild_id = guild.id;
    const member_id = member.user!.id;
    const member_roles = member.roles;
    for (let i = 0; i < overwrites.length; i++) {
        const overwrite = overwrites[i];
        if (overwrite.type === 0) {
            const id = overwrite.id;
            if (id === guild_id) {
                permissions &= ~BigInt(overwrite.deny);
                permissions |= BigInt(overwrite.allow);
            } else if (member_roles.includes(id)) {
                deny |= BigInt(overwrite.deny);
                allow |= BigInt(overwrite.allow);
            }
        } else if (overwrite.type === 1 && overwrite.id === member_id) {
            member_overwrite = overwrite;
        }
    }
    permissions &= ~deny;
    permissions |= allow;
    if (member_overwrite !== null) {
        permissions &= ~BigInt(member_overwrite.deny);
        permissions |= BigInt(member_overwrite.allow);
    }
    return permissions;
}

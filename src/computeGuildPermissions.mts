import type { APIGuildMember, APIPartialGuild, APIRole } from "discord-api-types/v10";
import FULL_PERMISSIONS from "./FULL_PERMISSIONS.mjs";

export function computeGuildPermissions(guild: APIPartialGuild, roles: APIRole[], member: APIGuildMember) {
    if ((guild as any).owner || (guild as any).owner_id === member.user!.id) {
        return FULL_PERMISSIONS;
    }
    let base_permissions = 0n;
    const member_roles = member.roles;
    for (let i = 0; i < member_roles.length; i++) {
        const role_id = member_roles[i];
        let role = null;
        for (let j = 0; j < roles.length; j++) {
            if (roles[j].id === role_id) {
                role = roles[j];
                break;
            }
        }
        if (role === null) {
            continue;
        }
        const permissions = BigInt(role.permissions);
        if (permissions & (1n << 3n)) {
            return FULL_PERMISSIONS;
        }
        base_permissions |= permissions;
    }
    return base_permissions;
}

import type { Env } from "./env.mjs";
import { getBotApplication } from "./getBotApplication.mjs";
import { getBotGuilds } from "./getBotGuilds.mjs";
import { handleBotGuild } from "./handleBotGuild.mjs";

export async function cleanMisconfiguredGuilds(env: Env): Promise<void> {
    const [
        app,
        guilds,
    ] = await Promise.all([
        getBotApplication(env),
        getBotGuilds(env),
    ]);
    await Promise.all(guilds.map((guild) => {
        return handleBotGuild(env, guild, app);
    }));
}

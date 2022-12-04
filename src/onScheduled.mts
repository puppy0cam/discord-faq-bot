import { cleanMisconfiguredGuilds } from "./cleanMisconfiguredGuilds.mjs";
import type { Env } from "./env.mjs";

export async function onScheduled(event: ScheduledEvent, env: Env, context: ExecutionContext): Promise<any> {
    event.noRetry?.();
    context.waitUntil(cleanMisconfiguredGuilds(env));
}

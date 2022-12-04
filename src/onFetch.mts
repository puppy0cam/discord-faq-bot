import type { APIInteraction } from "discord-api-types/v10";
import type { Env } from "./env.mjs";
import { handleInteraction } from "./handleInteraction.mjs";
import { verifyKey } from "./verifyKey.mjs";

export async function onFetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
    { // Using the incoming headers, verify this request actually came from discord.
        const signature = request.headers.get('x-signature-ed25519');
        const timestamp = request.headers.get('x-signature-timestamp');
        if (!signature || !timestamp) { // If the headers are missing, this request is not from discord. All requests should be signed.
            return new Response('Bad request - missing signature', { status: 401 });
        }
        const verified = await verifyKey(await request.clone().arrayBuffer(), signature, timestamp, env.public_key);
        if (!verified) { // if the request was not signed properly, return a 401
            return new Response('Bad request - signature verification failed', { status: 401 });
        }
    }
    { // process the request now that we know it's from discord
        const message: APIInteraction = await request.json();
        return handleInteraction(message, env, context);
    }
}

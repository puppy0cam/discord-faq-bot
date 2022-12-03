import { loadKey } from "./loadKey.mjs";

export async function _verifyKey(message: Uint8Array, signature: Uint8Array, publicKey: string): Promise<boolean> {
    // load the public key
    let key = loadKey(publicKey);
    // if the key is a promise, await it
    if (key instanceof Promise) {
        key = await key;
    }
    // verify the message
    return crypto.subtle.verify('NODE-ED25519', key, signature, message);
}

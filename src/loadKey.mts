import { handleKeyLoadingPromise } from "./handleKeyLoadingPromise.mjs";
import keyCache from "./keyCache.mjs";
import { valueToUint8Array } from "./valueToUint8Array.mjs";

export function loadKey(publicKey: string): Promise<CryptoKey> | CryptoKey {
    // check if the key is in the cache.
    // Unsure if this has any significant performance benefits, but it's nice to have it.
    // And it's not like there's risk of memory leaks since requests are so short lived
    // and cloudflare can evict this js runtime at any time.
    const cache = keyCache.get(publicKey);
    if (cache !== void 0) {
        return cache;
    }
    // convert the public key to a format accepted by the web crypto api
    const data = valueToUint8Array(publicKey, 'hex');
    // start loading the key, and hold onto the promise
    const key = crypto.subtle.importKey('raw', data, {
        name: 'NODE-ED25519',
        namedCurve: 'NODE-ED25519',
    }, false, ["verify"]);
    // cache the promise
    keyCache.set(publicKey, key);
    // handler so that when it finishes loading,
    // we can remove the promise from the cache and replace it with the resolved value
    handleKeyLoadingPromise(publicKey, key);
    // return the promise
    return key;
}

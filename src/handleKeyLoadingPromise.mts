import keyCache from "./keyCache.mjs";

export async function handleKeyLoadingPromise(key: string, promise: Promise<CryptoKey>) {
    // try/catch so that if the promise fails, we can remove it from the cache.
    try {
        const value = await promise;
        // update cache with resolved value instead of promise
        keyCache.set(key, value);
    } catch (e) {
        // remove the promise from the cache so that future requests don't get stuck with a failed promise.
        // who knows, maybe it's a temporary issue and the key will load next time.
        keyCache.delete(key);
        throw e;
    }
}

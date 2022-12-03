
// a cache of public keys that have been loaded.
// we only really expect to load one key, but we don't receive the public key until the request is received.
// And since it's documented to be possible for environment variables to change without restarting the worker,
// we need to be able to handle the case where the public key isn't the same as the last request.
export default new Map<string, CryptoKey | Promise<CryptoKey>>();

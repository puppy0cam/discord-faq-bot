import { concatUint8Arrays } from "./concatUint8Arrays.mjs";
import { valueToUint8Array } from "./valueToUint8Array.mjs";
import { _verifyKey } from "./_verifyKey.mjs";

export function verifyKey(body: ArrayBuffer, signature: string, timestamp: string, public_key: string): Promise<boolean> {
    // parse content into Uint8Array for handling.
    const timestampData = valueToUint8Array(timestamp);
    const bodyData = valueToUint8Array(body);
    const message = concatUint8Arrays(timestampData, bodyData);
    const signatureData = valueToUint8Array(signature, 'hex');
    // verify the signature
    return _verifyKey(message, signatureData, public_key);
}

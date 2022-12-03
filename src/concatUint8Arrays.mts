
export function concatUint8Arrays(arr1: Uint8Array, arr2: Uint8Array): Uint8Array {
    // create a new array with the combined length of the two arrays
    const merged = new Uint8Array(arr1.length + arr2.length);
    // copy the first array into the new array
    merged.set(arr1);
    // copy the second array into the new array
    merged.set(arr2, arr1.length);
    // return the new array
    return merged;
}

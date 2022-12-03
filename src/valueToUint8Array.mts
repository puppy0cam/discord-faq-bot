import textEncoder from "./textEncoder.mjs";

export function valueToUint8Array(value?: null | ArrayBuffer | Uint8Array, format?: undefined): Uint8Array;
export function valueToUint8Array(value: string, format?: 'hex'): Uint8Array;
export function valueToUint8Array(value: any, format?: 'hex'): Uint8Array {
	// if the value is null-ish, return an empty array
	if (value == null) {
		return new Uint8Array();
	}
	// if the value is a string, we need to convert it to a Uint8Array
	if (typeof value === 'string') {
		// if the format is hex, we need to parse it as hex
		if (format === 'hex') {
			// use regex to match the characters we want to keep
			const matches = value.match(/.{1,2}/g);
			if (matches == null) { // if there are no matches, throw an error because the string is invalid
				throw new Error('Value is not a valid hex string');
			}
			// parse each match into a number
			const hexVal = matches.map((byte) => parseInt(byte, 16));
			// convert to a Uint8Array
			return new Uint8Array(hexVal);
		}
		else {
			// using the native text encoder works here.
			return textEncoder.encode(value);
		}
	}
	// if the value is an ArrayBuffer, convert it to a Uint8Array
	if (value instanceof ArrayBuffer) {
		return new Uint8Array(value);
	}
	// if the value is a Uint8Array, return it as there is nothing to do.
	if (value instanceof Uint8Array) {
		return value;
	}
	// we have exhausted all supported types, throw an error.
	throw new Error('Unrecognized value type');
}

import { createJsonResponse } from "./createJsonResponse.mjs";

export function unknownResponse(): Response {
    // helper function to fallback when we reached a state that shouldn't be possible
    return createJsonResponse({
        type: 4,
        data: {
            content: "Unsure how you got this, but this isn't supported right now",
            flags: 68,
        },
    });
}

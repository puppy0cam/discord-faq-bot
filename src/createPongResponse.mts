import { createJsonResponse } from "./createJsonResponse.mjs";

export function createPongResponse(): Response {
    // helper function to create a pong response
    return createJsonResponse({
        type: 1,
    });
}

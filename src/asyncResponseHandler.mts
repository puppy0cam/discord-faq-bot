import { createJsonResponse } from "./createJsonResponse.mjs";

export function asyncResponseHandler(): Response {
    // helper function to create a response indicating that we've deferred the real response to later.
    // we just need to make sure discord gets some kind of response within 3 seconds.
    return createJsonResponse({
        type: 5,
    });
}

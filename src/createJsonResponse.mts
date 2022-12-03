
export function createJsonResponse(data: any): Response {
    // helper function to create a json response
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

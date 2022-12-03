
export async function handleResult(response: Response): Promise<Response> {
    // handle the result of a fetch request
    if (response.ok) {
        // it's ok so we can just return the response as is.
        return response;
    } else {
        // grab the text of the response
        const text = await response.text();
        // throw an error.
        throw new Error(text || "Unknown error");
    }
}

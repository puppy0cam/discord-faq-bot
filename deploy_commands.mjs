import { readFile } from "node:fs/promises";

/**
 * @type {{client_secret:string;client_id:string;public_key:string;}}
 */
const config = JSON.parse(await readFile("config.json", "utf-8"));

async function handleResponse(response) {
    if (!response.ok) {
        const data = await response.text();
        throw new Error(data || response.statusText || "Unknown error");
    }
    const json = await response.json();
    return json;
}

/**
 * @returns {Promise<{access_token:string;expires_in:number;scope:string;token_type:'Bearer';}}
 */
async function getToken() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("scope", 'applications.commands.update');
    const response = await fetch("https://discord.com/api/v10/oauth2/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${config.client_id}:${config.client_secret}`, 'utf8').toString('base64')}`,
        },
        body: params.toString(),
    });
    return await handleResponse(response);
}

const token = await getToken();

/**
 * @param {RequestInfo | URL} url
 * @param {RequestInit=} options
 * @returns {Request}
 */
function makeAuthenticatedRequest(url, options) {
    const request = new Request(url, options);
    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${token.access_token}`);
    return new Request(request, {
        ...request,
        headers,
    });
}
async function revokeToken() {
    const params = new URLSearchParams();
    params.append("token", token.access_token);
    params.append("client_id", config.client_id);
    params.append("client_secret", config.client_secret);
    const response = await fetch("https://discord.com/api/v10/oauth2/token/revoke", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });
    return await handleResponse(response);
}

async function setCommands() {
    const request = makeAuthenticatedRequest(`https://discord.com/api/v10/applications/${config.client_id}/commands`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([
            {
                name: "removefaq",
                type: 1,
                description: "Remove a FAQ",
                default_member_permissions: "32",
                options: [
                    {
                        type: 3,
                        name: "question",
                        description: "The question you want answered.",
                        required: true,
                        autocomplete: true,
                        max_length: 100,
                        min_length: 1,
                    },
                ],
                dm_permission: true,
            },
            {
                name: "faq",
                type: 1,
                description: "Get a response to a frequently asked question.",
                options: [
                    {
                        type: 3,
                        name: "question",
                        description: "The question you want answered.",
                        required: true,
                        autocomplete: true,
                        max_length: 100,
                        min_length: 1,
                    },
                ],
                dm_permission: true,
            },
            {
                type: 1,
                name: "addfaq",
                description: "Add a new frequently asked question. This will overwrite an existing question if it exists.",
                default_member_permissions: "32",
                options: [
                    {
                        type: 3,
                        name: "question",
                        description: "The question you want to add.",
                        required: true,
                        max_length: 100,
                        min_length: 1,
                    },
                    {
                        type: 3,
                        name: "answer",
                        description: "The answer to the question.",
                        required: true,
                        max_length: 2000,
                        min_length: 1,
                    },
                ],
                dm_permission: true,
            },
        ]),
    });
    const response = await fetch(request);
    if (!response.ok) {
        const data = await response.text();
        throw new Error(data || `Failed to update commands: ${response.statusText}`);
    }
    const json = await response.json();
    return json;
}

await setCommands();

await revokeToken();

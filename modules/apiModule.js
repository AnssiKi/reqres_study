//This module contains api logic and verbose responses to various errors.

export const api = {
    baseUrl: "https://reqres.in/api/",

    async fetchAPI(endpoint, method = 'GET', body = null) {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(`${this.baseUrl}${endpoint}`, options);

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error(`Bad request.`);
            }
            if (response.status === 404) {
                throw new Error(`Not found.`);
            }
            if (response.status === 204) {
                return null;
            }
            throw new Error(`Unknown fetchAPI error. ${response.status}`);
        }

        if (response.status !== 204) {
            return response.json();
        }
        return null;
    }
};
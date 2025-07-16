import { globalGetConfig } from "./global-config";


export async function globalGetFetcher(url: string) {

    try {
        const response = await fetch(url, globalGetConfig);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`Fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

}
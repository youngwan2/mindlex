import { globalGetConfig } from "./global-config";

// fetcher에서 에러를 throw하면 Next.js app router 환경에서는 error.tsx가 자동으로 렌더링됨
export async function globalGetFetcher(url: string) {
    try {
        const response = await fetch(url, globalGetConfig);
        if (!response.ok) {
            // error.tsx로 에러 위임
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        // error.tsx로 에러 위임
        throw new Error(`Fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function globalPostFetcher(url: string, body: unknown) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    } catch (error) {
        throw new Error(`Fetch POST error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
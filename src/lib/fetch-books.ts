import { BookData } from "@/type";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
    let url = `http://localhost:12345/book`;

    if (q) {
        url += `/search?q=${q}`;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error();
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

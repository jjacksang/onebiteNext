import { BookData } from "@/type";

export default async function fetchRandomBooks(): Promise<BookData[]> {
    const url = `https://onebite-books-server-main-three.vercel.app/book/random`;

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

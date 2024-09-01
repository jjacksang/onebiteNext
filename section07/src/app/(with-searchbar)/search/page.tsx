import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
    await delay(1500);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        return <div>오류가 발생하였습니다.</div>;
    }

    const books: BookData[] = await res.json();
    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default async function Page({
    searchParams,
}: {
    searchParams: {
        q?: string;
    };
}) {
    return (
        <Suspense key={searchParams.q || ""} fallback={<BookListSkeleton count={3} />}>
            <SearchResult q={searchParams.q || ""} />
        </Suspense>
    );
}

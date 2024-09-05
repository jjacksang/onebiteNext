import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
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

type Props = {
    searchParams: { q?: string };
};

export function generateMetadata({ searchParams }: Props): Metadata {
    return {
        title: `${searchParams.q} : 한입북스 검색`,
        description: `${searchParams.q} 검색 결과입니다.`,
        openGraph: {
            title: `${searchParams.q} : 한입북스 검색`,
            description: `${searchParams.q} 검색 결과입니다.`,
            images: ["/thumbnail.png"],
        },
    };
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

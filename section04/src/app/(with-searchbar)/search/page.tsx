import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        q?: string;
    };
}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`
    );
    if (!res.ok) {
        return <div>오류가 발생하였습니다.</div>;
    }

    const books: BookData[] = await res.json();

    console.log(books);
    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

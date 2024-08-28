import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

async function AllBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
        cache: "force-cache",
    });
    const allBooks: BookData[] = await res.json();
    // console.log(allBooks);

    if (!res.ok) {
        return <div>오류가 발생하였습니다.</div>;
    }

    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

async function RecoBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {
        next: { revalidate: 3 },
    });
    const RecoBooks: BookData[] = await res.json();

    return (
        <div>
            {RecoBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks />
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks />
            </section>
        </div>
    );
}

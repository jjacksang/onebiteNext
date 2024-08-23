import SearchableLayout from "@/component/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/book.json";
import BookItem from "@/component/book-item";

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천 도서</h3>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};

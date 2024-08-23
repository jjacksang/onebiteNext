import SearchableLayout from "@/component/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/component/book-item";
import fetchBooks from "@/lib/fetch-books";
import { InferGetServerSidePropsType } from "next";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
    //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수

    const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

    return {
        props: {
            allBooks,
            recoBooks,
        },
    };
};

// server에서 받은 props의 타입을 추론하여 정의하는 방법  => InferGetServerSidePropsType<typeof getServerSideProps>
export default function Home({
    allBooks,
    recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천 도서</h3>
                {recoBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {allBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};

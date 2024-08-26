import SearchableLayout from "@/component/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/component/book-item";
import fetchBooks from "@/lib/fetch-books";
import { InferGetStaticPropsType } from "next";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// SSR환경 사용법
// export const getServerSideProps = async () => {
//     //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수

//     const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

//     return {
//         props: {
//             allBooks,
//             recoBooks,
//         },
//     };
// };
// server에서 받은 props의 타입을 추론하여 정의하는 방법  => InferGetServerSidePropsType<typeof getServerSideProps>

//==================================================

// SSG환경 사용법
export const getStaticProps = async () => {
    //SSG에서는 아래 작성한 console.log가 최초 1회만 동작함

    const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

    return {
        props: {
            allBooks,
            recoBooks,
        },
        // revalidate => 재생성하다.
        // ISR에서 시간마다 재생성 하게끔 하는 부분 (시간: s)
    };
};
// SSG환경에서 타입 정의 => InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
    allBooks,
    recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>한입 북스</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="eg:title" content="한입 북스" />
                <meta property="od:description" content="한입 북스에 등록된 도서들을 만나보세요!" />
            </Head>
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
        </>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};

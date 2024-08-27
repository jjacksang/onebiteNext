import SearchableLayout from "@/component/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/component/book-item";
import {
    GetServerSidePropsContext,
    GetStaticPropsContext,
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/type";
import Head from "next/head";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     const q = context.query.q;
//     const books = await fetchBooks(q as string);

//     return {
//         props: {
//             books,
//         },
//     };
// };

// ==============================================

// SSG세팅
// SSG에서는 query string을 사용할 수 없음.
// Client Side에서 query를 가져와 보여주는 방법

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    };

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q]);

    return (
        <div>
            <Head>
                <title>한입 북스 - 검색 결과</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content="한입 북스 - 검색 결과" />
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요!" />
            </Head>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};

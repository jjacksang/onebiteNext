import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Metadata } from "next";

// export const dynamic = "force-static";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto => 기본값, 아무것도 강제하지 않음
// 2. force-dynamic => 페이지를 강제로 Dynamic페이지로 설정
// 3. force-static => 페이지를 강제로 Static페이지로 설정
//  - 기존에 갖고 있던 동적함수(헤더, 쿠키, 쿼리스트링)은 undefiend로 변환
// 4. error => 페이지를 강제로 Static 페이지로 설정(설정하면 안되는 이유가 있다면 오류로 처리)

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

export const metadata: Metadata = {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요.",
    openGraph: {
        title: "한입 북스",
        description: "한입 북스에 등록된 도서를 만나보세요.",
        images: ["/thumbnail.png"],
    },
};

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

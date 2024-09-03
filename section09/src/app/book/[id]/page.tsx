import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";
import { Metadata } from "next";

// ======== generateStaticParams의 값 외엔 허용하지 않고 404 NotFound로 보낼 때 ========
// export const dynamicParams = false;

export function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        return <div>오류가 발생하였습니다.</div>;
    }

    const book = await res.json();

    const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${coverImgUrl}')` }}
            >
                <Image
                    src={coverImgUrl}
                    width={240}
                    height={300}
                    alt={`도서 ${title}의 표지 이미지`}
                />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

async function ReviewList({ bookId }: { bookId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {
        next: { tags: [`review-${bookId}`] },
    });

    if (!res.ok) {
        throw new Error(`Review fetch failed: ${res.statusText}`);
    }

    const reviews: ReviewData[] = await res.json();

    return (
        <section>
            {reviews.map((review) => (
                <ReviewItem key={`review-item-${review.id} `} {...review} />
            ))}
        </section>
    );
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const book: BookData = await res.json();

    return {
        title: `${book.title} - 한입북스`,
        description: `${book.description}`,
        openGraph: {
            title: `${book.title} - 한입북스`,
            description: `${book.description}`,
            images: [book.coverImgUrl],
        },
    };
}

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className={style.container}>
            <BookDetail bookId={params.id} />
            <ReviewEditor bookId={params.id} />
            <ReviewList bookId={params.id} />
        </div>
    );
}

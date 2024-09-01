import { notFound } from "next/navigation";
import style from "./page.module.css";

// ======== generateStaticParams의 값 외엔 허용하지 않고 404 NotFound로 보낼 때 ========
// export const dynamicParams = false;

export function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({ params }: { params: { id: string | string[] } }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`);
    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        return <div>오류가 발생하였습니다.</div>;
    }

    const book = await res.json();

    const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${coverImgUrl}')` }}
            >
                <img src={coverImgUrl} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    );
}

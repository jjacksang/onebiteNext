"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// server action일 때 만약 파일 명을 createReviewAction.ts로 작성하면 action으로 인식을 하지 못함
// createReviewAction.ts ===>>> createReview.action.ts 로 변경하니 자바스크립트 오류 해결

export async function createReviewAction(formData: FormData) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    if (!bookId || !content || !author) return;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
            method: "POST",
            body: JSON.stringify({ bookId, content, author }),
        });

        console.log(res.status);

        // 1. 특정 주소의 해당하는 페이지만 재검증
        // revalidatePath(`/book/${bookId}`); // server에게 해당 경로를 다시 불러오도록 호출

        // 2. 특정 경로의 모든 동적 페이지를 재검증
        // revalidatePath("/book/[id]", "page"); // 모든 book/[id]를 갖는 데이터를 다시 불러옴

        // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
        // revalidatePath("/(with-searchbar)", "layout"); // 첫번째 인수로 갖는 폴더 내의 layout을 재검증

        // 4. 모든 데이터 재검증
        // revalidatePath("/", "layout"); // 첫번째 인수로 index페이지를 기준으로 모든 데이터 재검증

        // 5. 태그 기준, 데이터 캐시 재검증
        revalidateTag(`review-${bookId}`); // tag값을 가진 모든 데이터를 재검증
        // tag란 => 특정 fetch메서드에 { next: { tags: [`some/url`]}}를 주어 server에서 해당 인수를 가진 모든 데이터를 재검증
        // 다른 데이터 캐시를 삭제할 필요 없이 해당 부분만 재검증 시킬 수 있음
    } catch (error) {
        console.error(error);
        return;
    }
}

"use server";

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
    } catch (error) {
        console.error(error);
        return;
    }
}

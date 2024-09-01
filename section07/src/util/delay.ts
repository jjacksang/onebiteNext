// 지연 효과를 만들기 위한 함수

export async function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, ms);
    });
}

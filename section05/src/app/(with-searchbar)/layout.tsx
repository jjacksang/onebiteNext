import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

// Suspense를 사용한 이유
// Next server측에서 use client, 즉 CSR이 있으면 빌드타임에 오류를 유발함
// Suspense를 사용하여 서버측 작업을 모두 실행한 후 실행시키면 build과정에 오류 제거
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar />
            </Suspense>
            {children}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

export default function Searchbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // App route버전에서는 query를 router.query.q로 가져올 수 없기 때문에 제공하는 방법
    const [search, setSearch] = useState("");

    const q = searchParams.get("q");

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className={style.container}>
            <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <button onClick={onSubmit}>검색</button>
        </div>
    );
}

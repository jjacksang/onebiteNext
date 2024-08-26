import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await res.revalidate("/");
        // revalidate 경로 설정
        return res.json({ revalidate: true });
    } catch (error) {
        res.status(500).send("Revalidation Failed");
    }
}

// on Demand ISR route handler
// 특정 조건에 따라서 ISR방식으로 사용하게끔 하는 handler

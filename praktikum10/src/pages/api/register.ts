import { signUp } from "@/utlis/db/servicefirebase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
    alamat: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        await signUp(req.body, (response: { status: string; message: string }) => {
            if (response.status === "success") {
                res.status(200).json({ name: response.message, alamat: "" });
            } else {
                res.status(400).json({ name: response.message, alamat: "" });
            }
        });
    }
    else {
        res.status(405).json({ name: "Method Not Allowed", alamat: "" });
    }
}
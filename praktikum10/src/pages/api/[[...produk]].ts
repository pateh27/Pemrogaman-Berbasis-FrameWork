import type { NextApiRequest, NextApiResponse } from 'next';
import { 
    retrieveProducts,
    retrieveDataByID
} from '../../utlis/db/servicefirebase';

type Data = {
    status: boolean;
    status_code: number;
    data: any;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try {
        const { id } = req.query;

        if (id && typeof id === "string") {
            // Ambil produk by ID: /api/produk?id=abc123
            const data = await retrieveDataByID("products", id);
            return res.status(200).json({
                status: true,
                status_code: 200,
                data
            });
        } else {
            // Ambil semua produk: /api/produk
            const data = await retrieveProducts("products");
            return res.status(200).json({
                status: true,
                status_code: 200,
                data
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            status_code: 500,
            data: [],
            error: error instanceof Error ? error.message : "Failed to fetch products from Firebase"
        });
    }
}
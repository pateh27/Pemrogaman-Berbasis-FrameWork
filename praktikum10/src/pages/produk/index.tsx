import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utlis/swr/fetcher";
import { useRouter } from "next/router";
export type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    kategori: string;
};

const Kategori = () => {
    const { query } = useRouter();
    const { data, isLoading, error } = useSWR("/api/produk", fetcher);
    const product: ProductType[] = data?.data ?? [];

    return (
        <div>
            <TampilanProduk products={product} isLoading={isLoading} />
            <p>{query.produk}</p>
        </div>
    );
};
export default Kategori;
import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utlis/swr/fetcher";

export type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    kategori: string;
};

const Kategori = () => {
    const { data, isLoading } = useSWR("/api/produk", fetcher);

    return (
        <div>
            <TampilanProduk product={isLoading ? [] : data?.data} />
        </div>
    );
};

export default Kategori;
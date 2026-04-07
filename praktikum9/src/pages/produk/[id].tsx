import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../utlis/swr/fetcher';
import TampilanProduk from '../views/produk';

const HalamanProduk = () => {
    const { query } = useRouter();
    const { data, isLoading } = useSWR("/api/produk", fetcher);

    return (
        <div>
            <TampilanProduk product={isLoading ? [] : data?.data} />
        </div>
    );
};

export default HalamanProduk;
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../utlis/swr/fetcher';
import TampilanProduk from '../../views/produk';
import DetailProduct from '@/views/DetailProduct';
import { ProductType } from '@/types/Product.type';

const HalamanProduk = ({ id }: { id : ProductType}) => {
    const { query } = useRouter();
    const { data, isLoading } = useSWR(query.id ? `/api/produk/${query.id}` : null, fetcher);

    if (isLoading || !data?.data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <DetailProduct products={id} />
        </div>
    );
};

export default HalamanProduk;

//server side rendering
export async function getServerSideProps({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params.id}`);
    const respone = await res.json();

    return {
        props: {
            id: respone.data,
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch (`http://localhost:3000/api/produk`)
    const response = await res.json();

    const paths = response.data.map((product: ProductType) => ({
        params: { id: product.id }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}: { params:{ id: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params?.id}`);
    const response = await res.json() as { data: ProductType[] };

    return {
        props: {
            id: response.data
        }
    };
}
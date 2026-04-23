import DetailProduct from '@/views/DetailProduct';
import { ProductType } from '@/types/Product.type';

const HalamanProduk = ({ product }: { product: ProductType }) => {
    if (!product) return <div>Produk tidak ditemukan.</div>;

    return (
        <div>
            <DetailProduct products={product} />
        </div>
    );
};

export default HalamanProduk;

export async function getServerSideProps({ params }: { params: { produk: string } }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produk?id=${params.produk}`);
        const response = await res.json();

        return {
            props: {
                product: response.data ?? null,
            },
        };
    } catch (error) {
        return {
            props: {
                product: null,
            },
        };
    }
}
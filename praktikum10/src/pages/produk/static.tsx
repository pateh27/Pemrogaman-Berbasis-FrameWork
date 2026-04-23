import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "../../utlis/db/servicefirebase";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
    const { products } = props;
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk product={products} />
        </div>
    );
};

export async function getStaticProps() {
    try {
        const data = await retrieveProducts("products");
        return {
            props: {
                products: data ?? [],
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("getStaticProps error:", error);
        return {
            props: {
                products: [],
            },
            revalidate: 10,
        };
    }
}

export default halamanProdukStatic;
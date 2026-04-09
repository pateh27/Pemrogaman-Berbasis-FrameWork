import produk from "../../views/produk";
import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";

const halamanProdukServer = (props: { produk: ProductType[] }) => {
    const { produk } = props;
    return (
        <div>
            <h1>Halaman Produk</h1>
            <TampilanProduk product={produk} />
        </div>
    );
};

export default halamanProdukServer;


// fungsi getServerSideProps untuk mengambil data produk dari API
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    //console.log("Data produk yang diambil dari API:", response);
    return {
        props: {
            produk: response.data,
        },
    };
}
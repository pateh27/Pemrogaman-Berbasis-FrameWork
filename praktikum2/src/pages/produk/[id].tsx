import { useRouter } from "next/router";

const HalamanProduk = () => {
        //const Router = useRouter();
        //console.log(Router); //x4 {pathname: "/produk/[id]", route: "/produk/[id]", query: {id: 'sepatu'}, asPath: "/produk/sepatu", component: {'/produk/[id]
        const { query } = useRouter();
     return (
        <div>
            <h1>Halaman Produk</h1>
            <p>Produk ID: {query.id}</p>
        </div>
    );
}

export default HalamanProduk;
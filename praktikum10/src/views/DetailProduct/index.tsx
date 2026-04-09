import { ProductType } from "@/types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduct = ({ products }: { products: ProductType }) => {
    return (
        <>
        <h1 style={{ textAlign: 'center' , fontSize: '2rem' , fontWeight: 'bold' }}>Detail Produk</h1>
        <div className= {styles.produkdetail}>
            <div className={styles.produkdetail__image}>
                <img src={products.image} alt={products.name} />
            </div>

            <div className={styles.produkdetail__info}>
                <h1 className={styles.produkdetail__name}>{products.name}</h1>
                <p className={styles.produkdetail__category}>{products.kategori}</p>
                <p className={styles.produkdetail__price}>
                    Rp {(products?.price ?? 0).toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    
    </>
    );
};
export default DetailProduct;
import styles from "./produk.module.scss";
import { ProductType } from "../../produk";
type Props = {
    products: ProductType[];
};

const MainSection = ({ products }: Props) => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.container}>
                <h2>Daftar Produk</h2>
                <div className={styles.productGrid}>
                    {products.map((product) => (  // ✅ render dari API
                        <div key={product.id} className={styles.productCard}>
                            <img src={product.image} alt={product.name} className={styles.img} />
                            <h3>{product.name}</h3>
                            <p className={styles.price}>
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MainSection;
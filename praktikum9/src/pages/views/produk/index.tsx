import styles from "../../produk/produk.module.scss";

type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    kategori: string;
};

const TampilanProduk = ({ product }: { product: ProductType[] }) => {
    return (
        <div className={styles.produk}>
            <h1 className={styles.produk__title}>Daftar Produk</h1>
            <div className={styles.produk__content}>
                {product.length > 0 ? (
                    product.map((product: ProductType) => (
                        <div key={product.id} className={styles.produk__content__item}>
                            <img src={product.image} alt={product.name} width={200} />
                            <h4 className={styles.produk__content__item__name}>
                                {product.name}
                            </h4>
                            <p className={styles.produk__content__item__category}>
                                {product.kategori}
                            </p>
                            <p className={styles.produk__content__item__price}>
                                Rp {product.price.toLocaleString("id-ID", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className={styles.produk__content__skeleton}>
                        <div className={styles.produk__content__skeleton__image}></div>
                        <div className={styles.produk__content__skeleton__name}></div>
                        <div className={styles.produk__content__skeleton__price}></div>
                        <div className={styles.produk__content__skeleton__category}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TampilanProduk;
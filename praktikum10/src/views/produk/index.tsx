import styles from "./produk.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    kategori: string;
};

const TampilanProduk = ({ 
    products = [], 
    isLoading = false 
}: { 
    products?: ProductType[];
    isLoading?: boolean;
}) => {
    return (
        <div className={styles.produk}>
            <h1 className={styles.produk__title} data-testid="title">Product Page</h1>
            <div className={styles.produk__content} data-testid="produk-content">
                {isLoading ? (
                    // 4 skeleton items
                    <>
                        <div data-testid="skeleton" className={styles.produk__content__skeleton}>
                            <div className={styles.produk__content__skeleton__image}/>
                            <div className={styles.produk__content__skeleton__name}/>
                            <div className={styles.produk__content__skeleton__price}/>
                            <div className={styles.produk__content__skeleton__category}/>
                        </div>
                        <div data-testid="skeleton" className={styles.produk__content__skeleton}>
                            <div className={styles.produk__content__skeleton__image}/>
                            <div className={styles.produk__content__skeleton__name}/>
                            <div className={styles.produk__content__skeleton__price}/>
                            <div className={styles.produk__content__skeleton__category}/>
                        </div>
                        <div data-testid="skeleton" className={styles.produk__content__skeleton}>
                            <div className={styles.produk__content__skeleton__image}/>
                            <div className={styles.produk__content__skeleton__name}/>
                            <div className={styles.produk__content__skeleton__price}/>
                            <div className={styles.produk__content__skeleton__category}/>
                        </div>
                        <div data-testid="skeleton" className={styles.produk__content__skeleton}>
                            <div className={styles.produk__content__skeleton__image}/>
                            <div className={styles.produk__content__skeleton__name}/>
                            <div className={styles.produk__content__skeleton__price}/>
                            <div className={styles.produk__content__skeleton__category}/>
                        </div>
                    </>
                ) : (
                    products.map((product: ProductType) => (
                        <Link href={`/produk/${product.id}`} key={product.id} className={styles.produk__content__item}>
                            <Image src={product.image} alt={product.name} width={200} height={200} />
                            <h4>{product.name}</h4>
                            <p>Kategori: {product.kategori}</p>
                            <p>Ukuran: {product.size}</p>
                            <p>Rp {product.price.toLocaleString("id-ID", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            })}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default TampilanProduk;
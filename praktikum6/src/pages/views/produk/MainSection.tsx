import styles from "./produk.module.scss";

const MainSection = () => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.container}>
                <h2>Daftar Produk</h2>
                <div className={styles.productGrid}>
                    <div className={styles.productCard}>
                        <h3>Produk 1</h3>
                        <p>Deskripsi produk 1</p>
                        <p className={styles.price}>Rp 100.000</p>
                    </div>
                    <div className={styles.productCard}>
                        <h3>Produk 2</h3>
                        <p>Deskripsi produk 2</p>
                        <p className={styles.price}>Rp 200.000</p>
                    </div>
                    <div className={styles.productCard}>
                        <h3>Produk 3</h3>
                        <p>Deskripsi produk 3</p>
                        <p className={styles.price}>Rp 150.000</p>
                    </div>
                    <div className={styles.productCard}>
                        <h3>Produk 4</h3>
                        <p>Deskripsi produk 4</p>
                        <p className={styles.price}>Rp 300.000</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
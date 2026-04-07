import styles from '../styles/404.module.scss';

const Custom404 = () => {
  return (
    <>
    <head>
      <title>404 - Not Found</title>
    </head>
    <div className={styles.error}>
      <img src="/page-not-found.png" alt="404" className={styles.error__image}/>

      <h1 className={styles.error__title}>
        404 - Halaman Tidak Ditemukan
      </h1>
      
      <p className={styles.error__desc}>
        Maaf, Halaman yang Anda cari tidak tersedia atau telah dialihkan.
      </p>
      
      <a href="/" className={styles.error__button}>
        Kembali ke Beranda
      </a>
    </div>
    </>
  );
}

export default Custom404;
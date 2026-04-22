import Script from "next/dist/client/script";
import { useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  const {data}: any = useSession();
  const titleRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.navbar}>
         <div className={styles.navbar__brand} ref={titleRef} id="tittle"></div>
        <Script 
          id="tittle-script" 
          strategy='lazyOnload'
          dangerouslySetInnerHTML={{
            __html: `document.getElementById("tittle").innerText = 'MyApp';`
          }}
        />
        <div className={styles.navbar__right}>
          {data ? (
            <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              {data.user.img && (
                <Image
                  width={50}
                  height={50}
                  src={data.user.img}
                  alt={data.user.fullname}
                  className={styles.navbar__user__image}
                  />
              )}
            </div>
              <button className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
               onClick={() => signOut()}
               >
                Sign Out                
              </button>
            </>
          ) : (
              <button className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
              onClick={() => signIn()}
              >
              Sign In
              </button>
            )}
       </div>
    </div>
    );
};

export default Navbar;
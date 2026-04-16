import Link from "next/link";
import styles from "./login.module.scss";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const HalamanLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            setError("Email dan password harus diisi");
            return;
        }

        setIsLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/produk",
        });

        setIsLoading(false);

        if (res?.error) {
            setError(res.error || "Login gagal");
        } else if (res?.url) {
            push(res.url);
        } else {
            setError("Login gagal");
        }
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Halaman Login</h1>
            <div className={styles.login__form}>
                {error && (
                    <p className={styles.login__error}>{error}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.login__form__item}>
                        <label
                            htmlFor="email"
                            className={styles.login__form__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={styles.login__form__input}
                        />
                    </div>
                    <div className={styles.login__form__item}>
                        <label
                            htmlFor="password"
                            className={styles.login__form__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={styles.login__form__input}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.login__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
                <br />
                <p className={styles.login__form__item__text}>
                    Belum punya akun? <Link href="/auth/register">Daftar</Link>
                </p>
            </div>
        </div>
    );
};

export default HalamanLogin;
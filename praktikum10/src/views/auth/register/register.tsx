import Link from "next/link";
import styles from "./register.module.scss";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const halamanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullname = formData.get("fullname") as string;
    const password = formData.get("password") as string;

    // Validasi dulu, kalau gagal langsung stop
    if (!email || !fullname || !password) {
        setError("Semua field harus diisi");
        return; // ini valid di async function
    }

    if (password.length < 6) {
        setError("Password minimal 6 karakter");
        return; // ini juga valid
    }

    setIsLoading(true)

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, fullname, password }),
        });

        if (response.status === 200) {
            (event.target as HTMLFormElement).reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            const data = await response.json();
            setError(data.message || "Registrasi gagal");
        }
    };

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Halaman Register</h1>
            <div className={styles.register__form}>
                {/* Tampilkan error di dalam form */}
                {error && (
                    <p className={styles.register__error}>{error}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label
                            htmlFor="email"
                            className={styles.register__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label
                            htmlFor="fullname"
                            className={styles.register__form__item__label}
                        >
                            Fullname
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname" // ← fix: harus sama dengan formData.get("fullname")
                            placeholder="Fullname"
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label
                            htmlFor="password"
                            className={styles.register__form__item__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password (min. 6 karakter)"
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.register__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
                <br />
                <p className={styles.register__form__item__text}>
                    Sudah punya akun? <Link href="/auth/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default halamanRegister;
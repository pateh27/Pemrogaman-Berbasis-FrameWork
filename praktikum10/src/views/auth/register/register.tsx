import Link from "next/link";
import styles from "./register.module.scss";

const halamanRegister = () => {
    return (
        <div className={styles.register}>
            <h1 className="text-3xl font-bold text-blue-600">Halaman Register</h1>
            <form style={{display: "flex", flexDirection: "column", gap: "10px", border: "1px solid black", padding: "10px", borderRadius: "5px"}}>
                <div>
                    <label>Username: <input type="text"/></label>
                </div>
                <div>
                    <label>Email: <input type="email" /></label>
                </div>
                <div>
                    <label>Password: <input type="password" /></label>
                </div>
                <button type="button">Register</button>
            </form>
            <br />
            <Link href="/auth/login">Ke Halaman Login</Link>
        </div>
    );
};

export default halamanRegister;
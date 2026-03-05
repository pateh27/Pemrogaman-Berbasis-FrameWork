import Link from "next/link";

const halamanRegister = () => {
    return (
        <div>
            <h1>Halaman Register</h1>
            <form>
                <div>
                    <label>Username: <input type="text" /></label>
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
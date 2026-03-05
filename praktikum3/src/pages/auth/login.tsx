import Link from "next/link";
import { useRouter } from "next/router";

const halamanLogin = () => {
    const {push} = useRouter();

    const handlerLogin = () => {
        push("/produk");
    }
    
    return (
        <div>
            <h1>Halaman Login</h1>
            <form>
                <div>
                    <label>Username: <input type="text" /></label>
                </div>
                <div>
                    <label>Password: <input type="password" /></label>
                </div>
                <button type="button" onClick={handlerLogin}>Login (Imperatif)</button>
            </form>
            <br />
            <Link href="/auth/register">Ke Halaman Register (Link)</Link>
        </div>
    );
};

export default halamanLogin;
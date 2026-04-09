import Link from "next/link";
import { useRouter } from "next/router";
//import syles from "./login.module.css";
import styles from "./login.module.scss";

const halamanLogin = () => {
    const {push} = useRouter();

    const handlerLogin = () => {
        push('/produk');
    }
    
       return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Halaman Login
                </h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Masukkan email"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Masukkan password"
                        />
                    </div>
                    
                    <button 
                        onClick={() => handlerLogin()}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-6"
                    >
                        Login
                    </button>
                </div>
                
                <p className="text-center text-sm text-gray-600 mt-4">
                    Belum punya akun?{" "}
                    <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium">
                        Daftar di sini
                    </Link>=
                </p>
            </div>
        </div>
    );
};

export default halamanLogin;
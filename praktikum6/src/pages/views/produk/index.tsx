import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";

function TampilanProduk() {
    // const [isLogin, setIsLogin] = useState(false);
    // const { push } = useRouter();
    // useEffect(() => {
    //     if (!isLogin) {
    //         push('/auth/login');
    //     }
    // }, []);
    return (
        <div>
            <HeroSection />
            <MainSection />
        </div>
    );
}

export default TampilanProduk;
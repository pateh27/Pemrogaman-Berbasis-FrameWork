import { useRouter }  from "next/router";
import Navbar from "../navbar";


const disableNavbar = ["/auth/login", "/auth/register"];


type AppShellProps = {
  children: React.ReactNode;
};


const AppShell = (props:AppShellProps) => {
    const { children } = props;
    const {pathname} = useRouter();
    return (
        <main>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
            <footer>
                <p>Footer</p>
            </footer>
        </main>
    );
};

export default AppShell;
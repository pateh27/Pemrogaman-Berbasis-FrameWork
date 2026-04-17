import { useSession } from "next-auth/react";

const HalamanEditor = () => {
    const {data}: any = useSession();

    return (
        <div>
            <h1>Editor Page</h1>
            <h1> Selamat Datang {data?.user.fullname}</h1>
        </div>
    )
}

export default HalamanEditor;
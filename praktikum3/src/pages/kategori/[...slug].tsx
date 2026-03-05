import { useRouter }  from "next/router";

const halamanKategori = () => {
    const {query} = useRouter();
    const slug = query.slug as string[] | undefined;

    return (
        <div>
            <h1>Halaman Kategori</h1>
            <h2>URL Parameters:</h2>
            {slug && slug.length > 0 ? (
                <ul>
                    {slug.map((param, index) => (
                        <li key={index}>{param}</li>
                    ))}
                </ul>
            ) : (
                <p>Tidak ada parameter</p>
            )}
        </div>
    );
};

export default halamanKategori;

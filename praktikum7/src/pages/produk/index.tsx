import { useEffect, useState } from "react";
import TampilanProduk from "../views/produk";

type ProductType = {
    id: string;
    name : string;
    price : number;
    size : string;
    kategori : string;
};

const kategori = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setError(null);
            const response = await fetch("/api/produk");
            const responsedata = await response.json();
            
            if (responsedata.status) {
                setProducts(responsedata.data);
            } else {
                setError(responsedata.error || "Failed to fetch products");
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error instanceof Error ? error.message : "An error occurred while fetching products");
            setProducts([]);
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            await fetchProducts();
            setLoading(false);
        };
        loadProducts();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    };

    if (loading) {
        return <div><h1>Loading products...</h1></div>;
    }

    if (error && products.length === 0) {
        return (
            <div>
                <h1>Error: {error}</h1>
                <p>Please check the browser console for more details.</p>
                <button onClick={handleRefresh} disabled={refreshing}>
                    {refreshing ? "Refreshing..." : "Try Again"}
                </button>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Daftar Produk</h1>
                <button 
                    onClick={handleRefresh} 
                    disabled={refreshing}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: refreshing ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: refreshing ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                >
                    {refreshing ? "Refreshing..." : "🔄 Refresh Data"}
                </button>
            </div>
            
            {error && <div style={{ color: "red", marginBottom: "15px" }}>Warning: {error}</div>}
            
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
                    {products.map((product: ProductType) => (
                        <div 
                            key={product.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "15px",
                                borderRadius: "4px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}
                        > 
                            <h2>{product.name}</h2>
                            <p><strong>Harga:</strong> Rp {product.price.toLocaleString("id-ID")}</p>
                            <p><strong>Ukuran:</strong> {product.size}</p>
                            <p><strong>Kategori:</strong> {product.kategori}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default kategori;
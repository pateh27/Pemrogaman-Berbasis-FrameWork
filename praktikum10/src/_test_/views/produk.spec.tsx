import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/views/produk";
import '@testing-library/jest-dom'
import kategori from "@/pages/produk/index_Duplicate";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />
    }
}))

jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, href }: any) => {
        return <a href={href}>{children}</a>
    }
}))

describe("TampilanProduk View Component", () => {
    it("renders title correctly", () => {
        render(<TampilanProduk products={[]} isLoading={false} />);
        const titleElement = screen.getByTestId("title");
        expect(titleElement.textContent).toBe("Product Page");
        expect(titleElement).toBeInTheDocument();
    })

    it("renders loading state with 4 skeleton items", () => {
        render(<TampilanProduk products={[]} isLoading={true} />);
        const skeletons = screen.getAllByTestId("skeleton");
        expect(skeletons).toHaveLength(4);
        skeletons.forEach((skeleton) => {
            expect(skeleton).toBeInTheDocument();
        })
    })

    it("renders empty products list when isLoading false and products empty", () => {
        render(<TampilanProduk products={[]} isLoading={false} />);
        const produkContent = screen.getByTestId("produk-content");
        expect(produkContent).toBeInTheDocument();
        expect(produkContent.children.length).toBe(0);
    })

    it("renders single product with all fields", () => {
        const mockProducts = [
            {
                id: "1",
                name: "Produk Test",
                kategori: "Kategori A",
                price: 50000,
                size: "M",
                image: "/test.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} isLoading={false} />);
        
        expect(screen.getByText("Produk Test")).toBeInTheDocument();
        expect(screen.getByText("Kategori: Kategori A")).toBeInTheDocument();
        expect(screen.getByText("Rp 50.000")).toBeInTheDocument();
        expect(screen.getByText("Ukuran: M")).toBeInTheDocument();
    })

    it("renders multiple products", () => {
        const mockProducts = [
            {
                id: "1",
                name: "Product 1",
                kategori: "Category A",
                price: 10000,
                size: "S",
                image: "/img1.jpg"
            },
            {
                id: "2",
                name: "Product 2",
                kategori: "Category B",
                price: 20000,
                size: "M",
                image: "/img2.jpg"
            },
            {
                id: "3",
                name: "Product 3",
                kategori: "Category C",
                price: 30000,
                size: "L",
                image: "/img3.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} isLoading={false} />);
        
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getByText("Product 3")).toBeInTheDocument();
    })

    it("formats price with locale string correctly", () => {
        const mockProducts = [
            {
                id: "1",
                name: "Expensive",
                kategori: "Premium",
                price: 1500000,
                size: "XL",
                image: "/expensive.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} isLoading={false} />);
        expect(screen.getByText("Rp 1.500.000")).toBeInTheDocument();
    })

    it("renders product links with correct href format", () => {
        const mockProducts = [
            {
                id: "abc123",
                name: "Test Product",
                kategori: "Test",
                price: 99999,
                size: "M",
                image: "/test.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} isLoading={false} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/produk/abc123");
    })

    it("renders product images with correct alt and src attributes", () => {
        const mockProducts = [
            {
                id: "1",
                name: "Image Test",
                kategori: "Test",
                price: 50000,
                size: "M",
                image: "/image-path.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} isLoading={false} />);
        const image = screen.getByAltText("Image Test");
        expect(image).toBeInTheDocument();
        expect(image.tagName).toBe("IMG");
    })

    it("handles default isLoading prop as false", () => {
        const mockProducts = [
            {
                id: "1",
                name: "Test",
                kategori: "Test",
                price: 10000,
                size: "M",
                image: "/test.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} />);
        expect(screen.getByText("Test")).toBeInTheDocument();
    })

    it("renders with various price ranges", () => {
        const mockProducts = [
            {
                id: "1",
                name: "Cheap",
                kategori: "Budget",
                price: 5000,
                size: "S",
                image: "/cheap.jpg"
            },
            {
                id: "2",
                name: "Expensive",
                kategori: "Premium",
                price: 9999999,
                size: "XXL",
                image: "/expensive.jpg"
            }
        ];

        render(<TampilanProduk products={mockProducts} isLoading={false} />);
        expect(screen.getByText("Rp 5.000")).toBeInTheDocument();
        expect(screen.getByText("Rp 9.999.999")).toBeInTheDocument();
    })
})

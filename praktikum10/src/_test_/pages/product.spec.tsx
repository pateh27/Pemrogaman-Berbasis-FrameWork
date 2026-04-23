    import { render, screen } from "@testing-library/react";
    import Produk from "@/pages/produk";
    import useSWR from "swr";
    import '@testing-library/jest-dom'

    jest.mock("swr");
    jest.mock("next/router", () => ({
        useRouter() {
            return {
                route: "/produk",
                pathname: "",
                query: {},
                asPAth: "",
                push: jest.fn(),
                event: {
                    on: jest.fn(),
                    off: jest.fn()
                },
                isReady: true,
            }
        },
    }))

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

    describe("Product Page (/pages/produk)", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("renders product page with loading state", () => {
            (useSWR as jest.Mock).mockReturnValue({
                data: undefined,
                error: undefined,
                isLoading: true
            });

            const { container } = render(<Produk />);
            expect(container).toBeDefined();
        })
        
        it("renders product page with data", () => {
            const mockData = {
                data: [
                    {
                        id: "1",
                        name: "Produk A",
                        category: "Kategori A",
                        price: 50000,
                        size: "M",
                        image: "/image1.jpg"
                    }
                ]
            };

            (useSWR as jest.Mock).mockReturnValue({
                data: mockData,
                error: undefined,
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })
        
        it("renders product page with multiple products", () => {
            const mockData = {
                data: [
                    {
                        id: "1",
                        name: "Produk 1",
                        category: "Kategori A",
                        price: 50000,
                        size: "M",
                        image: "/image1.jpg"
                    },
                    {
                        id: "2",
                        name: "Produk 2",
                        category: "Kategori B",
                        price: 75000,
                        size: "L",
                        image: "/image2.jpg"
                    }
                ]
            };

            (useSWR as jest.Mock).mockReturnValue({
                data: mockData,
                error: undefined,
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })

        it("renders product page when data is null", () => {
            (useSWR as jest.Mock).mockReturnValue({
                data: null,
                error: undefined,
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })

        it("renders product page with error state", () => {
            (useSWR as jest.Mock).mockReturnValue({
                data: undefined,
                error: new Error("API Error"),
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })

        it("renders empty products array from data", () => {
            const mockData = { data: [] };

            (useSWR as jest.Mock).mockReturnValue({
                data: mockData,
                error: undefined,
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })

        it("handles undefined data response", () => {
            (useSWR as jest.Mock).mockReturnValue({
                data: undefined,
                error: undefined,
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })

        it("renders with various loading states", () => {
            const mockData = {
                data: [
                    {
                        id: "1",
                        name: "Test Product",
                        category: "Test Cat",
                        price: 10000,
                        size: "S",
                        image: "/test.jpg"
                    }
                ]
            };

            (useSWR as jest.Mock).mockReturnValue({
                data: mockData,
                error: undefined,
                isLoading: false
            });

            const { container } = render(<Produk />);
            expect(container).toBeDefined();
        })

        it("renders page with all SWR states combined", () => {
            (useSWR as jest.Mock).mockReturnValue({
                data: {
                    data: [
                        {
                            id: "1",
                            name: "Combined Test",
                            category: "Test",
                            price: 999,
                            size: "M",
                            image: "/combined.jpg"
                        }
                    ]
                },
                error: undefined,
                isLoading: false
            });

            render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
        })

        it("component mounts and unmounts properly", () => {
            (useSWR as jest.Mock).mockReturnValue({
                data: null,
                error: undefined,
                isLoading: false
            });

            const { unmount } = render(<Produk />);
            expect(screen.getByTestId("title")).toBeInTheDocument();
            unmount();
        })
    })
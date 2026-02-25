import Link from "next/link";
import { blogs } from "@/data/blogs";

const BlogPage = () => {
    return (
        <div>
            <h1>Halaman Blog</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`}>
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;
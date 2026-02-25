import { GetServerSideProps } from "next";
import { blogs } from "@/data/blogs";

interface Props {
    title: string;
    description: string;
}

const HalamanBlog = ({ title, description }: Props) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params!;

    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return { notFound: true };
    }

    return {
        props: {
            title: blog.title,
            description: blog.description,
        },
    };
};

export default HalamanBlog;
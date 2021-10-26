import clsx from "clsx";
import React from "react";

import { useProductPathsQuery } from "../graphql/autogenerate/hooks";

const Products = () => {
    const { loading, error, data } = useProductPathsQuery();

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error</p>;

    if (data) {
        const latestProducts = data.products?.edges || [];

        return (
            <ul role="list" className="grid gap-4 grid-cols-4">
                {latestProducts?.length > 0 &&
                    latestProducts.map(({ node: { id, name, thumbnail, category } }) => (
                        <li key={id} className="relative bg-white">
                            <img src={thumbnail?.url} alt="" />

                            <div className="p-2 border-gray-100 border-t">
                                <p className="block text-lg text-gray-900 truncate">{name}</p>
                                <p className="block text-sm font-medium text-gray-500">
                                    {category?.name}
                                </p>
                            </div>
                        </li>
                    ))}
            </ul>
        );
    }

    return null;
};

const navigation = [
    { name: "Products", href: "#", current: true },
    { name: "WishList", href: "#", current: false },
];

const ProductPage: React.VFC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto shadow-sm px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex space-x-8">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                            item.current
                                                ? "border-indigo-500 text-gray-900"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                            "inline-flex items-center px-2 border-b-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <header className="mb-4">
                    <div className="max-w-7xl mx-auto px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>

                <main>
                    <div className="max-w-7xl mx-auto px-8">
                        <Products />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductPage;

// const apolloClient = initializeApollo();
//
// export const getStaticPaths = async () => {
//     // here we use the Apollo client to retrieve all products
//     const result: ApolloQueryResult<ProductPathsQuery | undefined> =
//         await apolloClient.query({
//             query: ProductPathsDocument,
//             variables: {},
//         });
//
//     const paths =
//         result.data?.products?.edges.map(({ node }) => ({
//             params: { slug: node.slug },
//         })) || [];
//
//     return {
//         paths,
//         fallback: true,
//     };
// };
//
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     const productSlug = context.params?.slug?.toString();
//     const data: ApolloQueryResult<ProductBySlugQuery | undefined> =
//         await apolloClient.query({
//             query: ProductBySlugDocument,
//             variables: {
//                 slug: productSlug,
//             },
//         });
//     return {
//         props: {
//             productSSG: data,
//         },
//         revalidate: 60, // value in seconds, how often ISR will trigger on the server
//     };
// };

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     // pass along the headers for authentication
//     const client = initializeApollo({ headers: context?.req?.headers });
//     try {
//         await client.query<AllOrdersQuery>({
//             query: ALL_ORDERS_QUERY,
//         });
//
//         return addApolloState(client, {
//             props: {},
//         });
//     } catch {
//         return {
//             props: {},
//             redirect: {
//                 destination: "/signin",
//                 permanent: false,
//             },
//         };
//     }
// };

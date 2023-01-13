import { ProductPage, ProductPageProps } from "@mzawadie/apps";

export default ProductPage;

ProductPage.getInitialProps = async ({ query }) => ({ query } as ProductPageProps);

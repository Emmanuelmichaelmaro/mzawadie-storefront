import { CategoryPage, CategoryPageProps } from "@mzawadie/apps";

export default CategoryPage;

CategoryPage.getInitialProps = async ({ query }) => ({ query } as CategoryPageProps);

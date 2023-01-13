import { ArticlePage, ArticlePageProps } from "@mzawadie/apps";

export default ArticlePage;

ArticlePage.getInitialProps = async ({ query }) => ({ query } as ArticlePageProps);

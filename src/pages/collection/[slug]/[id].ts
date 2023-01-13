import { CollectionPage, CollectionPageProps } from "@mzawadie/apps";

export default CollectionPage;

CollectionPage.getInitialProps = async ({ query }) => ({ query } as CollectionPageProps);

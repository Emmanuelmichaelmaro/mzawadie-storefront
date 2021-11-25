import { ThankYouPage, ThankYouPageProps } from "@next/pages";

export default ThankYouPage;

ThankYouPage.getInitialProps = async ({ query }) => ({ query } as ThankYouPageProps);

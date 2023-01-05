import { OrderDetails, OrderDetailsProps } from "../../apps/Account/User/views";

export default OrderDetails;

OrderDetails.getInitialProps = async ({ query }) => ({ query } as OrderDetailsProps);

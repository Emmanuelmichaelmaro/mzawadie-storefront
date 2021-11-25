import { OrderDetails, OrderDetailsProps } from "../../../views/Account/User/views";

export default OrderDetails;

OrderDetails.getInitialProps = async ({ query }) => ({ query } as OrderDetailsProps);

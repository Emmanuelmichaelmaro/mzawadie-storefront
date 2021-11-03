import { Collection, Product } from "../graphql/autogenerate/schemas";

export type FeaturedProducts = {
    products: Product[];
} & Partial<Pick<Collection, "name" | "backgroundImage">>;

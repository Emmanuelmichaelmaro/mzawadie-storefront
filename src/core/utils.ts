// @ts-nocheck
import { ProductOrder } from "@mzawadie/sdk/lib/src";
import { IFilterAttributes } from "@next/types";
import { History, LocationState } from "history";
import { Base64 } from "js-base64";
import { each } from "lodash";
import { parse as parseQs, stringify as stringifyQs } from "query-string";

import { AttributeInput, OrderDirection, ProductOrderField } from "../../gqlTypes/globalTypes";
import { PriceInterface } from "./types";

export const slugify = (text: string | number): string =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (graphqlId: string, schema?: string): number => {
    // This is temporary solution, we will use slugs in the future
    const rawId = Base64.decode(graphqlId);
    const regexp = /(\w+):(\d+)/;
    // @ts-ignore
    const [, expectedSchema, id] = regexp.exec(rawId);
    if (schema && schema !== expectedSchema) {
        throw new Error("Schema is not correct");
    }
    return parseInt(id, 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
    // This is temporary solution, we will use slugs in the future
    Base64.encode(`${schema}:${id}`);

export const priceToString = (price: PriceInterface, locale?: string): string => {
    const { amount } = price;
    if (locale) {
        return amount.toLocaleString(locale, {
            currency: price.currency,
            style: "currency",
        });
    } else {
        return `${price.currency} ${amount.toFixed(2)}`;
    }
};

export const maybe = <T>(exp: () => T, d?: T) => {
    try {
        const result = exp();
        return result === undefined ? d : result;
    } catch {
        return d;
    }
};

export const parseQueryString = (location: LocationState): { [key: string]: string } => {
    const query = {
        ...parseQs((location as any).search.substr(1)),
    };
    each(query, (value, key) => {
        if (Array.isArray(value)) {
            query[key] = value[0];
        }
    });
    return query as { [key: string]: string };
};

export const updateQueryString = (location: LocationState, history: History) => {
    const querystring = parseQueryString(location);

    return (key: string, value?: any) => {
        if (value === "") {
            delete querystring[key];
        } else {
            querystring[key] = value || key;
        }
        history.replace("?" + stringifyQs(querystring));
    };
};

export const generateProductUrl = (id: string, name: string) =>
    `/product/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export const generateCategoryUrl = (id: string, name: string) =>
    `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id: string, name: string) =>
    `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

export const getValueOrEmpty = <T>(value: T): T | string =>
    value === undefined || value === null ? "" : value;

interface AttributeDict {
    [attributeSlug: string]: string[];
}

export const convertToAttributeScalar = (
    attributes: AttributeDict | IFilterAttributes
): AttributeInput[] =>
    Object.entries(attributes)
        .map(([key, value]) => value.map((attribute: any) => ({ slug: key, values: [attribute] })))
        .reduce((prev, curr) => [...prev, ...curr], []);

export const convertSortByFromString = (sortBy: string): ProductOrder | null => {
    if (!sortBy) {
        return null;
    }

    const direction = sortBy.startsWith("-") ? OrderDirection.DESC : OrderDirection.ASC;

    let field;

    switch (sortBy.replace(/^-/, "")) {
        case "name":
            field = ProductOrderField.NAME;
            break;

        case "price":
            field = ProductOrderField.MINIMAL_PRICE;
            break;

        case "updated_at":
            field = ProductOrderField.DATE;
            break;

        default:
            return null;
    }

    return { field, direction };
};

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

/**
 * The parameters that were parsed from the URL path.
 */
export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

/**
 * A PathPattern is used to match on some portion of a URL pathname.
 */
export interface PathPattern {
    /**
     * A string to match against a URL pathname. May contain `:id`-style segments
     * to indicate placeholders for dynamic parameters. May also end with `/*` to
     * indicate matching the rest of the URL pathname.
     */
    path: string;
    /**
     * Should be `true` if the static portions of the `path` should be matched in
     * the same case.
     */
    caseSensitive?: boolean;
    /**
     * Should be `true` if this pattern should match the entire URL pathname.
     */
    end?: boolean;
}

/**
 * A PathMatch contains info about how a PathPattern matched on a URL pathname.
 */
export interface PathMatch<ParamKey extends string = string> {
    /**
     * The names and values of dynamic parameters in the URL.
     */
    params: Params<ParamKey>;
    /**
     * The portion of the URL pathname that was matched.
     */
    pathname: string;
    /**
     * The portion of the URL pathname that was matched before child routes.
     */
    pathnameBase: string;
    /**
     * The pattern that was used to match.
     */
    pattern: PathPattern;
}

/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/docs/en/v6/api#matchpath
 */
export function matchPath<ParamKey extends string = string>(
    pattern: PathPattern | string,
    pathname: string
): PathMatch<ParamKey> | null {
    if (typeof pattern === "string") {
        pattern = { path: pattern, caseSensitive: false, end: true };
    }

    let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);

    let match = pathname.match(matcher);
    if (!match) return null;

    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params: Params = paramNames.reduce<Mutable<Params>>((memo, paramName, index) => {
        // We need to compute the pathnameBase here using the raw splat value
        // instead of using params["*"] later because it will be decoded then
        if (paramName === "*") {
            let splatValue = captureGroups[index] || "";
            pathnameBase = matchedPathname
                .slice(0, matchedPathname.length - splatValue.length)
                .replace(/(.)\/+$/, "$1");
        }

        memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
        return memo;
    }, {});

    return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern,
    };
}

const compilePath = (path: string, caseSensitive = false, end = true): [RegExp, string[]] => {
    warning(
        path === "*" || !path.endsWith("*") || path.endsWith("/*"),
        `Route path "${path}" will be treated as if it were ` +
            `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
            `always follow a \`/\` in the pattern. To get rid of this warning, ` +
            `please change the route path to "${path.replace(/\*$/, "/*")}".`
    );

    let paramNames: string[] = [];
    let regexpSource =
        "^" +
        path
            .replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
            .replace(/^\/*/, "/") // Make sure it has a leading /
            .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
            .replace(/:(\w+)/g, (_: string, paramName: string) => {
                paramNames.push(paramName);
                return "([^\\/]+)";
            });

    if (path.endsWith("*")) {
        paramNames.push("*");
        regexpSource +=
            path === "*" || path === "/*"
                ? "(.*)$" // Already matched the initial /, just match the rest
                : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
    } else {
        regexpSource += end
            ? "\\/*$" // When matching to the end, ignore trailing slashes
            : // Otherwise, at least match a word boundary. This restricts parent
              // routes to matching only their own words and nothing more, e.g. parent
              // route "/home" should not match "/home2".
              "(?:\\b|$)";
    }

    let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");

    return [matcher, paramNames];
};

const safelyDecodeURIComponent = (value: string, paramName: string) => {
    try {
        return decodeURIComponent(value);
    } catch (error) {
        warning(
            false,
            `The value for the URL param "${paramName}" will not be decoded because` +
                ` the string "${value}" is a malformed URL segment. This is probably` +
                ` due to a bad percent encoding (${error}).`
        );

        return value;
    }
};

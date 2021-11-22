import { useRouter } from "next/router";
import React, { ComponentProps, memo, useMemo } from "react";
import { QueryParamProvider as ContextProvider } from "use-query-params";

type NextQueryParamProviderProps = Omit<
    ComponentProps<typeof ContextProvider>,
    "ReactRouterRoute" | "reachHistory" | "history" | "location"
>;

/*
 *
 * Query Params Issues in NextJS
 *
 * Many thanks to Lucas Constantino, Mikestop Continues, Baybara Pavel to doing
 * the brunt of the job to solving issues for next js
 *      => https://github.com/pbeshai/use-query-params/issues/13
 *
 */
export const NextQueryParamProviderComponent = ({ children, ...rest }: NextQueryParamProviderProps) => {
    const router = useRouter();
    const match = router.asPath.match(/[^?]+/);
    const pathname = match ? match[0] : router.asPath;

    const location = useMemo(() => {
        if (typeof window !== "undefined") {
            // For SSG, no query parameters are available on the server side,
            // since they can't be known at build time. Therefore to avoid
            // markup mismatches, we need a two-part render in this case that
            // patches the client with the updated query parameters lazily.
            // Note that for SSR `router.isReady` will be `true` immediately
            // and therefore there's no two-part render in this case.
            if (router.isReady) {
                return window.location;
            } else {
                return { search: "" } as Location;
            }
        } else {
            // On the server side we only need a subset of the available
            // properties of `Location`. The other ones are only necessary
            // for interactive features on the client.
            return { search: router.asPath.replace(/[^?]+/u, "") } as Location;
        }
    }, [router.asPath, router.isReady]);

    const history = useMemo(
        () => ({
            push: ({ search }: Location) =>
                router.push(
                    { pathname: router.pathname, query: router.query },
                    { search, pathname },
                    { shallow: true, scroll: false }
                ),
            replace: ({ search }: Location) => {
                router.replace(
                    { pathname: router.pathname, query: router.query },
                    { search, pathname },
                    { shallow: true, scroll: false }
                );
            },
            location,
        }),
        [location, pathname, router]
    );

    return (
        <ContextProvider {...rest} history={history} location={location}>
            {children}
        </ContextProvider>
    );
};

export const NextQueryParamProvider = memo(NextQueryParamProviderComponent);

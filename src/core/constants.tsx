export const apiUrl = process.env.NEXT_PUBLIC_API_URI!;

export const channelSlug = process.env.NEXT_PUBLIC_MZAWADIE_CHANNEL_SLUG!;

export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const exportMode = process.env.NEXT_PUBLIC_EXPORT === "true";

export const ssrMode = typeof window === "undefined";

export const incrementalStaticRegenerationRevalidate = parseInt(
    process.env.NEXT_PUBLIC_INCREMENTAL_STATIC_REGENERATION_REVALIDATE!,
    10
);

export const staticPathsFetchBatch = 10;

export const staticPathsFallback = (
    exportMode ? false : process.env.NEXT_PUBLIC_STATIC_PATHS_FALLBACK
) as boolean | "blocking";

export const apiUrl = process.env.NEXT_PUBLIC_API_URI!;

export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const ssrMode = typeof window === "undefined";

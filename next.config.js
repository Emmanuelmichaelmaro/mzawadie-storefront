/** @type {import('next').NextConfig} */
const path = require("path");
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withOptimizedImages = require("next-optimized-images");

// const withBaseConfig = require("./config/next/config.base");
// const withDevConfig = require("./config/next/config.dev");
// const withProdConfig = require("./config/next/config.prod");

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["demo.saleor.io"],
        // next/image support `srcSet` using the below deviceSizes
        // for more info, visit https://nextjs.org/docs/basic-features/image-optimization#device-sizes
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // https://nextjs.org/docs/basic-features/image-optimization#image-sizes
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // formats: ["image/avif", "image/webp"],
    },
};

module.exports = withPlugins(
    [
        withImages,
        [withOptimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }],
        // withBaseConfig,
        // [withDevConfig, {}, [PHASE_DEVELOPMENT_SERVER]],
        // [withProdConfig, {}, ["!" + PHASE_DEVELOPMENT_SERVER]],
    ],
    nextConfig
);

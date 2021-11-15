/** @type {import('next').NextConfig} */
const path = require("path");
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

const withBaseConfig = require("./config/next/config.base");
// const withDevConfig = require("./config/next/config.dev");
// const withProdConfig = require("./config/next/config.prod");

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "globalStyles/scss")],
    },
};

module.exports = withPlugins(
    [
        [withOptimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }],
        withBaseConfig,
        // [withDevConfig, {}, [PHASE_DEVELOPMENT_SERVER]],
        // [withProdConfig, {}, ["!" + PHASE_DEVELOPMENT_SERVER]],
    ],
    nextConfig
);

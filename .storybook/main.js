const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
    // "stories": [
    //   "../src/**/*.stories.mdx",
    //   "../src/**/*.stories.@(js|jsx|ts|tsx)"
    // ],
    stories: ["../src/next/**/stories.tsx"],
    addons: ["@storybook/addon-links", "storybook-addon-next-router", "@storybook/addon-essentials"],
    core: {
        builder: "webpack5",
    },
    typescript: { reactDocgen: false },

    webpackFinal: async (config, { configType }) => {
        (config.watch = true),
            (config.watchOptions = {
                ignored: "**/node_modules",
            }),
            config.module.rules.push({
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            configFile: "./babel.config.js",
                        },
                    },
                ],
            });

        config.module.rules.push({
            test: /\.(scss|css)$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: { sourceMap: true },
                },
                { loader: "sass-loader" },
            ],
        });

        // analyze webpack bundle size. To enable run storybook with `cross-env analyze=true`
        // not needed, but helps debug the problem :)
        const shouldAnalyze = process.env.analyze === "true";

        if (shouldAnalyze) {
            config.plugins.push(new BundleAnalyzerPlugin());
        }

        // split into more chunks
        config.optimization = {
            splitChunks: {
                chunks: "async",
                minSize: 30 * 1024, // 30KB
                maxSize: 64 * 1024, // 1MB
            },
        };

        config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx");
        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, "../tsconfig.json"),
            }),
        ];

        config.resolve.modules = [...(config.resolve.modules || []), path.resolve("./")];

        config.plugins.push(
            new ForkTsCheckerWebpackPlugin({
                typescript: true,
                eslint: {
                    files: "./src/**/*.{ts,tsx}",
                    exclude: "node_modules",
                },
            })
        );

        return config;
    },
};

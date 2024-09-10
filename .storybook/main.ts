import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    core: {
        disableTelemetry: true, // Disables telemetry (tracking / usage stats)
    },
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-controls",
        ({
            name: "@storybook/addon-styling-webpack",
            options: {
                rules: [{
                    test: /\.css$/,
                    sideEffects: true,
                    use: [
                        require.resolve("style-loader"),
                        {
                            loader: require.resolve("css-loader"),
                            options: {

                                importLoaders: 1,
                            },
                        }, {
                            loader: require.resolve("postcss-loader"),
                            options: {
                                implementation: require.resolve("postcss"),
                            },
                        },
                    ],
                },],
            }
        }),
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;

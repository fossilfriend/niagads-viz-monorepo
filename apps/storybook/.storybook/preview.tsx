import React from "react";
import type { Preview } from "@storybook/react";
import { HeroUIProvider } from "@heroui/system";

const decorators: Preview["decorators"] = [
    (Story) => {
        return (
            <HeroUIProvider>
                <Story />
            </HeroUIProvider>
        );
    }
];

const preview: Preview = {
    decorators: decorators,
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;

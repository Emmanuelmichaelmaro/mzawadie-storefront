import React from "react";

// Import the global style enabling tailwind classes
import "../src/globalStyles/globals.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => (
        <div style={{ margin: '3em' }}>
            {Story()}
        </div>
    ),
];

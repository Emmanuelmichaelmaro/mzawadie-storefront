const dotenv = require("dotenv");

const config = {
    ...dotenv.config().parsed,
    ...dotenv.config({ path: ".env.local" }).parsed,
};

module.exports = {
    client: {
        addTypename: true,
        excludes: ["**/__tests__/**/*"],
        includes: ["src/**/*.ts", "src/**/*.tsx"],
        name: "dashboard",
        service: {
            name: "mzawadie",
            localSchemaFile: "schema.graphql",
            // url: config.NEXT_PUBLIC_API_URI,
        },
    },
};

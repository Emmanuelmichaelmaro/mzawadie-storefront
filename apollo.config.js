module.exports = {
    client: {
        addTypename: true,
        excludes: ["**/__tests__/**/*"],
        includes: ["src/**/*.ts", "src/**/*.tsx"],
        name: "dashboard",
        service: {
            name: "mzawadie",
            localSchemaFile: "schema.graphql",
        },
    },
};

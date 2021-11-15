module.exports = {
    client: {
        addTypename: true,
        includes: ["src/**/*.ts", "src/**/*.tsx"],
        excludes: ["**/__tests__/**", "**/*.d.ts", "src/graphql/**", "**/sdk/**/*"],
        name: "dashboard",
        service: {
            localSchemaFile: ["schema.graphql", "src/graphql/autogenerate/local-schema.graphql"],
            name: "mzawadie",
        },
    },
};

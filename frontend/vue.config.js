module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
            @use "@/scss/main.scss" as *;
            `,
            },
        },
    },
}

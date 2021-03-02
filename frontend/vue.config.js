module.exports = {
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

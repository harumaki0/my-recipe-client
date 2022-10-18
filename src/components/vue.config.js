module.exports = {
    devServer: {
        proxy: {
            '^/api*': {
                target: 'http://localhost:3000',
                pathRewrite: { "^/api": "" },
                changeOrigin: true,
                logLevel: "debug",
            }
        }
    },

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    },

    transpileDependencies: [
      'vuetify'
    ]
}

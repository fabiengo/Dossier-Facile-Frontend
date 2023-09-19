const PrerendererWebpackPlugin = require("@prerenderer/webpack-plugin");
const path = require("path");

const routes = [
  "/",
  "/blog",
  "/blog/quelles-pieces-justificatives-fournir-pour-mon-dossier-de-location",
  "/information",
  "/accessibilite",
  "/mentions-legales",
  "/plan-du-site",
  "/404",
];

const getSitemapUrls = () => {
  return routes
    .filter((route) => route !== "/404")
    .map((route) => `https://dossierfacile.fr${route}`);
};

module.exports = {
  pluginOptions: {
    i18n: {
      locale: "fr",
      localeDir: "locales",
      enableInSFC: true,
    },
    sitemap: {
      urls: getSitemapUrls(),
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "DossierFacile";
      return args;
    });
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== "production") return;

    return {
      plugins: [
        new PrerendererWebpackPlugin({
          staticDir: path.resolve(__dirname, "dist"),
          routes: routes,
        }),
      ],
    };
  },
};

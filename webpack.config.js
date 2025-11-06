const path = require("path");
const { UserscriptPlugin } = require("webpack-userscript");
const pkg = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "wtr-lab-enhancer.user.js",
    publicPath: "http://localhost:8080/", // For dev server
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
    hot: true,
    liveReload: false, // Important: Let the proxy script handle reloads
  },
  plugins: [
    new UserscriptPlugin({
      headers: (vars) => ({
        name: "WTR-Lab Reader & UI Enhancer",
        namespace: "http://tampermonkey.net/",
        version: vars.isDev ? `${pkg.version}-build.[buildNo]` : pkg.version,
        description: pkg.description,
        author: pkg.author,
        license: pkg.license,
        match: "https://wtr-lab.com/en/novel/*/*/chapter-*",
        connect: ["gwfh.mranftl.com", "fonts.googleapis.com"],
        icon: "https://www.google.com/s2/favicons?sz=64&domain=wtr-lab.com",
        grant: [
          "GM_addStyle",
          "GM_getValue",
          "GM_setValue",
          "GM_registerMenuCommand",
          "GM_xmlhttpRequest",
        ],
      }),
      proxyScript: {
        baseUrl: "http://127.0.0.1:8080/",
        filename: "[basename].proxy.user.js",
        enable: true,
      },
    }),
  ],
};

const path = require("path");
const { UserscriptPlugin } = require("webpack-userscript");
const pkg = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist-greasyfork"),
    filename: "wtr-lab-enhancer-greasyfork.user.js",
    publicPath: "./",
  },
  mode: "development", // Ensure non-minified output for Greasy Fork
  devtool: "source-map", // Maintain source maps for debugging
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // Ensure all JavaScript is kept readable
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: {
                  chrome: "60", // Reasonable browser support
                },
                modules: false, // Keep ES modules for better readability
              }]
            ],
            comments: true, // Preserve comments in output
            compact: false, // Prevent minification
          }
        }
      }
    ],
  },
  optimization: {
    minimize: false, // CRITICAL: Disable minification for Greasy Fork
    splitChunks: false, // Keep everything in single file for simplicity
  },
  plugins: [
    new UserscriptPlugin({
      headers: (vars) => ({
        name: "WTR-Lab Reader & UI Enhancer",
        namespace: "http://tampermonkey.net/",
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        license: pkg.license,
        match: "https://wtr-lab.com/en/novel/*/*/chapter-*",
        connect: ["gwfh.mranftl.com", "fonts.googleapis.com"],
        icon: "https://www.google.com/s2/favicons?sz=64&domain=wtr-lab.com",
        // GreasyFork specific headers
        homepageURL: "https://github.com/MasuRii/wtr-lab-enhancer",
        supportURL: "https://github.com/MasuRii/wtr-lab-enhancer/issues",
        // Note: updateURL will be managed by GreasyFork automatically
        grant: [
          "GM_addStyle",
          "GM_getValue", 
          "GM_setValue",
          "GM_registerMenuCommand",
          "GM_xmlhttpRequest",
        ],
        // Add @license for copyright compliance
        license: pkg.license,
      }),
      // No proxy script needed for GreasyFork version
      proxyScript: {
        enable: false,
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".json"],
    // Ensure all modules are bundled (no externals for GreasyFork)
    alias: {},
  },
  // Performance hints for GreasyFork compliance
  performance: {
    hints: "warning",
    maxAssetSize: 1024 * 1024 * 2, // 2MB limit
    maxEntrypointSize: 1024 * 1024 * 2, // 2MB limit
  },
};
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@charts": path.resolve(__dirname, "/src/charts"),
      "@mui-wrappers": path.resolve(__dirname, "/src/mui-wrappers"),
      "@table": path.resolve(__dirname, "/src/table"),
      "@lib": path.resolve(__dirname, "/src/lib"),
      "@data": path.resolve(__dirname, "/data"),
      "@documentation": path.resolve(__dirname, "/documentation")
    },
  },

  /*  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ], */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              reportFiles: ["./**/*.{ts,tsx}"],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    open: true,
  },
};

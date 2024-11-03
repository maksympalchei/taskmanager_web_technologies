const { defineConfig } = require("cypress");
const webpack = require("webpack");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.js$|jsx/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-react"],
                },
              },
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              use: [
                {
                  loader: "file-loader",
                  options: {
                    name: "[path][name].[ext]",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

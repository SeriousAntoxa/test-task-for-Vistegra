const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const ENV = env.NODE_ENV || "dev";

  const config = {
    entry: {
      index: "./index"
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      library: "[name]",
    },

    watchOptions: {
      aggregateTimeout: 300,
    },

    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".json", ".ts", ".tsx", "..."],
    },

    resolveLoader: {
      modules: ["node_modules"],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    autoprefixer({
                      browsers: ["ie >= 8", "last 2 version"],
                    }),
                  ],
                  sourceMap: true,
                },
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
  };

  if (ENV === "dev") {
    config.watch = true;
    config.mode = "development";
    config.devtool = "source-map";
  }

  if (ENV === "prod") {
    config.mode = "production";
    config.optimization = {
      minimize: true,
    };
  }

  return config;
};

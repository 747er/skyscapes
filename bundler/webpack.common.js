const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    "wgl-banner": path.resolve(
      __dirname,
      "../src/sections/wgl-banner/wgl-banner.js"
    ),
    gallery: path.resolve(__dirname, "../src/sections/gallery/gallery.js"),
    'lightningThree': path.resolve(__dirname, "../src/sections/lightningThree/lightningThree.js"),
  },
  output: {
    path: path.resolve(__dirname, "../assets/"),
    filename: "[name].bundle.js",
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      // JS
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      // CSS
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset/inline'
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts/",
            },
          },
        ],
      },

      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader", "glslify-loader"],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['.js', '.json']
  },
};

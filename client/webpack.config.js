const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, "./src/index.html"),
  filename: "index.html"
});

module.exports = {
  // mode: "development",
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "bundle.js",
    publicPath: "/libs/"
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: "babel-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:7]"
              }
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: ["url-loader"]
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  // devtool: "eval-source-map"
};

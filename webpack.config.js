module.exports = {
  entry: {
    "entry": "./public/entry.js"
  },
  output: {
    filename: "./public/bundle.js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [[
            "env", {
              targets: {
                browsers: ["last 2 versions"]
              }
            }
          ]]
        }
      }
    ]
  }
};
const CracoLessPlugin = require('craco-less')
const path = require("path")
const addPath = dir => path.join(__dirname,dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          }
        }
      }
    }
  ],
  webpack:{
    alias:{
      "@":addPath("src")
    }
  },
  rules: [
    {
      test: /\.md$/,
      use: [
        {
          loader: "html-loader",
        },
        {
          loader: "remark-loader",
        },
      ],
    },
  ],
};
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      chunkFilename: isProduction
        ? 'js/[name].[contenthash].js'
        : 'js/[name].js',
      assetModuleFilename: 'images/[hash][ext][query]',
      clean: true,
    },

    mode: isProduction ? 'production' : 'development',

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        handlebars: 'handlebars/dist/handlebars.js',
      },
    },

    devServer: {
      port: 3000,
      static: {
        directory: path.join(__dirname, '.'),
      },
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
    },

    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
        },
      },
      runtimeChunk: 'single',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
            }
          : false,
      }),
    ],
  };
};

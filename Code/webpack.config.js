import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';
  const analyzeBundle = process.env.ANALYZE === 'true';

  return {
    entry: './src/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      assetModuleFilename: 'images/[hash][ext][query]',
      clean: true,
    },

    mode: isProduction ? 'production' : 'development',

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
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
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
      extensionAlias: {
        '.js': ['.ts', '.js'],
      },
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
      minimizer: isProduction
        ? [
            '...',
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                      'svgo',
                      {
                        plugins: [
                          {
                            name: 'preset-default',
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
            }),
          ]
        : [],
      usedExports: true,
      sideEffects: false,
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
        template: './src/index.html',
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'images',
            to: 'images',
          },
        ],
      }),
      ...(analyzeBundle
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: 'bundle-report.html',
              openAnalyzer: false,
            }),
          ]
        : []),
    ],
  };
};

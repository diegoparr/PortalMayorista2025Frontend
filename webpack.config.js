let path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('vue-social-sharing');

// Determinar si estamos en desarrollo o producción
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Logs para mostrar la configuración
if (isDevelopment) {
  console.log('🔧 Configurando Webpack para DESARROLLO');
  console.log(`📁 NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`🌐 Public Path: /dist/`);
} else if (isProduction) {
  console.log('🏭 Configurando Webpack para PRODUCCIÓN');
  console.log(`📁 NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`🌐 Public Path: /dist/`);
} else {
  console.log('⚠️  NODE_ENV no definido, usando configuración por defecto');
  console.log(`📁 NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    // Usar /dist/ tanto en desarrollo como en producción
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: "0.0.0.0",
    port: 1234,
    allowedHosts: [
      '.localhost',
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // Comentar UglifyJS temporalmente para evitar errores
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     drop_debugger: true,
    //     pure_funcs: ['console.log']
    //   },
    //   mangle: {
    //     except: ['$', 'jQuery', 'Vue']
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    
    // Agregar plugin para manejar módulos ES6
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true
    }),

    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: 'img' },
      { from: 'src/assets/css/modal-production-fix.css', to: 'modal-production-fix.css' },
      { from: 'src/assets/css/sidebar-responsive-fix.css', to: 'sidebar-responsive-fix.css' }
    ])
  ])
}

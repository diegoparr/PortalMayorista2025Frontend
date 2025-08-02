let path = require('path');
let webpack = require('webpack');

require('vue-social-sharing');

// Logs para mostrar la configuración
console.log('🔧 Configurando Webpack para DESARROLLO');
console.log(`📁 NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`📂 Directorio de salida: ${path.resolve(__dirname, './dist')}`);
console.log(`🌐 Public Path: /dist/`);
console.log(`🚀 Puerto: 1234`);
console.log(`📄 HTML de desarrollo: index.dev.html`);
console.log('✅ Configuración de desarrollo aplicada\n');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
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
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  devServer: {
    historyApiFallback: {
      index: '/index.dev.html'
    },
    noInfo: true,
    overlay: true,
    host: "0.0.0.0",
    port: 1234,
    allowedHosts: [
      '.localhost',
    ],
    contentBase: path.join(__dirname, '.'),
    publicPath: '/dist/'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}; 
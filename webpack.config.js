var debug = false;
// var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname,
	devtool: debug ? 'inline-sourcemap' : null,
	entry: {
		app: "./src/app/app.js"
	},
	output: {
		path: __dirname + '/public/',
		filename: "scripts/[name]-[hash].js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['ng-annotate', 'babel?presets[]=es2015']
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css!sass')
		}, {
			test: /\.html$/,
			loader: 'html'
		}]
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},
	plugins: debug ? [] : [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			sourceMap: false,
			compress: {
				warnings: false,
				booleans: false,
				unused: false
			}
		}),
		new ExtractTextPlugin("styles/[name].[hash].css"),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			chunksSortMode: 'dependency'
		})
	]
}
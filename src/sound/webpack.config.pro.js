const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		'Pixim.sound': path.resolve(__dirname, 'src/entry.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].min.js',
		chunkFilename: '[name].min.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['env', 'stage-0']
				}
			}
		]
	},
	optimization: {
		minimizer: [
			new uglify({
				uglifyOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		]
	}
};
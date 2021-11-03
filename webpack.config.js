const path = require('path');
const webpack = require('webpack');//для сервера
// Для работы с html файлами и шаблонами, также понадобится для работы с pug.
const HtmlWebpackPlugin = require('html-webpack-plugin');
//отдельный файл css
const miniCss = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	devServer: {
        historyApiFallback: true,        
		static: {
			directory: path.resolve(__dirname, './dist'),
			watch: true,
		  },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
	// plugins - плагины для кастомизации процесса сборки Webpack.
	plugins: [
		new HtmlWebpackPlugin({
		title: 'Webpack app',
		template: './src/index.pug'
		}),
		new miniCss({
			filename: './style.css',
		}),
		// применять изменения только при горячей перезагрузке
        new webpack.HotModuleReplacementPlugin(),
	],
	  // module - настройка для обработки дополнительных модулей проекта.
	module: {
		rules: [
			//PUG
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
				pretty: true
			},
			},
			//scss
			{
				test: /\.scss$/,
				use: [miniCss.loader, "css-loader", "sass-loader"],
			},
			// image
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
						// Четко указать пути до файлов иначе из pug картинки не будут подключаться.
						name: './[name].[ext]'
						},
					},
				],
			},
			// svg
			{
				test: /\.svg$/,
				use: "file-loader",
			},
		]
	}
};
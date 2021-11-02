const path = require('path');

// Для работы с html файлами и шаблонами, также понадобится для работы с pug.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
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
				use: ["style-loader", "css-loader", "sass-loader"],
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
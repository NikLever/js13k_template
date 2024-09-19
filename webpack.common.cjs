const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	plugins: [
	new HtmlWebpackPlugin({ template: "src/index.html", inject: "body", scriptLoading: "module" }),
    new CleanWebpackPlugin(),
	],
	resolve: { extensions: [".ts", ".js"] },
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|wav)$/i,
				type: "asset/inline",
			},
			{
				test: /\.(mp3)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.glsl$/i,
				use: "raw-loader"
			}
		]
	}
};

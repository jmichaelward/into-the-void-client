var path           = require( "path" );
var UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );
var webpack = require("webpack");
var env = require('dotenv').config();

module.exports = ( env, arg ) => {
	config = {
		entry: [ "./src/js/index.js" ],
		output: {
			filename: "bundle.min.js",
			path: path.resolve( __dirname, "dist/js" ),
		},
		devServer: {
			port: 3000,
			https: true,
			compress: true,
			contentBase: path.join( __dirname, "dist" ),
			writeToDisk: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [ "@babel/preset-env" ]
						}
					}
				}
			]
		},
		optimization: {
			minimizer: [ new UglifyJSPlugin() ]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV),
					WP_URL: JSON.stringify(process.env.WP_URL)
				}
			})
		]
	};
	if ( arg.mode === "development" ) {
		config.devtool = "source-map";
	}
	return config;
};

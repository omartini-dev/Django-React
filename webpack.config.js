module.exports = {
	module: {
		rules: [{
			test:/\.(js)$/,
			exclude:/node_modules/,
			use: {
				loader:"babel-loader"
			}
		},{
			test:/\.css$/,
			use: ['style-loader','css-loader']
		},{
			test: /\.(ttf|eot|svg|otf|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader'
            }]
		}]
	}
}
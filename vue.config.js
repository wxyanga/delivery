const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
function resolve(dir) {
	return path.join(__dirname, dir)
}
const Timestamp = new Date().getTime();
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
	configureWebpack: { // webpack 配置
		output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
			filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
			chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
		},
	},
	// baseUrl: './',
	publicPath: isProduction ? '/static/kbao/' : '/',
	//配置目录别名
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src')) // default
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components')) //所有组件
			.set('views', resolve('src/views'))
			.set('mock', resolve('src/mock'))
			.set('static', resolve('src/static'))
	}
}

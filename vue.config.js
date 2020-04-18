const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
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

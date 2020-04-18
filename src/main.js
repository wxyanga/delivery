import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from 'axios'
import API from './axios/api'

import { Message, Notification, Loading } from 'element-ui'
axios.defaults.withCredentials = true

Vue.config.productionTip = false

function log(tip, ...msg) {
	if (process.env.NODE_ENV == 'development') {
		msg.forEach(item => {
			if (!tip) tip = `--${Object.prototype.toString.call(item)}--`
			console.info(tip, item)
		})
	}
}
Vue.prototype.$log = log
log(0, axios.defaults)

//全局消息提示
Vue.prototype.$message = Message
//全局通知
Vue.prototype.$notify = Notification
//加载中
Vue.prototype.$loading = Loading
//请求地址
Vue.prototype.$API = API
Vue.prototype.$bus = new Vue()

// 响应拦截器
axios.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == '99') {
			sessionStorage.removeItem('accessToken')
			sessionStorage.removeItem('loginState')
			sessionStorage.removeItem('INFO')
			store.commit('isLogin', false)
			router.push({
				path: '/'
			})
		}
		return Promise.resolve(response)
	} else {
		return Promise.reject(response)
	}
})

//设置全局数据请求为axios
Vue.prototype.$http = axios
//通用post请求函数
Vue.prototype.$post = (url, param, successMessage = '操作成功', isShowLoading = true) => {
	return new Promise((resolve, reject) => {
		let params = {
			//   accessToken: sessionStorage.getItem('accessToken'),
			...param
		}
		let loading = null
		if (isShowLoading) {
			loading = Loading.service({
				lock: true,
				text: '加载中',
				spinner: 'el-icon-loading',
				background: 'rgba(3, 14, 40, 0.6)',
				customClass: 'custom-loading'
			})
		}
		log('--post params--', url, params)
		axios
			.post(url, params)
			.then(res => {
				if (res.data.code == '00') {
					resolve(res.data.data)
					if (successMessage != '') {
						Message({ type: 'success', message: successMessage })
					}
					log('--post success--', res.data)
				} else {
					Message({ type: 'error', message: res.data.message })
					reject(res)
					log('--post error--', res)
				}
				if (loading) {
					loading.close()
				}
			})
			.catch(error => {
				Message({ type: 'error', message: '系统异常' })
				if (loading) {
					loading.close()
				}
				reject(error)
				log('--post catch--', error)
			})
	})
}
//导出execl 功能封装
Vue.prototype.$downExecl = function(resultData, setFileName) {
	let blob = new Blob([resultData], { type: 'application/vnd.ms-execl' })
	//let url=window.URL.createObjectURL(blob)
	//window.location.href=url
	let fileName = setFileName + '.xls'
	if (isIE()) {
		window.navigator.msSaveOrOpenBlob(blob, fileName)
	} else {
		let elink = document.createElement('a')
		elink.download = fileName
		elink.style.display = 'none'
		elink.href = URL.createObjectURL(blob)
		document.body.appendChild(elink)
		elink.click()
		URL.revokeObjectURL(elink.href)
		document.body.removeChild(elink)
	}
	function isIE() {
		if (!!window.ActiveXObject || 'ActiveXObject' in window) {
			return true
		} else {
			return false
		}
	}
}
//登录路由验证
router.beforeEach((to, from, next) => {
	let token = sessionStorage.getItem('loginState')
	console.log('to.path:', to.path)

	if (!token) {
		if (to.path == '/' || to.path == '/login') {
			//要想结束路由守卫，整段代码的逻辑必须以next();进行结尾，否则会陷入死循环
			next()
		} else {
			next('/')
		}
	} else {
		next()
	}
	// if (token) next()
	// else next('/')
	sessionStorage.setItem('toPath', to.path)
})

Vue.prototype.$showDialog = function(options) {
	this.$store.commit('setDialogOptions', options)
	this.$store.commit('showDialog')
}
Vue.prototype.$hideDialog = function() {
	this.$store.commit('hideDialog')
}
let filters = {
	money: value => {
		return Number(value).toFixed(2)
	}
}
new Vue({
	router,
	store,
	filters,
	render: h => h(App)
}).$mount('#app')

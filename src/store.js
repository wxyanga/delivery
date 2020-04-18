import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dialogOptions: {
			isDialogShow: false,
			slotName: '',
			title: ''
		},
		isLogin: sessionStorage.getItem('loginState'),
		INFO: sessionStorage.getItem('INFO')
	},
	mutations: {
		showDialog(state) {
			state.dialogOptions.isDialogShow = true
		},
		hideDialog(state) {
			state.dialogOptions.isDialogShow = false
		},
		setDialogOptions(state, options) {
			state.dialogOptions.title = options.title
			state.dialogOptions.slotName = options.slotName
		},
		isLogin(state, loginState) {
			state.isLogin = loginState
		}
	},
	actions: {}
})

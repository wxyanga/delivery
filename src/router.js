import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			// component: () => import('views/index.vue')
			component: () => import('views/LoginPage.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('views/LoginPage.vue')
		},
		{
			path: '/home',
			name: 'home',
			component: () => import('views/Home.vue'),
			children: [
				{ path: 'userExpressOrder', name: 'userExpressOrder', component: () => import('components/userExpressOrder.vue') },
				{ path: 'userRechargeDetail', name: 'userRechargeDetail', component: () => import('components/userRechargeDetail.vue') },
				{ path: 'userRecharge', name: 'userRecharge', component: () => import('components/userRecharge.vue') },
				{ path: 'userExpressSearch', name: 'userExpressSearch', component: () => import('components/userExpressSearch.vue') },
				{ path: 'userInfo', name: 'userInfo', component: () => import('components/userInfo.vue') },
				{ path: 'userRechargePay', name: 'userRechargePay', component: () => import('components/userRechargePay.vue') },

				{ path: 'financeCheck', name: 'financeCheck', component: () => import('components/financeCheck.vue') },
				{ path: 'financeCheckHistory', name: 'financeCheckHistory', component: () => import('components/financeCheckHistory.vue') },
				{ path: 'financeDetailHistory', name: 'financeDetailHistory', component: () => import('components/financeDetailHistory.vue') },

				{ path: 'deliverGoods', name: 'deliverGoods', component: () => import('components/deliverGoods.vue') },
				{ path: 'deliverGoodsDetail', name: 'deliverGoodsDetail', component: () => import('components/deliverGoodsDetail.vue') },
				{ path: 'deliverGoodsBatchResend', name: 'deliverGoodsBatchResend', component: () => import('components/deliverGoodsBatchResend.vue') },

				{ path: 'systomMoney', name: 'systomMoney', component: () => import('components/systomMoney.vue') },
				{ path: 'systomExpressComp', name: 'systomExpressComp', component: () => import('components/systomExpressComp.vue') },
				{ path: 'systomExpressOrder', name: 'systomExpressOrder', component: () => import('components/systomExpressOrder.vue') },
				{ path: 'systomVIP', name: 'systomVIP', component: () => import('components/systomVIP.vue') },
				{ path: 'systomQQ', name: 'systomQQ', component: () => import('components/systomQQ.vue') },
				{ path: 'systemAddressSet', name: 'systemAddressSet', component: () => import('components/systemAddressSet.vue') },
				{ path: 'systomStatistics', name: 'systomStatistics', component: () => import('components/systomStatistics.vue') },
				{ path: 'systomVIPDetail', name: 'systomVIPDetail', component: () => import('components/systomVIPDetail.vue') },
				{ path: 'systemPublic', name: 'systemPublic', component: () => import('components/systemPublic.vue') },

				{ path: '*', component: () => import('components/blank.vue') }
			]
			// redirect: '/home/blank',
			// children: [
			// 	{ path: 'blank', name: 'blank', component: () => import('components/blank.vue') },
			// 	{ path: 'test', name: 'test', component: () => import('components/HelloWorld.vue') }
			// ]
		}
		// {
		// 	path: '/home',
		// 	name: 'home',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ 'views/Home.vue')
		// }
	]
})

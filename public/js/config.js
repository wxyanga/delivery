var isProduction = '/static/kbao/'
// isProduction = '/'
var showCollection = {
	dialog: true,
	url: 'http://www.taopingan.com',
	netName: '招财猫实物快递网',
	content: '大家收藏下我们快递的新网址，以后大家都用新网址。',
	times: 1
}
var getBaseUrl = 'http://8.129.22.111:80'
// 系统菜单 分管理员与用户
// var menuAll = [
// 	{
// 		index: 'system',
// 		icon: 'el-icon-message',
// 		name: '系统管理',
// 		children: [
// 			{
// 				index: 'systomVIP',
// 				icon: 'el-icon-message',
// 				name: '会员管理'
// 			},
// 			{
// 				index: 'systomExpressOrder',
// 				icon: 'el-icon-message',
// 				name: '快递单号管理'
// 			}
// 		]
// 	},
// 	{
// 		index: 'finance',
// 		icon: 'el-icon-message',
// 		name: '财务管理',
// 		children: [
// 			{
// 				index: 'deliverGoods',
// 				icon: 'el-icon-message',
// 				name: '面单发货'
// 			},
// 			{
// 				index: 'financeCheck',
// 				icon: 'el-icon-message',
// 				name: '充值审核'
// 			}
// 		]
// 	},
// 	{
// 		index: 'home',
// 		icon: 'el-icon-message',
// 		name: '账户管理',
// 		children: [
// 			{
// 				index: 'userInfo',
// 				icon: 'el-icon-message',
// 				name: '账户信息'
// 			}
// 		]
// 	},
// 	{
// 		index: 'express',
// 		icon: 'el-icon-message',
// 		name: '快递单号',
// 		children: [
// 			{
// 				index: 'userExpressOrder',
// 				icon: 'el-icon-message',
// 				name: '购买单号'
// 			},
// 			{
// 				index: 'userExpressSearch',
// 				icon: 'el-icon-message',
// 				name: '单号查询'
// 			}
// 		]
// 	},
// 	{
// 		index: 'charge',
// 		icon: 'el-icon-message',
// 		name: '资金管理',
// 		children: [
// 			{
// 				index: 'userRecharge',
// 				icon: 'el-icon-message',
// 				name: '充值'
// 			},
// 			{
// 				index: 'userRechargeDetail',
// 				icon: 'el-icon-message',
// 				name: '资金明细'
// 			}
// 		]
// 	},
// 	{
// 		index: 'info',
// 		icon: 'el-icon-message',
// 		name: '账户管理',
// 		children: [
// 			{
// 				index: 'userInfo',
// 				icon: 'el-icon-message',
// 				name: '账户信息'
// 			}
// 		]
// 	}
// ]
var menu = {
	admin: [
		{
			index: 'finance',
			icon: 'el-icon-service',
			name: '财务管理',
			children: [
				{
					index: 'deliverGoods',
					icon: 'el-icon-message',
					name: '面单发货'
				},
				{
					index: 'financeCheck',
					icon: 'el-icon-message',
					name: '充值审核'
				},
				{
					index: 'deliverGoodsBatchResend',
					icon: 'el-icon-message',
					name: '补打单号'
				}
			]
		},

		{
			index: 'Statistics',
			icon: 'el-icon-info',
			name: '统计信息',
			children: [
				{
					index: 'systomStatistics',
					icon: 'el-icon-message',
					name: '平台统计'
				},
				{
					index: 'systomVIPDetail',
					icon: 'el-icon-message',
					name: '商户统计'
				}
			]
		},
		{
			index: 'system',
			icon: 'el-icon-setting',
			name: '系统管理',
			children: [
				{
					index: 'systemPublic',
					icon: 'el-icon-message',
					name: '公告管理'
				},
				{
					index: 'systomVIP',
					icon: 'el-icon-message',
					name: '会员管理'
				},

				{
					index: 'systomExpressOrder',
					icon: 'el-icon-message',
					name: '快递单号管理'
				},
				{
					index: 'systemAddressSet',
					icon: 'el-icon-message',
					name: '发货信息设置'
				},
				{
					index: 'systomQQ',
					icon: 'el-icon-message',
					name: '客服QQ管理'
				}
			]
		},
		{
			index: 'home',
			icon: 'el-icon-tickets',
			name: '账户管理',
			children: [
				{
					index: 'userInfo',
					icon: 'el-icon-message',
					name: '账户信息'
				}
			]
		}
	],
	custom: [
		{
			index: 'express',
			icon: 'el-icon-printer',
			name: '快递单号',
			children: [
				{
					index: 'userExpressOrder',
					icon: 'el-icon-goods',
					name: '购买单号'
				},
				{
					index: 'userExpressSearch',
					icon: 'el-icon-zoom-in',
					name: '已买单号查询'
				}
			]
		},
		{
			index: 'charge',
			icon: 'el-icon-info',
			name: '资金管理',
			children: [
				{
					index: 'userRecharge',
					icon: 'el-icon-message',
					name: '充值'
				},
				{
					index: 'userRechargeDetail',
					icon: 'el-icon-zoom-in',
					name: '资金明细'
				}
			]
		},
		{
			index: 'info',
			icon: 'el-icon-document',
			name: '账户管理',
			children: [
				{
					index: 'userInfo',
					icon: 'el-icon-message',
					name: '账户信息'
				}
			]
		}
	]
}
// 资金类型
var moneyType = [
	{ value: '', label: '全部' },
	{ value: 'bal', label: '充值' },
	{ value: 'vip', label: '升级会员' },
	{ value: 'order', label: '购买单号' }
]
// 充值升级按钮
var RechargeType = [
	// { money: '100', value: 'be_vip', label: '升级为VIP会员' },
	// { money: '200', value: 'be_proxy', label: '升级为代理会员' },
	{ money: '100', value: 'bal', label: '充值' }
]
// 用户等级
var userLv = [
	{ value: 'normal', label: '普通会员' },
	{ value: 'vip', label: 'VIP会员' },
	{ value: 'proxy', label: '代理会员' }
]
var lvMap = {
	lv1: '普通会员',
	lv2: 'VIP会员',
	lv3: '代理'
}
var lvMaps = {
	cost: '底价',
	lv1: '会员'
}

// 充值金额
var buyExpress = [
	{ money: '50' },
	{ money: '100' },
	{ money: '300' },
	{ money: '600' },
	{ money: '1000' },
	{ money: '2000' },
	{ money: '3000' },
	{ money: '5000' },
	{ money: '10000' },
	{ money: '20000' },
	{ money: '50000' },
	{ money: '100000' }
]
// 升级金额金额
var LvUPExpress = [
	{ money: '100', label: 'VIP会员' },
	{ money: '200', label: '代理会员' }
]
// 快递类型
var separateExpByType = [
	// config
	{ label: '所有快递', map: 'all' },
	{ label: '淘宝专用', map: 'taobao' },
	{ label: '天猫专用', map: 'tmall' },
	{ label: '阿里专用', map: 'ali' },
	{ label: '京东专用', map: 'jd' },
	{ label: '拼多多专用', map: 'pdd' },
	{ label: '拼多多电子', map: 'pd' }
]
var expressStatus = [
	{ value: '', label: '全部' },
	{ value: 'fail', label: '已提交' },
	{ value: 'pending', label: '未发货' },
	{ value: 'done', label: '已发货' }
]
var FinanceStatus = [
	{ value: 'pending', label: '待审核' },
	{ value: 'done', label: '已到账' },
	{ value: 'reject', label: '已拒绝' }
]
var checkMoney = [
	{ value: '', label: '全部' },
	{ value: '0', label: '待审核' },
	{ value: '1', label: '审核通过' },
	{ value: '2', label: '审核拒绝' }
]
// 购买单号 教程
var userRechargeTips = [
	{
		label: '淘宝易通打印批量发货教程（点击查看）',
		url: 'http://www.baidu.com',
		style: 'color: green;margin-right:30px'
	},
	{
		label: '淘宝易通打印批量发货教程（点击查看）',
		url: 'http://www.baidu.com',
		style: 'color: green;margin-right:30px'
	},
	{
		label: '淘宝易通打印批量发货教程（点击查看）',
		url: 'http://www.baidu.com',
		style: 'color: green;margin-right:30px'
	},
	{
		label: '淘宝易通打印批量发货教程（点击查看）',
		url: '',
		style: 'color: green;margin-right:30px'
	}
]
var systomMsg = {
	label: '严禁利用公司支付宝涉及于本网站无关业务，如：赌博、色情、诈骗、等行为！', //60
	url: '',
	style: 'color: green'
}

// 获取QQ客服
var getQQ = [
	{
		service: '在线客服',
		qq: '50627709',
		open: true,
		phone: ''
	},
	{
		service: '在线客服',
		qq: '50627709',
		open: true,
		phone: ''
	},
	{
		service: '在线客服',
		qq: '50627709',
		open: true,
		phone: ''
	},
	{
		service: '在线客服',
		qq: '50627709',
		open: true,
		phone: ''
	},
	{
		service: '',
		qq: '',
		open: true,
		phone: '客服QQ：50627709'
	}
]
// 系统配置
var systomConfig = {
	name: '招财猫实物快递网',
	label: '欢迎使用招财猫实物快递网。',
	url: '',
	style: 'color: green'
}

// 首页配置
var MainIndex = {
	boxClass: 'indexTopBox',
	innerImage: isProduction + 'img/title.png',
	menuClass: 'indexMenu',
	bannerClass: 'indexBanner',
	banner: [
		{
			url: isProduction + 'img/banner (1).jpg',
			title: '点击跳转百度',
			link: 'http://www.baidu.com'
		},
		{
			url: isProduction + 'img/banner (2).jpg',
			title: 'img/banner (1).jpg',
			link: ''
		},
		{
			url: isProduction + 'img/banner (3).jpg',
			title: 'img/banner (1).jpg',
			link: ''
		},
		{
			url: isProduction + 'img/banner (4).jpg',
			title: 'img/banner (1).jpg',
			link: ''
		}
	]
}

// 充值二维码
var QRCode = isProduction + 'img/money1.png'
var QRCode1 = isProduction + 'img/4numbers.png'
var openQQ = false

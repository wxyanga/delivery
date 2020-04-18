export default {
	// 菜单
	menuAll: [
		{
			index: 'system',
			icon: 'el-icon-message',
			name: '系统管理',
			children: [
				{
					index: 'systomMoney',
					icon: 'el-icon-message',
					name: '充值金额'
				},
				{
					index: 'systomExpressComp',
					icon: 'el-icon-message',
					name: '快递公司管理'
				},
				{
					index: 'systomExpressOrder',
					icon: 'el-icon-message',
					name: '快递单号管理'
				},
				{
					index: 'systomVIP',
					icon: 'el-icon-message',
					name: '会员管理'
				},
				{
					index: 'systomQQ',
					icon: 'el-icon-message',
					name: 'QQ客服管理'
				},
				{
					index: 'systemOther',
					icon: 'el-icon-message',
					name: '其他设置'
				}
			]
		},
		{
			index: 'deliver',
			icon: 'el-icon-message',
			name: '发货管理',
			children: [
				{
					index: 'deliverGoods',
					icon: 'el-icon-message',
					name: '发货'
				},
				{
					index: 'deliverGoodsDetail',
					icon: 'el-icon-message',
					name: '发货记录'
				}
			]
		},
		{
			index: 'finance',
			icon: 'el-icon-message',
			name: '财务管理',
			children: [
				{
					index: 'financeCheck',
					icon: 'el-icon-message',
					name: '待审核'
				},
				{
					index: 'financeCheckHistory',
					icon: 'el-icon-message',
					name: '充值记录'
				},
				{
					index: 'financeDetailHistory',
					icon: 'el-icon-message',
					name: '消费记录'
				}
			]
		},
		{
			index: 'express',
			icon: 'el-icon-message',
			name: '快递单号',
			children: [
				{
					index: 'userExpressOrder',
					icon: 'el-icon-message',
					name: '购买单号'
				},
				{
					index: 'userExpressSearch',
					icon: 'el-icon-message',
					name: '单号查询'
				}
			]
		},
		{
			index: 'home',
			icon: 'el-icon-message',
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
	menu: {
		normal: [
			{
				index: 'system',
				icon: 'el-icon-message',
				name: '系统管理',
				children: [
					{
						index: 'systomMoney',
						icon: 'el-icon-message',
						name: '充值金额'
					},
					{
						index: 'systomExpressComp',
						icon: 'el-icon-message',
						name: '快递公司管理'
					},
					{
						index: 'systomExpressOrder',
						icon: 'el-icon-message',
						name: '快递单号管理'
					},
					{
						index: 'systomVIP',
						icon: 'el-icon-message',
						name: '会员管理'
					},
					{
						index: 'systomQQ',
						icon: 'el-icon-message',
						name: 'QQ客服管理'
					},
					{
						index: 'systemOther',
						icon: 'el-icon-message',
						name: '其他设置'
					}
				]
			},
			{
				index: 'deliver',
				icon: 'el-icon-message',
				name: '发货管理',
				children: [
					{
						index: 'deliverGoods',
						icon: 'el-icon-message',
						name: '发货'
					},
					{
						index: 'deliverGoodsDetail',
						icon: 'el-icon-message',
						name: '发货记录'
					}
				]
			},
			{
				index: 'finance',
				icon: 'el-icon-message',
				name: '财务管理',
				children: [
					{
						index: 'financeCheck',
						icon: 'el-icon-message',
						name: '待审核'
					},
					{
						index: 'financeCheckHistory',
						icon: 'el-icon-message',
						name: '充值记录'
					},
					{
						index: 'financeDetailHistory',
						icon: 'el-icon-message',
						name: '消费记录'
					}
				]
			}
		],
		vip: [
			{
				index: 'express',
				icon: 'el-icon-message',
				name: '快递单号',
				children: [
					{
						index: 'userExpressOrder',
						icon: 'el-icon-message',
						name: '购买单号'
					},
					{
						index: 'userExpressSearch',
						icon: 'el-icon-message',
						name: '单号查询'
					}
				]
			},
			{
				index: 'home',
				icon: 'el-icon-message',
				name: '资金管理',
				children: [
					{
						index: 'userRecharge',
						icon: 'el-icon-message',
						name: '充值'
					},
					{
						index: 'userRechargeDetail',
						icon: 'el-icon-message',
						name: '资金明细'
					}
				]
			}
		],
		proxy: [
			{
				index: 'express',
				icon: 'el-icon-message',
				name: '快递单号',
				children: [
					{
						index: 'userExpressOrder',
						icon: 'el-icon-message',
						name: '购买单号'
					},
					{
						index: 'userExpressSearch',
						icon: 'el-icon-message',
						name: '单号查询'
					}
				]
			},
			{
				index: 'home',
				icon: 'el-icon-message',
				name: '资金管理',
				children: [
					{
						index: 'userRecharge',
						icon: 'el-icon-message',
						name: '充值'
					},
					{
						index: 'userRechargeDetail',
						icon: 'el-icon-message',
						name: '资金明细'
					}
				]
			}
		]
	},
	// 充值金额
	buyExpress: [
		{ update: '2018-02-02', money: '100', img: 'money.png' },
		{ update: '2018-02-02', money: '200', img: 'money.png' },
		{ update: '2018-02-02', money: '300', img: 'money.png' },
		{ update: '2018-02-02', money: '400', img: 'money.png' },
		{ update: '2018-02-02', money: '500', img: 'money.png' },
		{ update: '2018-02-02', money: '600', img: 'money.png' },
		{ update: '2018-02-02', money: '700', img: 'money.png' },
		{ update: '2018-02-02', money: '800', img: 'money.png' },
		{ update: '2018-02-02', money: '900', img: 'money.png' },
		{ update: '2018-02-02', money: '1000', img: 'money.png' },
		{ update: '2018-02-02', money: '1100', img: 'money.png' },
		{ update: '2018-02-02', money: '1200', img: 'money.png' },
		{ update: '2018-02-02', money: '1300', img: 'money.png' },
		{ update: '2018-02-02', money: '1400', img: 'money.png' }
	],
	// 资金明细
	userRechargeMoney: [
		{
			id: '1',
			type: 'userRecharge',
			money: '1000',
			create: '2020-02-02'
		},
		{
			id: '1',
			type: 'use',
			money: '1000',
			create: '2020-02-02'
		}
	],
	// 发货地址
	sendAddress: [
		{
			id: '123',
			name: '啊啊啊啊',
			phone: '123495960',
			address: '2463了快结束了覅',
			default: 0
		},
		{
			id: '124',
			name: '啊啊啊啊',
			phone: '123495960',
			address: '2463了快结束了覅',
			default: 0
		},
		{
			id: '125',
			name: '噢噢噢噢',
			phone: '15160630346',
			address: '5483210手动阀结束了覅',
			default: 1
		},
		{
			id: '126',
			name: '噢噢噢噢',
			phone: '123495780',
			address: '2463了是的粉色分',
			default: 0
		}
	],
	// 购买单号 教程
	userRechargeTips: [
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: 'www.baidu.com',
			color: 'red'
		},
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: 'www.baidu.com',
			color: 'red'
		},
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: 'www.baidu.com',
			color: 'red'
		},
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: '',
			color: 'green'
		}
	],
	// 快递类型
	ExpTypes: {
		mylv: 'lv1',
		lvMap: {
			lv1: '普通会员',
			lv2: 'VIP会员',
			lv3: '代理'
		},
		list: [
			{ id: '1231', surplus: 100, default: 0, type: 'ttkd', label: '1（淘宝专用）', map: 'taobao', lv1: '2.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1232', surplus: 100, default: 0, type: 'tmkd', label: '2（天猫专用）', map: 'tmall', lv1: '3.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1233', surplus: 0, default: 0, type: 'tsdf', label: '3（阿里专用）', map: 'ali', lv1: '4.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1234', surplus: 100, default: 0, type: 'wgeg', label: '4（京东专用）', map: 'jd', lv1: '5.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1235', surplus: 100, default: 0, type: 'rege', label: '5（拼多多专用）', map: 'pdd', lv1: '6.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1236', surplus: 100, default: 0, type: '4yh4', label: '6（拼多多电子）', map: 'pd', lv1: '7.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1237', surplus: 0, default: 0, type: 'jryt', label: '7（淘宝专用）', map: 'taobao', lv1: '8.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1238', surplus: 100, default: 0, type: '3y5f', label: '8（天猫专用）', map: 'tmall', lv1: '9.75', lv2: '2.25', lv3: '1.75' },
			{ id: '1239', surplus: 100, default: 0, type: 'wljw', label: '9（阿里专用）', map: 'ali', lv1: '12.75', lv2: '2.25', lv3: '1.75' },
			{ id: '12310', surplus: 100, default: 0, type: 'lruj', label: '10（京东专用）', map: 'jd', lv1: '22.75', lv2: '2.25', lv3: '1.75' },
			{ id: '12311', surplus: 0, default: 0, type: 'ojnb', label: '11（拼多多专用）', map: 'pdd', lv1: '32.75', lv2: '2.25', lv3: '1.75' },
			{ id: '12312', surplus: 100, default: 0, type: 'unns', label: '12（拼多多电子）', map: 'pd', lv1: '42.75', lv2: '2.25', lv3: '1.75' },
			{ id: '12313', surplus: 100, default: 1, type: '23d3', label: '13（淘宝专用）', map: 'taobao', lv1: '52.75', lv2: '2.25', lv3: '1.75' }
		],
		separateExpByType: [
			{ label: '所有快递', map: 'all' },
			{ label: '淘宝专用', map: 'taobao' },
			{ label: '天猫专用', map: 'tmall' },
			{ label: '阿里专用', map: 'ali' },
			{ label: '京东专用', map: 'jd' },
			{ label: '拼多多专用', map: 'pdd' },
			{ label: '拼多多电子', map: 'pd' }
		]
	},
	// 单号查询
	ExpressDetail: [
		{
			id: '1',
			user: '22222',
			status: '0',
			expressNum: '1223524534',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '',
			useComp: '12313',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		},
		{
			id: '1',
			status: '1',
			expressNum: '1223524534',
			user: '22222',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '2020-02-02',
			useComp: '12313',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		},
		{
			id: '1',
			status: '0',
			expressNum: '1223524534',
			user: '22222',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '',
			useComp: '12313',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		},
		{
			id: '1',
			status: '1',
			expressNum: '1223524534',
			user: '22222',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '2020-02-02',
			useComp: '12313',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		},
		{
			id: '1',
			status: '2',
			expressNum: '1223524534',
			user: '22222',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '',
			useComp: '12313',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		},
		{
			id: '1',
			status: '2',
			expressNum: '1223524534',
			user: '22222',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '2020-02-02',
			useComp: '12313',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		}
	],
	// 未发货分页查询
	deliverGoods: [
		{
			id: '1',
			status: '0',
			expressNum: '1223524534',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		},
		{
			id: '1',
			status: '0',
			expressNum: '1223524534',
			useMoney: '2.5',
			create: '2020-02-02',
			update: '',
			sendmsg: '发货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非',
			getmsg: '收货信息,啊啊啊啊,1354635764354,历史课回复俩儿未回复拉回来收到货发类似而非'
		}
	],
	// VIP查询
	VIP: [
		{
			id: '1',
			lv: 'lv2',
			create: '2020-02-02',
			qq: '3333333',
			email: 'xxxxxxxxx'
		},
		{
			id: '1',
			lv: 'lv2',
			create: '2020-02-02',
			qq: '3333333',
			email: 'xxxxxxxxx'
		},
		{
			id: '1',
			lv: 'lv2',
			create: '2020-02-02',
			qq: '3333333',
			email: 'xxxxxxxxx'
		},
		{
			id: '1',
			lv: 'lv2',
			create: '2020-02-02',
			qq: '3333333',
			email: 'xxxxxxxxx'
		},
		{
			id: '1',
			lv: 'lv2',
			create: '2020-02-02',
			qq: '3333333',
			email: 'xxxxxxxxx'
		},
		{
			id: '1',
			lv: 'lv2',
			create: '2020-02-02',
			qq: '3333333',
			email: 'xxxxxxxxx'
		}
	],
	// 获取QQ客服
	getQQ: [
		{
			service: '',
			qq: '',
			open: true,
			phone: ''
		},
		{
			service: '',
			qq: '262022952',
			open: true,
			phone: ''
		},
		{
			service: '',
			qq: '262022952',
			open: true,
			phone: ''
		},
		{
			service: '',
			qq: '',
			open: true,
			phone: ''
		},
		{
			service: '',
			qq: '',
			open: true,
			phone: '18150401975'
		}
	],
	// 充值记录查询
	RechargeDetail: [
		{
			id: '1',
			type: 'userRecharge',
			user: '22222',
			userMoney: '200',
			orderNum: '12344555666',
			status: '1',
			msg: '23255324',
			checkMoney: '100',
			create: '2020-02-02',
			check: '2020-02-02'
		},
		{
			id: '1',
			type: 'use',
			user: '22222',
			userMoney: '200',
			orderNum: '12344555666',
			status: '0',
			msg: '23255324',
			checkMoney: '100',
			create: '2020-02-02',
			check: '2020-02-02'
		},
		{
			id: '1',
			type: 'use',
			user: '22222',
			userMoney: '200',
			orderNum: '12344555666',
			status: '0',
			msg: '23255324',
			checkMoney: '100',
			create: '2020-02-02',
			check: '2020-02-02'
		},
		{
			id: '1',
			type: 'use',
			user: '22222',
			userMoney: '200',
			orderNum: '12344555666',
			status: '0',
			msg: '23255324',
			checkMoney: '100',
			create: '2020-02-02',
			check: '2020-02-02'
		},
		{
			id: '1',
			type: 'use',
			user: '22222',
			userMoney: '200',
			orderNum: '12344555666',
			status: '2',
			msg: '23255324',
			checkMoney: '100',
			create: '2020-02-02',
			check: '2020-02-02'
		}
	]
}

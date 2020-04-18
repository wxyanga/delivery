export default {
	// 资金类型
	moneyType: [
		{ value: '', label: '全部' },
		{ value: 'bal', label: '充值' },
		{ value: 'vip', label: '升级会员' },
		{ value: 'order', label: '购买单号' }
	],
	// 充值升级按钮
	RechargeType: [
		{ money: '100', value: 'be_vip', label: '升级为VIP会员' },
		{ money: '100', value: 'be_proxy', label: '升级为代理会员' },
		{ money: '100', value: 'bal', label: '充值' }
	],
	// 用户等级
	userLv: [
		{ value: 'normal', label: '普通会员' },
		{ value: 'vip', label: 'VIP会员' },
		{ value: 'proxy', label: '代理会员' }
	],
	lvMap: {
		lv1: '普通会员',
		lv2: 'VIP会员',
		lv3: '代理'
	},

	// 充值金额
	buyExpress: [{ money: '100' }, { money: '200' }, { money: '300' }, { money: '400' }, { money: '500' }, { money: '600' }],
	// 升级金额金额
	LvUPExpress: [
		{ money: '100', label: 'VIP会员' },
		{ money: '200', label: '代理会员' }
	],
	QRCode: 'money.png',
	openQQ: false,
	// 快递类型
	separateExpByType: [
		{ label: '所有快递', map: 'all' },
		{ label: '淘宝专用', map: 'taobao' },
		{ label: '天猫专用', map: 'tmall' },
		{ label: '阿里专用', map: 'ali' },
		{ label: '京东专用', map: 'jd' },
		{ label: '拼多多专用', map: 'pdd' },
		{ label: '拼多多电子', map: 'pd' }
	],
	expressStatus: [
		{ value: '', label: '全部' },
		{ value: 'pending', label: '未发货' },
		{ value: 'done', label: '已发货' }
	],
	FinanceStatus: [
		{ value: 'pending', label: '未审核' },
		{ value: 'done', label: '已到账' },
		{ value: 'reject', label: '已拒绝' }
	],
	checkMoney: [
		{ value: '', label: '全部' },
		{ value: '0', label: '待审核' },
		{ value: '1', label: '审核通过' },
		{ value: '2', label: '审核拒绝' }
	],
	// 购买单号 教程
	userRechargeTips: [
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: 'www.baidu.com',
			style: 'color: green;margin-right:30px'
		},
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: 'www.baidu.com',
			style: 'color: green;margin-right:30px'
		},
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: 'www.baidu.com',
			style: 'color: green;margin-right:30px'
		},
		{
			label: '淘宝易通打印批量发货教程（点击查看）',
			url: '',
			style: 'color: green;margin-right:30px'
		}
	],
	systomMsg: {
		label: '严禁利用公司支付宝涉及于本网站无关业务，如：赌博、色情、诈骗、等行为！',
		url: '',
		style: 'color: green'
	},
	wellCome: {
		label: '欢迎使用空包后台信息管理系统。',
		url: '',
		style: 'color: green'
	},

	// 获取QQ客服
	getQQ: [
		{
			service: '客服一',
			qq: '231564654',
			open: true,
			phone: ''
		},
		{
			service: '客服二',
			qq: '546871321',
			open: true,
			phone: ''
		},
		{
			service: '客服三',
			qq: '6873131351',
			open: true,
			phone: ''
		},
		{
			service: '客服四',
			qq: '63873535',
			open: true,
			phone: ''
		},
		{
			service: '',
			qq: '',
			open: true,
			phone: '18155462456'
		}
	]
}

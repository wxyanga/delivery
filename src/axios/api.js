export default {
	// 登录注册接口
	URL_LOGIN: getBaseUrl + '/portal/sign/in/', //登录
	URL_REGISTER: getBaseUrl + '/portal/sign/up/', // 注册
	URL_GET_CHECK: getBaseUrl + '/portal/fetch/img/', // 获取验证码
	URL_QUIT_LOGIN: getBaseUrl + '/portal/log/out/', // 退出登录

	URL_UP_userRecharge: getBaseUrl + '/portal/charge/commit/', //充值提交

	URL_GET_QRCODE: getBaseUrl + '/getQRCode', //充值二维码URL
	// 资金明细接口
	URL_GET_MONEY_DETAIL: getBaseUrl + '/portal/flow/list/', //分页查询资金明细

	// 购买单号接口
	URL_GET_userRecharge_TIPS: getBaseUrl + '/getuserRechargeTips', // 购买单号教程
	URL_ALL_ADDRESS: getBaseUrl + '/getAllAddress', // 获取用户地址
	URL_ALL_EXPRESS_TYPES: getBaseUrl + '/getAllExpressTypes', // 获取所有快递信息
	// URL_SET_DEFAULT_ADDRESS: getBaseUrl + '/setDefaultAddress', // 设置默认地址
	URL_SET_DEFAULT_EXPRESS: getBaseUrl + '/portal/set/default/express/', // 设置默认快递
	URL_POST_userRecharge: getBaseUrl + '/portal/place/order/', // 购买单号 order_id: "123"//成功快递单号
	// 单号查询
	URL_GET_EXPRESS_MESSAGE: getBaseUrl + '/portal/order/list/', // 分页查找单号信息
	URL_EXCEL_SEARCH_DOWNLOAD: getBaseUrl + '/portal/export/orders/', // 导出用户查询所有结果
	URL_DOWNLOAD_EXPRESS_MESSAGE: getBaseUrl + '/downloadExpressMessage', // 分页查找单号信息
	// 财务管理
	URL_FINANCE_CHECK_SEARCH: getBaseUrl + '/financeCheckSearch', // 财务分页查询待审核
	URL_FINANCE_CHECK: getBaseUrl + '/financeCheck', // 财务金额审核
	URL_FINANCE_CHECK_HISTORY: getBaseUrl + '/financeCheckHistory', // 财务审核记录
	URL_FINANCE_DETAIL_HISTORY: getBaseUrl + '/financeDetailHistory', // 财务消费记录
	// 系统管理
	URL_SYSTOM_ADD_MONEY: getBaseUrl + '/systomAddMoney', // 添加系统充值金额
	URL_SYSTOM_DEL_MONEY: getBaseUrl + '/systomPutMoney', // 删除系统充值金额
	URL_SYSTOM_PUT_MONEY: getBaseUrl + '/systomDelMoney', // 修改系统充值金额
	URL_UPLOAD_FILES: getBaseUrl + '/systomUploadFiles', // 上传文件接口
	// 快递用途
	URL_GET_EXPRESS_TYPES: getBaseUrl + '/systomGetExpressTypes', // 获取所有快递用途
	URL_ADD_EXPRESS_TYPES: getBaseUrl + '/systomAddExpressTypes', // 新增快递用途
	URL_PUT_EXPRESS_TYPES: getBaseUrl + '/systomPutExpressTypes', // 修改快递用途
	URL_DEL_EXPRESS_TYPES: getBaseUrl + '/systomDelExpressTypes', // 删除快递用途
	// 面单公司信息
	URL_GET_EXPRESS_ORDER: getBaseUrl + '/portal/code/info/', // 根据快递公司码表
	URL_ADD_EXPRESS_ORDER: getBaseUrl + '/systomAddExpressOrder', // 新增快递公司
	URL_PUT_EXPRESS_ORDER: getBaseUrl + '/systomPutExpressOrder', // 修改快递公司
	// URL_DEL_EXPRESS_ORDER: getBaseUrl + '/systomDelExpressOrder' // 删除快递公司面单
	// 添加面单
	URL_ADD_EXPRESS_ORDER_NUM: getBaseUrl + '/systomAddExpressOrderNum', // 新增面单
	// vip
	URL_GET_VIP: getBaseUrl + '/systomGetVip', // VIP分页查询
	URL_GET_VIP_TYPE: getBaseUrl + '/systomGetVipType', // VIP分类
	URL_GET_VIP_ADD_TYPE: getBaseUrl + '/systomGetVipAddType', // 添加VIP分类
	URL_GET_VIP_CHANGE: getBaseUrl + '/systomGetVipChange', // VIP设置
	// QQ
	URL_GET_QQ: getBaseUrl + '/systomGetQQ', // 获取客服数据
	URL_SET_QQ: getBaseUrl + '/systomSetQQ', // 设置客服设置
	//发货
	URL_GET_DELIVER_STATUS: getBaseUrl + '/systomGetQQ', // 获取发货状态
	URL_PUT_DELIVER_STATUS: getBaseUrl + '/systomGetQQ', // 批量修改发货状态
	// 充值
	URL_GET_RECHARGE_STATUS: getBaseUrl + '/systomGetQQ', // 获取充值待审核分页查询

	URL_GET_USER_ADDRESS: getBaseUrl + '/portal/address/list/', // 用户地址
	URL_DELETE_USER_ADDRESS: getBaseUrl + '/portal/address/delete/', // 删除发货地址 参数只传个 id
	URL_SET_DEFAULT_ADDRESS: getBaseUrl + '/portal/set/default/address/', // 设置默认发货地址分页查询

	URL_GET_USER_INFO: getBaseUrl + '/portal/user/info/',
	// /portal/user/info/ // 用户信息
	URL_PUT_ORDER_CHECK: getBaseUrl + '/kf/order/verify/', // 发货
	URL_PUT_ORDER_REBACK_CHECK: getBaseUrl + '/kf/order/send/', // 发货失败后列表中发货
	URL_PUT_ORDER_CHECK_RESEND: getBaseUrl + '/kf/order/resend/', // 重新发货
	URL_PUT_ORDER_RESEND_DETAIL_EXPORT: getBaseUrl + '/kf/order/resendDetailExport/', // 重新发货详情导出

	URL_PUT_RECHARGE_CHECK: getBaseUrl + '/kf/charge/verify/', // 充值审核
	URL_GET_CHARGE_FINANCE_LIST: getBaseUrl + '/kf/charge/list/', // 财务的充值记录
	URL_GET_ORDER_FINANCE_LIST: getBaseUrl + '/kf/order/list/', // 财务的消费记录
	URL_GET_ORDER_FINANCE: getBaseUrl + '/kf/order/get/', // 单个财务的消费记录
	URL_EXCEL_KF_SEARCH_DOWNLOAD: getBaseUrl + '/kf/export/orders/', // 导出管理员查询所有结果
	URL_EXCEL_USER_FINANCE: getBaseUrl + '/portal/export/flows/', // 用户导出资金明细
	// /portal/code/info/获取所有快递码值
	// /portal/address/list/ 获取用户所有地址
	// /kf/express/save/  维护快递公司

	// org.corp = body.get('corp', '')类型
	// org.corp_name = body.get('corpName', '')
	// org.express_type = body.get('expressType', '')
	// org.express_name = body.get('expressName', '')公司
	// 公司前端写，码表从接口获取USER_MODIFY_PASSWORD。
	URL_KF_FIND_USER: getBaseUrl + '/kf/user/list/ ', // 会员列表
	URL_KF_UPLOAD_USER: getBaseUrl + '/kf/update/user/   ', // 修改用户信息

	URL_USER_MODIFY_PASSWORD: getBaseUrl + '/portal/change/password/', //修改密码
	URL_SYSTOEM_RESET_PASSWORD: getBaseUrl + '/kf/reset/password/', //重置密码

	URL_EXCEL_EXPRESS_LIST: getBaseUrl + '/kf/express/list/', //快递列表
	URL_EXCEL_COMP_MODIFY: getBaseUrl + '/kf/express/save/', // 维护快递公司
	URL_EXCEL_COMP_DELETE: getBaseUrl + '/kf/express/delete/', // 删除快递公司

	// URL_EXCEL_MODEL: getBaseUrl + '/data/excel_template.xlsx', //Excel模板
	URL_KF_LIST: getBaseUrl + '/kf/kf/list/', // 客服列表
	URL_KF_MODIFY: getBaseUrl + '/kf/update/kf/', // 修改客服信息

	URL_KF_PUBLIC_LIST: getBaseUrl + '/kf/notice/list/', // 公告列表
	URL_KF_ADD_PUBLIC: getBaseUrl + '/kf/notice/add/', // 新增公告
	URL_KF_MODIFY_PUBLIC: getBaseUrl + '/kf/notice/update/', // 修改公告
	URL_KF_DELETE_PUBLIC: getBaseUrl + '/kf/notice/delete/', // 删除公告

	URL_KF_ALL_DAY: getBaseUrl + '/kf/bi/all/day/', // 日统计
	URL_KF_ALL_MONTH: getBaseUrl + '/kf/bi/all/month/', // 月统计
	URL_KF_ALL_USER: getBaseUrl + '/kf/bi/user/day/', // 用户统计
	URL_KF_UPDATE_HISTORY: getBaseUrl + '/kf/update/history/', // 用户修改记录

	URL_EXCEL_ZFB_PAY: getBaseUrl + '/portal/charge/pay/', // 支付宝付款
	URL_EXCEL_ZFB_PAY_SUCCESS: getBaseUrl + '/portal/charge/check_pay/', // 支付宝付款成功回调

	URL_EXCEL_UPLEAD: getBaseUrl + '/portal/upload/orders/', // 批量下单上传EXCEL
	URL_EXCEL_MODEL: getBaseUrl + '/data/place_orders.xlsx', //批量下单Excel模板
	URL_GET_CHAARGE_LIST: getBaseUrl + '/portal/charge/list/' // 用户充值记录
}

// URL_GET_MENU: getBaseUrl + '/getMenu', // 获取菜单
// 充值接口
// URL_GET_userRecharge: getBaseUrl + '/getuserRecharge', // 获取充值全部金额 ,confit
// +升级会员 需要金额 config

<template>
	<div>
		<el-form :inline="false" label-width="100px">
			<el-form-item label="用户名：">{{ userInfo['user_id'] }}</el-form-item>
			<!-- <el-form-item v-if="userInfo['role'] != 'admin'" label="会员类型：">{{ userLv }}</el-form-item> -->
			<el-form-item v-if="userInfo['role'] == 'admin'" label="用户类型：">系统管理员</el-form-item>
			<el-form-item v-if="userInfo['role'] != 'admin'" label="账户余额：">{{ userInfo.bal }}</el-form-item>
			<el-form-item label="注册QQ：">{{ userInfo.qq }}</el-form-item>
			<el-form-item label="注册Email：">{{ userInfo.email }}</el-form-item>
			<el-form-item label="注册时间：">{{ userInfo['create_date'] }}</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="modifyPassword">修改密码</el-button>
				<el-button type="primary" @click="quit">退出登录</el-button>
			</el-form-item>
		</el-form>

		<common-dialogs :right-click="dialogConfirm" :centerButtonText="'修改密码'" class="cust-Dialog-01">
			<template slot="modify">
				<el-form ref="formReg" :rules="rulesReg" :model="formReg" label-width="130px" style="width:90%">
					<el-form-item label="密码：" prop="passWord">
						<el-input type="password" style="width: 60%;" :key="'formReg'" v-model="formReg.passWord"></el-input>
						<span class="tips">密码由至少6位数字或字母组成</span>
					</el-form-item>
					<el-form-item label="确认密码：" prop="surePassword">
						<el-input type="password" style="width: 60%;" v-model="formReg.surePassword"></el-input>
						<span class="tips">再次输入密码</span>
					</el-form-item>
				</el-form>
			</template>
		</common-dialogs>
	</div>
</template>

<script>
import mixin from 'static/mixins'
import CommonDialogs from './CommonDialogs.vue'
export default {
	components: {
		CommonDialogs
	},
	mixins: [mixin.INFO],
	name: 'userExpressOrder',
	data() {
		let checkData = (rule, value, callback) => {
			if (!this.formData.amt) {
				return callback(new Error('充值金额不能为空'))
			}
			if (!value) {
				return callback(new Error('交易单号不能为空'))
			}
			callback()
		}
		let checkPassword = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('确认密码不能为空'))
			}
			if (value !== this.formReg.passWord) {
				return callback(new Error('确认密码与密码不同'))
			}
			if (value.length < 6) {
				return callback(new Error('确认密码由至少6位数字或字母组成'))
			}
			callback()
		}
		return {
			moneys: [],
			userLv: [],
			radio: '',
			type: '',
			imgSrc: '',
			step: 1,
			selectType: {},
			formData: {
				amt: '',
				orderId: '',
				chartType: ''
				// ('bal', '充值余额'),
				// ('be_normal', '升级为会员'),
				// ('be_vip', '升级为VIP'),
				// ('be_proxy', '升级为代理'),
			},
			RechargeType: [],
			rules: {
				orderId: [{ validator: checkData, required: true, trigger: 'blur' }]
			},
			formReg: { passWord: '', surePassword: '' },
			rulesReg: {
				passWord: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, message: '密码由至少6位数字或字母组成', trigger: 'blur' }
				],
				surePassword: [{ validator: checkPassword, required: true, trigger: 'blur' }]
			},
			canshow: true
		}
	},
	beforeCreate() {},
	mounted() {
		this.init()
		this.getuserRechargeMoneys()
	},
	methods: {
		modifyPassword() {
			this.$showDialog({ title: '修改密码', slotName: 'modify' })
		},
		dialogConfirm() {
			let params = {
				newPassWord: this.formReg.passWord
			}
			this.$refs.formReg.validate(valid => {
				if (valid) {
					this.$post(this.$API.URL_USER_MODIFY_PASSWORD, params, '密码修改成功,请重新登录').then(res => {
						sessionStorage.removeItem('accessToken')
						sessionStorage.removeItem('loginState')
						sessionStorage.removeItem('INFO')
						this.$store.commit('isLogin', false)
						this.$router.push('/')
					})
				}
			})
		},
		quit() {
			this.$post(this.$API.URL_QUIT_LOGIN, {}, '您已成功退出系统！').then(res => {
				sessionStorage.removeItem('accessToken')
				sessionStorage.removeItem('loginState')
				sessionStorage.removeItem('INFO')
				this.$store.commit('isLogin', false)
				this.$router.push('/')
			})
		},
		goNext() {
			this.formData.amt = this.radio.money
			this.formData.chartType = this.selectType.value
			this.step = 2
		},
		init() {
			this.canshow = this.userInfo['user_type'] == 'normal'
			this.step = 1
			// this.imgSrc = require('assets/' + QRCode)
			this.imgSrc = QRCode
			this.$log('this.imgSrc', this.imgSrc)
			this.userLv = userLv.filter(item => item.value == this.userInfo.user_type)[0].label
			let typeIndex = -1
			RechargeType.forEach((item, index) => {
				if (item.value.indexOf(this.userInfo.user_type) > 0) typeIndex == index
			})
			this.RechargeType = RechargeType.filter((it, index) => {
				return index > typeIndex
			})
			// this.selectType = this.RechargeType[0]
			this.radioTypeChange(this.RechargeType[0])
		},
		getuserRechargeMoneys() {
			// let params = {}
			// this.$post(this.$API.URL_GET_userRecharge,params,'').then()
		},
		radioTypeChange(val) {
			this.selectType = val
			if (val.value == 'bal') this.moneys = buyExpress
			else this.moneys = [val]
			this.radio = this.moneys[0]
		},
		radioChange() {},
		uploadData() {
			let _this = this
			this.$refs.form.validate(valida => {
				if (valida) {
					// this.$log(0, this.formData)
					this.$post(this.$API.URL_UP_userRecharge, this.formData, '提交成功，我们会尽快审核。').then(() => _this.init())
				}
			})
		}
	}
}
</script>

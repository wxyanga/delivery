<template>
	<div class="home">
		<h1 class="title">欢迎进入{{ systomConfig.name }}</h1>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{ titleName[index] }}</span>
			</div>
			<el-form
				v-if="index == 0"
				ref="formLogin"
				:rules="rulesLogin"
				:model="formLogin"
				label-width="100px"
			>
				<el-form-item label="用户名：" prop="userid">
					<el-input :key="'formLogin'" v-model="formLogin.userid"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="passWord">
					<el-input type="password" v-model="formLogin.passWord"></el-input>
				</el-form-item>
				<el-form-item label="验证码：" prop="vstr">
					<el-input style="width: 60%;" v-model="formLogin.vstr"></el-input>
					<span class="tips">输入验证码</span>
				</el-form-item>
				<el-form-item label="验证码：" v-if="timeStmp">
					<img
						style="vertical-align: middle;cursor:pointer;height:40px"
						:src="timeStmp"
						alt="点击重新获取"
						@click="getTimeStamp"
					/>
					<a class="tips" href="javascript:;" @click="getTimeStamp">看不清楚,换一张</a>
				</el-form-item>
				<el-form-item>
					<!-- <el-button type @click="goIndex">返回首页</el-button> -->
					<el-button type="primary" @click="userLogin">登录</el-button>
					<el-button
						class="titleButton"
						:class="index == 1 ? 'active' : ''"
						type="text"
						@click="changeForm(1)"
					>快速注册</el-button>
				</el-form-item>
			</el-form>
			<el-form v-else ref="formReg" :rules="rulesReg" :model="formReg" label-width="100px">
				<el-form-item v-model="formReg.userid" label="用户名：" prop="userid">
					<el-input style="width: 60%;" :key="'formReg'" v-model="formReg.userid"></el-input>
					<span class="tips">请使用手机号码注册</span>
				</el-form-item>
				<el-form-item label="密码：" prop="passWord">
					<el-input type="password" style="width: 60%;" :key="'formReg'" v-model="formReg.passWord"></el-input>
					<span class="tips">密码由至少6位数字或字母组成</span>
				</el-form-item>
				<el-form-item label="确认密码：" prop="surePassword">
					<el-input type="password" style="width: 60%;" v-model="formReg.surePassword"></el-input>
					<span class="tips">再次输入密码</span>
				</el-form-item>

				<el-form-item v-show="false" label prop="qq"></el-form-item>
				<el-form-item v-show="false" label prop="email"></el-form-item>
				<el-form-item label="联系QQ：" prop="qq">
					<el-input style="width: 60%;" v-model="formReg.qq"></el-input>
					<span class="tips">输入QQ号码（必须真实）</span>
				</el-form-item>
				<el-form-item label="E-mail：" prop="email">
					<el-input style="width: 60%;" v-model="formReg.email"></el-input>
					<span class="tips">输入E-mail（必须真实）</span>
				</el-form-item>
				<el-form-item label="验证码：" prop="vstr">
					<el-input style="width: 60%;" v-model="formReg.vstr"></el-input>
					<span class="tips">输入验证码</span>
				</el-form-item>
				<el-form-item label="验证码：" v-if="timeStmp">
					<img
						style="vertical-align: middle;cursor:pointer;height:40px"
						:src="timeStmp"
						alt="点击重新获取"
						@click="getTimeStamp"
					/>
					<a class="tips" href="javascript:;" @click="getTimeStamp">看不清楚,换一张</a>
				</el-form-item>
				<el-form-item>
					<!-- <el-button type @click="goIndex">返回首页</el-button> -->
					<el-button type="primary" @click="userRegister">确认注册</el-button>
					<el-button
						:class="index == 0 ? 'active' : ''"
						class="titleButton"
						type="text"
						@click="changeForm(0)"
					>会员登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			let sameRules = {
				userid: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 6, message: '请输入注册时使用的手机号码', trigger: 'blur' }
				],
				passWord: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, message: '密码由至少6位数字或字母组成', trigger: 'blur' }
				],
				vstr: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
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
			let checkUserName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请使用手机号码注册'))
				}
				if (!/^1[3456789]\d{9}$/.test(value)) {
					return callback(new Error('手机号码填写有误，请重新输入'))
				}
				callback()
			}
			return {
				index: 0,
				systomConfig: systomConfig,
				timeStmp: '',
				titleName: ['登录', '快速注册'],
				formLogin: { userid: '', passWord: '', vstr: '', vid: '' },
				rulesLogin: {
					userid: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 6, message: '请输入注册时使用的手机号码', trigger: 'blur' }
					],
					passWord: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, message: '密码由至少6位数字或字母组成', trigger: 'blur' }
					],
					vstr: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
				},
				formReg: { userid: '', passWord: '', surePassword: '', qq: '', email: '', vstr: '', vid: '' },
				rulesReg: {
					userid: [
						{ validator: checkUserName, required: true, trigger: 'blur' }
						// { required: true, message: '请使用手机号码注册', trigger: 'blur' },
						// { min: 6, message: '用户名由至少6位数字或字母组成', trigger: 'blur' }
					],
					passWord: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, message: '密码由至少6位数字或字母组成', trigger: 'blur' }
					],
					vstr: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
					surePassword: [{ validator: checkPassword, required: true, trigger: 'blur' }],
					qq: [{ required: true, message: '请输入联系QQ', trigger: 'blur' }],
					email: [
						{
							required: true,
							type: 'email', //要检验的类型（number，email，date等）
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change']
						}
					]
				}
			}
		},
		created() {
			if (this.$route.params.step) this.index = this.$route.params.step
			this.getTimeStamp(false)
		},
		methods: {
			goIndex() {
				this.$router.push('/')
			},
			getTimeStamp(isShowLoading = true) {
				this.$post(this.$API.URL_GET_CHECK, {}, '', isShowLoading).then(res => {
					if (this.index == 0) this.formLogin.vid = res.id
					else this.formReg.vid = res.id
					this.timeStmp = res.img
				})
			},
			changeForm(num) {
				this.index = num
				this.getTimeStamp()
				this.$nextTick(() => {
					this.$refs.formLogin && this.$refs.formLogin.clearValidate()
					this.$refs.formReg && this.$refs.formReg.clearValidate()
				})
			},
			userLogin() {
				this.$refs.formLogin.validate(valid => {
					if (valid) {
						this.$post(this.$API.URL_LOGIN, this.formLogin, '').then(
							res => {
								sessionStorage.setItem('loginState', true)
								sessionStorage.setItem('INFO', JSON.stringify(res))
								this.$store.commit('isLogin', sessionStorage.getItem('loginState'))
								this.$router.push('/home/')
							},
							() => {
								return this.getTimeStamp()
							}
						)
					} else {
						return false
					}
				})
			},
			userRegister() {
				this.$refs.formReg.validate(valid => {
					if (valid) {
						this.$post(this.$API.URL_REGISTER, this.formReg, '').then(
							() => {
								this.$message.success('注册成功，请登录！')
								this.formReg = { userid: '', passWord: '', surePassword: '', qq: '', email: '', vstr: '' }
								this.changeForm(0)
							},
							() => {
								return this.getTimeStamp()
							}
						)
					} else {
						return false
					}
				})
			}
		}
	}
</script>

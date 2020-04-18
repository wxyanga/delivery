<template>
	<div>
		<div v-if="step == 1">
			<el-form label-width="100px">
				<el-form-item label="第一步：">请选择以下方式进行自动充值，无需联系客服自动到账！(付款后请提交交易号)</el-form-item>
			</el-form>
			<el-form :inline="true" label-width="100px">
				<!-- <el-form-item style="margin-right:100px" label="会员类型：">{{ userLv }}</el-form-item> -->
				<el-form-item label="账户余额：">{{ userInfo.bal }}</el-form-item>
			</el-form>
			<!-- <el-form :inline="false">
				<el-form-item label="充值类型：" label-width="100px">
					<el-radio-group v-model="selectType" size="small" @change="radioTypeChange">
						<template v-for="(item, index) in RechargeType">
							<el-radio :key="index" :label="item" border>{{ item.label }}</el-radio>
						</template>
					</el-radio-group>
				</el-form-item>
			</el-form> -->
			<el-form :inline="false">
				<el-form-item label="充值金额：" label-width="100px">
					<el-radio-group v-model="radio" size="small" @change="radioChange">
						<template v-for="(item, index) in moneys">
							<el-radio style="width:120px;margin-bottom:20px" :key="index" :label="item" border>￥:{{ item.money }}元</el-radio>
							<br :key="index + 10" v-if="(index + 1) % 6 == 0" />
						</template>
					</el-radio-group>
				</el-form-item>
				<el-form-item label-width="100px">
					<el-button type="primary" :disabled="!radio" @click="goNext">充值</el-button>
					<el-button type="danger" v-if="userInfo['user_id'] == '18150903562'"  @click="zfbRecharge">支付宝充值</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-if="step == 2">
			<el-form label-width="100px">
				<el-form-item label="第二步：">扫码付款后，点击下一步输入交易号<span style="color:red">(交易号后4位)</span></p></el-form-item>
			</el-form>
			<div style="text-align:center">
				<img style="width: 300px;" :src="imgSrc" alt />
                <i class="el-icon-caret-right" style="height: 233px;
    vertical-align: text-bottom;margin:0 20px"></i>
				<img style="height: 460px;" :src="imgSrc1" alt />
				<br />
				<p>扫码付款后，点击下一步输入交易号<span style="color:red">(交易号后4位)</span></p>
				<br />
				<div style="text-align:center">
					<el-button type="primary" @click="step = 1">上一步</el-button>
					<el-button type="primary" @click="step = 3">下一步</el-button>
				</div>
			</div>
		</div>
		<div v-if="step == 3">
			<el-form label-width="100px">
				<el-form-item label="第三步：">输入交易号(交易号后4位)，点击确认，完成充值</el-form-item>
			</el-form>
			<el-form ref="form" :model="formData" :rules="rules" label-width="150px">
				<el-form-item prop="orderId" label="交易单号后4位：">
					<el-input maxlength="4" v-model="formData.orderId" placeholder="请输入交易单号最后4位"></el-input>
				</el-form-item>
                <el-form-item label="交易单号示例：">
                    <img style="height: 460px;" :src="imgSrc1" alt />
				</el-form-item>
			</el-form>
			<div style="text-align:center">
				<el-button type="primary" @click="step = 2">上一步</el-button>
				<el-button type="primary" @click="uploadData">确认</el-button>
			</div>
		</div>
        <a :href="payUrl" ref='zfbLink'></a>
	</div>
</template>

<script>
import mixin from 'static/mixins'
export default {
	mixins: [mixin.INFO],
	name: 'userExpressOrder',
	data() {
		let checkData = (rule, value, callback) => {
			if (!this.formData.amt) {
				return callback(new Error('充值金额不能为空'))
			}
			if (!value) {
				return callback(new Error('请输入交易单号最后4位'))
			}
			callback()
		}
		return {
            payUrl:'',
			moneys: [],
			userLv: [],
			radio: '',
			type: '',
            imgSrc: '',
            imgSrc1:'',
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
			}
		}
	},
	beforeCreate() {},
	mounted() {
		this.init()
		this.getuserRechargeMoneys()
	},
	methods: {
        zfbRecharge(){
            if(this.radio.money){
                this.$post(this.$API.URL_EXCEL_ZFB_PAY, {
                    amount:this.radio.money,
                    userid:this.userInfo['user_id'],
                    paymethod:'alipay'
                }, '',false).then(res=>{
                    this.$log('res success',res)
                    if(res.url) {
                        this.payUrl = res.url
                        this.$loading.service({
                                lock: true,
                                text: 'Loading',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                        this.$nextTick(()=>{
                            this.$refs.zfbLink.click()
                        })
                        
                    }
                    // window.open(res.url,'blank')
                })
            }
        },
		goNext() {
			this.formData.amt = this.radio.money - 0
			this.formData.chartType = this.selectType.value
			this.step = 2
		},
		init() {
			this.step = 1
			// this.imgSrc = require('assets/' + QRCode)
            this.imgSrc = QRCode
            this.imgSrc1 = QRCode1
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

<template>
	<div>
		<div style="text-align: center;background:#dda53f;padding:20px 20% 20px 0;margin-bottom:20px">
			<template v-for="(it, index) in tips">
				<a v-if="it.url" :key="index" :href="it.url" target="_blank" :style="'color:' + `${it.color}`">{{ it.label }}</a>
				<span v-else :key="index" :href="it.url" target="_blank" :style="'color:' + `${it.color}`">{{ it.label }}</span>
				<br :key="'br' + index" />
				<br :key="'brs' + index" />
			</template>
		</div>
		<div v-if="step == 1">
			<!-- <el-autocomplete
						style="width:90%"
						clearable
						v-model="validatorForm.setNewAddress"
						:fetch-suggestions="querySearch"
						placeholder="格式：姓名/地址/电话/邮编"
						:debounce="100"
						@select="handleSelect"
					>
						<template slot-scope="props">
							<div style="position: relative;">
								{{ `${props.item.name}/${props.item.address}/${props.item.tel}/${props.item.postid || ''}` }}
								<span v-if="props.item['is_default'] == 1" class="select-default">默认</span>
							</div>
						</template>
			</el-autocomplete>-->
			<el-form :model="senderForm" ref="senderForm" :rules="senderRules" label-width="137px">
				<el-form-item label="发货人姓名" prop="sender">
					<el-input style="width:90%" v-model="senderForm.sender"></el-input>
				</el-form-item>
				<el-form-item label="发货人电话" prop="senderTel">
					<el-input style="width:90%" v-model="senderForm.senderTel"></el-input>
				</el-form-item>
				<el-form-item label="设置发货省市区" prop="sendAddress">
					<el-cascader :props="cascaderProps" style="width:90%" :options="options" v-model="senderForm.sendAddress"></el-cascader>
				</el-form-item>
				<el-form-item label="详细地址" prop="sendAddr">
					<el-input type="textarea" style="width:90%" v-model="senderForm.sendAddr"></el-input>
				</el-form-item>
				<el-form-item label="发货邮编" prop="senderPostid">
					<el-input style="width:90%" v-model="senderForm.senderPostid"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="137px">
				<el-form-item>
					<el-button type="primary" @click="setSendAddress">设置为发货地址</el-button>
					<el-button type="primary" @click="setDefault">设为默认</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-else-if="step == 2">
			<div style="margin-bottom:20px">
				<el-radio-group v-model="separateSelected" @change="changeSeparate">
					<el-radio-button v-for="(it, ind) in separateExpByType" :key="ind" :label="it.map">{{ it.label }}</el-radio-button>
				</el-radio-group>
			</div>
			<div>
				<el-form :model="validatorForm" ref="form2" class="cust-exp-type" :rules="rules2" label-width="137px">
					<el-form-item label="选择快递类型" prop="ExpTypeLabel" style="width:80%">
						<el-select v-model="validatorForm.ExpTypeLabel" style="width:90%" @change="changeSeparateLabel">
							<el-option v-for="(it, ind) in separate" :key="ind" :value="it.text">
								<div style="position: relative;">
									{{ it.text }}
									<span v-if="it.default" class="select-default">默认</span>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-form label-width="137px">
					<el-form-item>
						<el-button type="primary" @click="setSendExp">设置为发货快递</el-button>
						<el-button type="primary" @click="setDefaultExp">设为默认</el-button>
						<el-button type="primary" @click="goBack(1)">返回上一步</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div v-else-if="step == 3">
			<h3>第三步：请严格按格式去复制地址提交，否则无法购买单号</h3>
			<el-form :model="receiverForm" ref="receiverForm" :rules="receiverRules" label-width="137px">
				<el-form-item label="电商订单号" prop="tid" style="width:80%">
					<el-input v-model="receiverForm.tid" placeholder="请输入电商平台的单号"></el-input>
				</el-form-item>
				<el-form-item label="发货人姓名" prop="receiver">
					<el-input style="width:90%" v-model="receiverForm.receiver"></el-input>
				</el-form-item>
				<el-form-item label="发货人电话" prop="receiverTel">
					<el-input style="width:90%" v-model="receiverForm.receiverTel"></el-input>
				</el-form-item>
				<el-form-item label="设置发货省市区" prop="receiverAddress">
					<el-cascader :props="cascaderProps" style="width:90%" :options="options" v-model="receiverForm.receiverAddress"></el-cascader>
				</el-form-item>
				<el-form-item label="详细地址" prop="receiveAddr">
					<el-input type="textarea" v-model="receiverForm.receiveAddr" style="width:90%"></el-input>
				</el-form-item>
				<el-form-item label="发货邮编" prop="receiverPostid">
					<el-input style="width:90%" v-model="receiverForm.receiverPostid"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button type="primary" @click="setSendPack">发包</el-button>
				<el-button type="primary" @click="goBack(2)">返回上一步</el-button>
			</div>
		</div>
		<el-tab-pane label="单一录入" name="third">
			<div v-if="step == 1">
				<el-form label-width="150px">
					<el-form-item label="第一步：">请填写发货人信息</el-form-item>
				</el-form>
				<!-- <el-form label-width="150px">
						<el-form-item label="设置发货信息：">
							<el-autocomplete
								style="width:90%"
								v-model="validatorForm.setNewAddress"
								:fetch-suggestions="querySearch"
								:debounce="100"
								@select="handleSelect"
							>
								<template slot-scope="props">
									<div style="position: relative;">
										{{ `${props.item.name}/${props.item.prov}/${props.item.city}/${props.item.county}/${props.item.address}/${props.item.tel}/${props.item.postid || ''}` }}
										<span
											v-if="props.item['is_default'] == 1"
											class="select-default"
										>默认</span>
									</div>
								</template>
							</el-autocomplete>
						</el-form-item>
				</el-form>-->
				<el-form label-width="150px">
					<el-form-item label="设置发货信息：">
						<el-autocomplete style="width:80%" v-model="validatorForm.setNewAddress" :fetch-suggestions="querySearch" :debounce="100" @select="handleSelect">
							<template slot-scope="props">
								<div style="position: relative;">
									{{ `${props.item.name}/${props.item.prov}/${props.item.city}/${props.item.county}/${props.item.address}/${props.item.tel}/${props.item.postid || ''}` }}
									<span v-if="props.item['is_default'] == 1" class="select-default">默认</span>
								</div>
							</template>
						</el-autocomplete>
						<el-button type="text" @click="modifyStytus = true">发货人详情</el-button>
					</el-form-item>
				</el-form>
				<!-- <el-form :model="senderForm" ref="senderForm" :rules="senderRules" label-width="150px">
						<el-form-item prop="sender" label="发货人姓名">
							<el-input style="width:90%" v-model="senderForm.sender"></el-input>
						</el-form-item>
						<el-form-item prop="senderTel" label="发货人电话">
							<el-input style="width:90%" v-model="senderForm.senderTel"></el-input>
						</el-form-item>
						<el-form-item prop="sendAddr" label="设置发货省市区">
							<el-cascader
								:props="cascaderProps"
								style="width:90%"
								:options="options"
								v-model="senderForm.sendAddr"
							></el-cascader>
						</el-form-item>
						<el-form-item prop="sendAddress" label="详细地址">
							<el-input type="textarea" style="width:90%" v-model="senderForm.sendAddress"></el-input>
						</el-form-item>
						<el-form-item label="发货邮编">
							<el-input style="width:90%" v-model="senderForm.sendPostid"></el-input>
						</el-form-item>
				</el-form>-->
				<el-form label-width="150px">
					<el-form-item>
						<!-- <el-button type @click="setDefault">设为默认</el-button> -->
						<el-button type="primary" @click="setSendAddress">下一步</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div v-else-if="step == 2">
				<el-form label-width="150px">
					<el-form-item label="第二步：">请选择发货快递</el-form-item>
				</el-form>
				<el-form label-width="150px">
					<el-form-item label="快递类型">
						<el-radio-group v-model="separateSelected" @change="changeSeparate">
							<el-radio-button v-for="(it, ind) in separateExpByType" :key="ind" :label="it.map">{{ it.label }}</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>

				<el-form :model="validatorForm" ref="form2" class="cust-exp-type" :rules="rules2" label-width="150px">
					<el-form-item label="选择快递类型" prop="ExpTypeLabel" style="width:80%">
						<el-select v-model="validatorForm.ExpTypeLabel" style="width:90%" @change="changeSeparateLabel">
							<el-option v-for="(it, ind) in separate" :key="ind" :value="it.text">
								<div style="position: relative;">
									{{ it.text }}
									<span v-if="it.id == userInfo.def_express" class="select-default">默认</span>
									<el-button v-else type="text" class="select-default" @click="setDefaultExp(it)">设为默认</el-button>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-form label-width="150px">
					<el-form-item>
						<el-button type @click="goBack(1)">返回上一步</el-button>
						<!-- <el-button type @click="setDefaultExp">设为默认</el-button> -->
						<el-button type="primary" @click="setSendExp">下一步</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div v-else-if="step == 3">
				<el-form label-width="150px">
					<el-form-item label="第三步：">请严格按格式去复制地址提交，否则无法购买单号</el-form-item>
				</el-form>
				<el-form :model="receiverForm" ref="receiverForm" :rules="receiverRules" label-width="150px">
					<!-- <el-form-item label="" prop=""> </el-form-item> -->
					<el-form-item label="商品名称" prop="goodsName">
						<el-input style="width:90%" v-model="receiverForm.goodsName"></el-input>
					</el-form-item>
					<el-form-item label="电商订单号" prop="tid">
						<el-input style="width:90%" v-model="receiverForm.tid"></el-input>
					</el-form-item>
					<el-form-item label="收货人姓名" prop="receiver">
						<el-input style="width:90%" v-model="receiverForm.receiver"></el-input>
					</el-form-item>
					<el-form-item label="收货人电话" prop="receiverTel">
						<el-input style="width:90%" v-model="receiverForm.receiverTel"></el-input>
					</el-form-item>
					<el-form-item label="设置收货省市区" prop="receiveAddr">
						<el-cascader :props="cascaderProps" style="width:90%" :options="options" v-model="receiverForm.receiveAddr"></el-cascader>
					</el-form-item>
					<el-form-item label="收货人详细地址" prop="receiverAddress">
						<el-input type="textarea" v-model="receiverForm.receiverAddress" style="width:90%"></el-input>
					</el-form-item>
					<el-form-item label="收货邮编" prop="receiverPostid">
						<el-input style="width:90%" v-model="receiverForm.receiverPostid"></el-input>
					</el-form-item>
				</el-form>
				<el-form label-width="150px">
					<el-form-item>
						<el-button type @click="goBack(2)">返回上一步</el-button>
						<el-button type="primary" @click="setSendPack">下单需使用 {{ setDefaultExpType.myMoney || 0 }} 元，账户余额：{{ userInfo.bal }}，确认金额并下单</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-tab-pane>
	</div>
</template>

<script>
import area from 'static/area.js'
import mixin from 'static/mixins'

export default {
	mixins: [mixin.INFO],
	data() {
		let checkRecive = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('电话必填'))
			}
			if (!/^1[3456789]\d{9}$/.test(value)) {
				return callback(new Error('手机号码填写有误，请重新输入'))
			}
			callback()
		}
		return {
			// sender
			// senderTel
			// sendAddress
			// sendAddr
			// senderPostid

			// expressType
			// amt

			// tid
			// receiver
			// receiverTel
			// receiverAddress
			// receiveAddr
			// receiverPostid
			options: area.province,
			cascaderProps: {
				value: 'label'
			},
			senderForm: {
				sender: '',
				senderTel: '',
				sendAddress: '',
				sendAddr: [],
				senderPostid: ''
			},
			receiverForm: {
				tid: '',
				receiver: '',
				receiverTel: '',
				receiverAddress: '',
				receiveAddr: [],
				receiverPostid: ''
			},
			senderRules: {
				sender: [{ required: true, message: '请输入发货人姓名', trigger: 'blur' }],
				senderTel: [{ validator: checkRecive, required: true, trigger: 'blur' }],
				sendAddress: [{ required: true, message: '请输入发货省市区', trigger: 'blur' }],
				sendAddr: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
			},
			receiverRules: {
				tid: [{ required: true, message: '请输入电商平台订单号', trigger: 'blur' }],
				receiver: [{ required: true, message: '请输入收件人姓名', trigger: 'blur' }],
				receiverTel: [{ validator: checkRecive, required: true, trigger: 'blur' }],
				receiverAddress: [{ required: true, message: '请输入收件人省市区', trigger: 'blur' }],
				receiveAddr: [{ required: true, message: '请输入收件人详细地址', trigger: 'blur' }]
			},
			step: 1,
			tips: [],

			sendAddress: [], // 所有地址

			isSelect: false,
			isDefault: false,
			validatorForm: {
				setSelectObj: {},
				setNewAddress: '',
				ExpTypeID: '',
				ExpTypeLabel: '',
				reciveAddress: '',
				expressOrder: ''
			},
			form: {
				sendAddress: '',
				ExpTypeID: ''
			},
			expTypes: [],
			separateExpByType: [],
			separateSelected: ''
		}
	},

	mounted() {
		this.init()
		this.getDefaultData()
		// this.getExpType()
	},
	computed: {
		separate() {
			return this.expTypes.filter(item => {
				if (this.separateSelected == 'all') return true
				else return item.map == this.separateSelected
			})
		}
	},
	methods: {
		init() {
			this.tips = userRechargeTips
			this.separateExpByType = separateExpByType
			this.separateSelected = separateExpByType[0].map
		},
		getDefaultData() {
			this.$post(this.$API.URL_GET_USER_ADDRESS, {}, '').then(res => {
				this.sendAddress = res
				// let f = this.sendAddress.filter(item => item['is_default'] == 1)
				// if (f[0]) {
				// 	this.validatorForm.setSelectObj = f[0]
				// 	this.validatorForm.setNewAddress = `${f[0].name}/${f[0].address}/${f[0].tel}/${f[0].postid || ''}`
				// }
			})
		},
		setSendPack() {
			this.$refs.form3.validate(valida => {
				if (valida) {
					this.$log(0, this.validatorForm.setSelectObj, this.setDefaultExpType)
					let { name, tel, address, postid, expressOrder } = this.validatorForm.setSelectObj
					let [receiver, receiverTel, receiveAddr, receiverPostid] = this.validatorForm.reciveAddress.split(',')
					let params = {
						expressType: this.setDefaultExpType.codeValue,
						sender: name,
						sendAddr: address,
						senderPostid: postid,
						senderTel: tel,
						receiver,
						receiveAddr,
						receiverPostid,
						receiverTel,
						tid: expressOrder,
						amt: this.setDefaultExpType.myMoney
					}
					this.$post(this.$API.URL_POST_userRecharge, params, '单号购买成功，修改收货地址可继续发包。')
					this.validatorForm.expressOrder = this.validatorForm.reciveAddress = ''
				}
			})
		},
		goBack(val) {
			this.step = val
		},
		changeSeparate(val) {
			if (!(val == 'all' || this.setDefaultExpType.map == val)) {
				this.validatorForm.ExpTypeID = ''
				this.validatorForm.ExpTypeLabel = ''
				this.setDefaultExpType = {}
			}
		},
		changeSeparateLabel(val) {
			this.$refs.form2.clearValidate()
			let select = this.expTypes.filter(item => item.text == val)[0]
			this.validatorForm.ExpTypeID = select.id
			this.setDefaultExpType = select
		},
		getExpType() {
			// this.$post(this.$API.URL_EXCEL_EXPRESS_LIST, {}, '').then(res => {
			// 	this.expTypes = res
			// 	this.getTableData(this.separateExpByType[0].map)
			// })
			this.$post(this.$API.URL_EXCEL_EXPRESS_LIST, {}, '').then(res => {
				this.expTypes = res.map(item => {
					let text = []
					for (const [key, it] of Object.entries(userLv)) {
						text.push(it.label + ':' + (item[it.value] || '00') + '元')
					}
					item.myMoney = item[this.userInfo['user_type']] || 0
					text.push('我的价格:' + (item[this.userInfo['user_type']] || '00') + '元')
					// text.push('库存:' + item.surplus + '件')
					this.$set(text, 0, `${item.codeName} ` + text[0])
					item.text = text.join('/')
					if (item.codeValue == this.userInfo['def_express']) {
						item.default = 1
						this.validatorForm.ExpTypeID = item.id
						this.validatorForm.ExpTypeLabel = item.text
						this.setDefaultExpType = item
					}
					return item
				})
			})
		},

		setSendExp() {
			this.$refs.form2.validate(validat => {
				if (validat) {
					if (this.setDefaultExpType.id == this.validatorForm.ExpTypeID) {
						this.form.ExpTypeID = this.validatorForm.ExpTypeID
						this.step = 3
					} else {
						this.$message.error('系统库存为0,无法提交')
					}
				}
			})
		},
		setDefaultExp() {
			this.$refs.form2.validate(validat => {
				if (validat) {
					if (this.setDefaultExpType['default']) {
						this.$message.error('已是默认')
					} else {
						let params = {
							expressType: this.setDefaultExpType.codeValue
						}
						this.$post(this.$API.URL_SET_DEFAULT_EXPRESS, params, '设置成功').then(() => {
							this.INFO()
							this.getExpType()
						})
					}
				}
			})
		},
		setSendAddress() {
			this.$refs.senderForm.validate(validat => {
				if (validat) {
					this.step = 2
				}
			})
		},
		setDefault() {
			this.$refs.form.validate(validat => {
				if (validat) {
					let cparams = {}
					this.$log(0, this.isSelect, this.validatorForm.setSelectObj, this.validatorForm.setNewAddress)
					let [name, address, phone, postid] = this.validatorForm.setNewAddress.split('/')
					if (this.isDefault) {
						return this.$message.error('已是默认')
					} else if (this.isSelect) {
						cparams = {
							...this.validatorForm.setSelectObj,
							sender: name,
							sendAddress: address,
							sendTel: phone,
							sendPostid: postid
						}
					} else {
						cparams = {
							sender: name,
							sendAddress: address,
							sendTel: phone,
							sendPostid: postid
						}
					}

					this.$post(this.$API.URL_SET_DEFAULT_ADDRESS, cparams, '设置成功').then(() => {
						this.getDefaultData()
					})
				}
			})
		},
		checkPass() {
			return !this.validatorForm.setNewAddress
		},
		handleSelect(val) {
			this.$refs.form.clearValidate()
			this.validatorForm.setNewAddress = `${val.name}/${val.address}/${val.tel}/${val.postid}`
			this.validatorForm.setSelectObj = val
		},
		querySearch(queryString, cb) {
			var restaurants = this.sendAddress
			cb(restaurants)
		}
	}
}
</script>

<template>
	<div>
		<!-- <div class="tipsClass">
			<template v-for="(it, index) in tips">
				<a v-if="it.url" :key="index" :href="it.url" target="_blank" :style="it.style">{{ it.label }}</a>
				<span v-else :key="index" :href="it.url" target="_blank" :style="it.style">{{ it.label }}</span>
			</template>
		</div>-->
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="批量录入" name="second">
				<el-form label-width="150px">
					<!-- <el-form-item label="地址">
						{{ validatorForm.setNewAddress }}
					</el-form-item>-->
					<el-form-item label="快递类型">
						<el-radio-group v-model="separateSelected" @change="changeSeparate">
							<el-radio-button v-for="(it, ind) in separateExpByType" :key="ind" :label="it.map">{{ it.label }}</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>

				<el-form :model="validatorForm" ref="form1" class="cust-exp-type" :rules="rules2" label-width="150px">
					<el-form-item label="选择快递类型" prop="ExpTypeLabel" style="width:80%">
						<el-select v-model="validatorForm.ExpTypeLabel" style="width:100%" @change="changeSeparateLabel">
							<el-option v-for="(it, ind) in separate" :key="ind" :value="it.text">
								<div style="position: relative;">
									{{ it.text }}
									<span v-if="it.id == userInfo.def_express" class="select-default">默认</span>
									<el-button v-else type="text" class="select-default" @click="setDefaultExp(it)">设为默认</el-button>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
					<!-- </el-form>
					<el-form label-width="150px">-->

					<el-form-item label="录入参照格式">
						<!-- <div>
							<span style="background:green;color:#fff;padding:5px 10px;margin-right:10px"
								>商品名称 收货人姓名 收货人电话 收货地址(或省,市,区,详细地址) 电商平台订单号（订单号不是必填）</span
							>
							<span style="color:red">中间使用空格,位置必须严格一致,每条信息间使用回车换行</span>
						</div>-->
						<div>
							<span style="background:green;color:#fff;padding:5px 10px;margin-right:10px">收货人姓名 收货人电话 收货地址(或省,市,区,详细地址) 电商平台订单号（订单号不是必填）</span>
							<span style="color:red">中间使用空格,位置必须严格一致,每条信息间使用回车换行</span>
						</div>
						<div>录入实例1：张三 181XXXXXXXX 福建省厦门市思明区XX路XX号 15487544544444（订单号不是必填）</div>
						<div>录入实例2：张三 181XXXXXXXX 福建省，厦门市，思明区，XX路XX号 15487544544444（订单号不是必填）</div>
					</el-form-item>
					<el-form-item label="商品名称" style="width:80%" prop="goodsName" :rules="[{ required: true, message: '请输入商品名称', trigger: 'blur' }]">
						<el-input v-model="validatorForm.goodsName"></el-input>
					</el-form-item>
					<el-form-item label="手动录入单据信息" style="width:80%">
						<el-input type="textarea" v-model="textAreaValue" :rows="10"></el-input>
					</el-form-item>
					<el-form-item label="单据录入" style="width:80%">
						<el-button type="primary" @click="analysis">解析数据</el-button>
						<el-button type @click="resetForm">重置</el-button>
						<el-button type="primary" style="float: right;" :disabled="!setDefaultExpType.id || ExpTable.length == 0" @click="upEXP">
							共 {{ ExpTable.length }} 个信息，下单需使用 {{ ((setDefaultExpType.myMoney || 0) * (ExpTable.length || 0)).toFixed(2) }} 元，账户余额：{{ userInfo.bal }}，确认金额并下单
						</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="ExpTable">
					<!-- <el-table-column prop="goodsName" label="商品名称">
						<template slot-scope="prop">
							<el-input v-model="prop.row.goodsName"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="tid" label="订单号">
						<template slot-scope="prop">
							<el-input v-model="prop.row.tid"></el-input>
						</template>
					</el-table-column>

					<el-table-column prop="receiver" label="收货人姓名">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiver"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="receiverTel" label="收货人电话">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiverTel"></el-input>
						</template>
					</el-table-column>

					<el-table-column prop="receiveAddr" label="收货人地址">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiveAddr"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								size="small"
								type="text"
								@click.native.prevent="deleteRow(scope.$index, ExpTable)"
							>删除</el-button>
						</template>
					</el-table-column>-->
					<el-table-column prop="goodsName" label="商品名称" width="150">
						<template slot-scope="prop">
							<el-input v-model="prop.row.goodsName"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="tid" label="订单号" width="300">
						<template slot-scope="prop">
							<el-input v-model="prop.row.tid"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="sender" label="发货人姓名"></el-table-column>
					<el-table-column prop="senderTel" label="发货人电话"></el-table-column>
					<el-table-column prop="sendProv" label="发货省份"></el-table-column>
					<el-table-column prop="sendCity" label="发货城市"></el-table-column>
					<el-table-column prop="sendCounty" label="发货区（县）"></el-table-column>
					<el-table-column prop="sendAddr" label="发货人地址"></el-table-column>
					<el-table-column prop="senderPostid" label="发货邮编"></el-table-column>-->
					<el-table-column prop="receiver" label="收货人姓名" width="150">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiver"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="receiverTel" label="收货人电话" width="150">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiverTel"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="receiveProv" label="发货省份"></el-table-column> -->
					<!-- <el-table-column prop="receiveCity" label="发货城市"></el-table-column> -->
					<!-- <el-table-column prop="receiveCounty" label="发货区（县）"></el-table-column> -->
					<el-table-column prop="receiveAddr" label="收货人地址">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiveAddr"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click.native.prevent="deleteRow(scope.$index, ExpTable)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="Excel录入" name="first">
				<el-form label-width="150px">
					<!-- <el-form-item label="地址">
						{{ validatorForm.setNewAddress }}
					</el-form-item>-->
					<el-form-item label="快递类型">
						<el-radio-group v-model="separateSelected" @change="changeSeparate">
							<el-radio-button v-for="(it, ind) in separateExpByType" :key="ind" :label="it.map">{{ it.label }}</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>

				<el-form :model="validatorForm" ref="form2" class="cust-exp-type" :rules="rules2" label-width="150px">
					<el-form-item label="选择快递类型" prop="ExpTypeLabel" style="width:80%">
						<el-select v-model="validatorForm.ExpTypeLabel" style="width:100%" @change="changeSeparateLabel">
							<el-option v-for="(it, ind) in separate" :key="ind" :value="it.text">
								<div style="position: relative;">
									{{ it.text }}
									<span v-if="it.id == userInfo.def_express" class="select-default">默认</span>
									<el-button v-else type="text" class="select-default" @click="setDefault2Exp(it)">设为默认</el-button>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="Excel录入单据信息" style="width:80%">
						<el-button type="primary" @click="importEXL">Excel导入</el-button>
						<el-button type @click="resetForm">重置</el-button>
						<el-button type>
							<a style="color:#606266;text-decoration: none;" :href="templateUrl">Excel模板下载</a>
						</el-button>

						<el-button type="primary" style="float: right;" :disabled="!setDefaultExpType.id || ExpTable.length == 0" @click="upEXP">
							共 {{ ExpTable.length }} 个信息，下单需使用 {{ ((setDefaultExpType.myMoney || 0) * (ExpTable.length || 0)).toFixed(2) }} 元，账户余额：{{ userInfo.bal }}，确认金额并下单
						</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="ExpTable">
					<el-table-column prop="goodsName" label="商品名称" width="150">
						<template slot-scope="prop">
							<el-input v-model="prop.row.goodsName"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="tid" label="订单号" width="300">
						<template slot-scope="prop">
							<el-input v-model="prop.row.tid"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="sender" label="发货人姓名"></el-table-column>
					<el-table-column prop="senderTel" label="发货人电话"></el-table-column>
					<el-table-column prop="sendProv" label="发货省份"></el-table-column>
					<el-table-column prop="sendCity" label="发货城市"></el-table-column>
					<el-table-column prop="sendCounty" label="发货区（县）"></el-table-column>
					<el-table-column prop="sendAddr" label="发货人地址"></el-table-column>
					<el-table-column prop="senderPostid" label="发货邮编"></el-table-column>-->
					<el-table-column prop="receiver" label="收货人姓名" width="150">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiver"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="receiverTel" label="收货人电话" width="150">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiverTel"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="receiveProv" label="发货省份"></el-table-column> -->
					<!-- <el-table-column prop="receiveCity" label="发货城市"></el-table-column> -->
					<!-- <el-table-column prop="receiveCounty" label="发货区（县）"></el-table-column> -->
					<el-table-column prop="receiveAddr" label="收货人地址">
						<template slot-scope="prop">
							<el-input v-model="prop.row.receiveAddr"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click.native.prevent="deleteRow(scope.$index, ExpTable)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<common-dialogs :right-click="dialogButtonOptions.rightClick">
			<template slot="Excel导入">
				<div style="width:60%;">
					<el-form :inline="true">
						<el-form-item label="请选择EXL格式的文件">
							<el-input v-model="fileName"></el-input>
						</el-form-item>
						<el-form-item label>
							<el-upload
								:action="actionUrl"
								:on-change="fileChange"
								:auto-upload="false"
								ref="upload"
								:before-upload="handleUpload"
								:on-success="uploadSuccess"
								:on-error="uploadFailed"
								:show-file-list="false"
							>
								<el-button slot="trigger" type="primary" size="small">浏览</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label>
							<a v-if="!isIE()" style="margin-left: .5rem;margin-top: .5rem;float:left" type="text" download="模板.xlsx" :href="templateUrl">模板下载</a>
							<a v-else style="margin-left: .5rem;margin-top: .5rem;float:left" type="text" :href="templateUrl">模板下载</a>
						</el-form-item>
					</el-form>
				</div>
			</template>
			<template slot="Excel导出"></template>
		</common-dialogs>
		<el-dialog title="查看发货人信息" :visible="modifyStytus" @close="handleLeftClick">
			<div>
				<el-form :model="senderForm" ref="senderForm" :rules="senderRules" label-width="150px">
					<el-form-item prop="sender" label="发货人姓名">
						<el-input style="width:90%" v-model="senderForm.sender"></el-input>
					</el-form-item>
					<el-form-item prop="senderTel" label="发货人电话">
						<el-input style="width:90%" v-model="senderForm.senderTel"></el-input>
					</el-form-item>
					<el-form-item prop="sendAddr" label="设置发货省市区">
						<el-cascader :props="cascaderProps" style="width:90%" :options="options" v-model="senderForm.sendAddr"></el-cascader>
					</el-form-item>
					<el-form-item prop="sendAddress" label="详细地址">
						<el-input type="textarea" style="width:90%" v-model="senderForm.sendAddress"></el-input>
					</el-form-item>
					<!-- <el-form-item label="发货邮编">
						<el-input style="width:90%" v-model="senderForm.sendPostid"></el-input>
					</el-form-item>-->
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="handleLeftClick" class="footer-btn">关闭</el-button>
				<el-button size="medium" @click="setDefault" class="footer-btn" type="primary">设为默认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import area from 'static/area.js'
import mixin from 'static/mixins'
import CommonDialogs from './CommonDialogs.vue'

export default {
	components: {
		CommonDialogs
	},
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
		let checkReciveTID = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入电商平台订单号'))
			}

			callback()
		}
		return {
			activeName: 'second',
			textAreaValue: '',
			fileName: '',
			setDefaultExpType: {},
			actionUrl: this.$API.URL_EXCEL_UPLEAD,
			templateUrl: this.$API.URL_EXCEL_MODEL,
			dialogButtonOptions: {
				rightButtonType: 'primary',
				leftButtonType: 'default',
				rightClick: () => {}
			},
			isIE: () => {
				if (!!window.ActiveXObject || 'ActiveXObject' in window) {
					return true
				} else {
					return false
				}
			},
			normalHint: {
				text: '请选择DAT格式的文件',
				color: 'rgb(191,191,191)'
			},
			errorHint: {
				text: '文件格式错误',
				color: '#F56C6C'
			},
			// sendAddr

			// sender
			// senderTel
			// sendPostid
			// sendProv
			// sendCity
			// sendCounty
			// sendAddress

			// expressType
			// amt
			// goodsName

			// receiverAddress

			// tid
			// receiver
			// receiverTel
			// receiverPostid
			// receiveProv
			// receiveCity
			// receiveCounty
			// receiveAddr

			options: area.province,
			cascaderProps: {
				value: 'label'
			},
			senderForm: {
				sender: '',
				senderTel: '',
				sendAddr: [],
				sendAddress: '',
				sendPostid: ''
			},
			receiverForm: {
				tid: '',
				goodsName: '',
				receiver: '',
				receiverTel: '',
				receiveAddr: [],
				receiverAddress: '',
				receiverPostid: ''
			},
			senderRules: {
				sender: [{ required: true, message: '请输入发货人姓名', trigger: 'blur' }],
				senderTel: [{ validator: checkRecive, required: true, trigger: 'blur' }],
				sendAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
				sendAddr: [{ required: true, message: '请输入发货省市区', trigger: 'blur' }]
			},
			rules2: {
				ExpTypeLabel: [{ required: true, message: '请选择快递信息', trigger: 'blur' }],
				setSelectObj: [{ required: true, message: '请选择发货信息', trigger: 'blur' }]
			},
			receiverRules: {
				tid: [{ validator: checkReciveTID, required: true, trigger: 'blur' }],
				receiver: [{ required: true, message: '请输入收件人姓名', trigger: 'blur' }],
				receiverTel: [{ validator: checkRecive, required: true, trigger: 'blur' }],
				receiverAddress: [{ required: true, message: '请输入收件人省市区', trigger: 'blur' }],
				receiveAddr: [{ required: true, message: '请输入收件人详细地址', trigger: 'blur' }]
			},
			step: 1,
			tips: [],

			sendAddr: [], // 所有地址
			AddressBookSelect: {},
			isSelect: false,
			isDefault: false,
			validatorForm: {
				goodsName: '',
				setSelectObj: {},
				setNewAddress: '',
				ExpTypeID: '',
				ExpTypeLabel: '',
				reciveAddress: '',
				expressOrder: ''
			},
			form: {
				sendAddr: '',
				ExpTypeID: ''
			},
			expTypes: [],
			separateExpByType: [],
			separateSelected: '',
			ExpTable: [],
			modifyStytus: false
		}
	},

	mounted() {
		this.init()
		this.getDefaultData()
		this.getExpType()
	},
	computed: {
		separate() {
			return this.expTypes.filter(item => {
				if (this.separateSelected == 'all') return true
				else return item.corp == this.separateSelected
			})
		}
	},
	methods: {
		handleLeftClick() {
			this.modifyStytus = false
		},
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
		analysis() {
			this.$refs.form1.validate(res => {
				if (res) {
					let goodsName = this.validatorForm.goodsName
					let alalysisArr = this.textAreaValue
						.trim()
						.split('\n')
						.map(item =>
							item
								.replace(/(86-)|,|，/g, ' ')
								.replace(/\s+/g, ' ')
								.trim()
						)
						.filter(i => i)
					this.$log('alalysisArr', alalysisArr)
					alalysisArr.forEach(item => {
						// arr.splice(/!/^1[3456789]\d{9}$/.test(value)/)
						let phone = ''
						let arr = item.split(' ').filter(item => {
							if (/^1[3456789]\d{9}$/.test(item)) {
								phone = item
								return false
							}
							if (/^\d{6}$/.test(item)) return false
							return true
						})

						arr.splice(1, 0, phone)
						this.$log('arr', arr, phone)
						// 张三 ， ， 181XXXXXXXX  ，福建省，厦门市，思明区，XX路XX号 15487544544444
						// 张三  ， ，181XXXXXXXX 福建省，厦门市，思明区，XX路XX号 15487544544444
						// 张三  ，181XXXXXXXX ， 福建省，厦门市，思明区，XX路XX号 15487544544444
						// let [
						// 	goodsName,
						// 	// sender,
						// 	// senderTel,
						// 	// sendProv,
						// 	// sendCity,
						// 	// sendCounty,
						// 	// sendAddr,
						// 	// senderPostid,
						// 	receiver,
						// 	receiverTel,
						// 	receiveAddr,
						// 	tid = ''
						// 	// receiverPostid = ''
						// ] = arr
						let [
							// goodsName,
							// sender,
							// senderTel,
							// sendProv,
							// sendCity,
							// sendCounty,
							// sendAddr,
							// senderPostid,
							receiver,
							receiverTel,
							...last
							// receiverPostid = ''
						] = arr
						let tid = ''
						let receiveAddr = ''
						let length = last.length
						if (length) {
							if (length == 1) receiveAddr = last[0]
							else {
								if (last[length - 1].split('').every(it => it >= 0) && last[length - 1].length != 6) {
									tid = last[length - 1]
									receiveAddr = last.slice(0, -1).join('')
								} else {
									receiveAddr = last.join('')
								}
							}
							this.ExpTable.push({
								tid,
								goodsName,
								receiver,
								receiverTel,
								receiveAddr
								// receiverPostid
							})
						}
					})
					this.validatorForm.goodsName = ''
					this.textAreaValue = ''
				}
			})
		},
		resetForm() {
			this.validatorForm.goodsName = ''
			this.textAreaValue = ''
			this.ExpTable = []
		},
		fileChange(file) {
			this.fileName = file.name
		},
		//TODO
		handleUpload(file) {
			let isExcel = file.name.endsWith('.xls') || file.name.endsWith('.xlsx')
			if (!isExcel) {
				this.$message({
					type: 'error',
					message: '上传的文件格式错误,请上传xls/xlsx格式的文件'
				})
			}
			this.fileName = ''
			return isExcel
		},
		//TODO EXL导入
		importEXL() {
			this.fileName = ''
			this.dialogButtonOptions = {
				rightButtonType: 'default',
				leftButtonType: 'default',
				rightClick: this.importEXLApi
			}
			this.normalHint.text = '请选择EXL格式的文件'
			this.$showDialog({
				title: 'Excel导入',
				slotName: 'Excel导入'
			})
		},
		importEXLApi() {
			if (this.fileName == '') {
				this.$message({
					type: 'error',
					message: '请选择上传的文件'
				})
				return
			} else {
				this.$refs.upload.submit()
			}
		},

		uploadSuccess(res) {
			if (res.code == '00') {
				this.$log('uploadSuccess', res.data)
				this.ExpTable.push(...res.data)
			} else {
				this.$message.error(res.message)
			}
			// this.fileName = ''
		},
		uploadFailed() {
			this.$message({
				type: 'error',
				message: '上传失败'
			})
			this.fileName = ''
		},
		init() {
			this.tips = userRechargeTips
			this.separateExpByType = separateExpByType
			this.separateSelected = separateExpByType[0].map
		},

		getDefaultData() {
			this.$post(this.$API.URL_GET_USER_ADDRESS, {}, '').then(res => {
				this.sendAddr = res
				let f = this.sendAddr.filter(item => item['is_default'] == 1)
				// let f = []
				// if (this.userInfo.defaultAddr) f.push(this.userInfo.defaultAddr)
				if (f[0]) {
					this.validatorForm.setSelectObj = f[0]
					this.validatorForm.setNewAddress = `${f[0].name}/${f[0].prov}/${f[0].city}/${f[0].county}/${f[0].address}/${f[0].tel}/${f[0].postid}`
					this.handleSelect(f[0])
				}
			})
		},
		upEXP() {
			let check = this.ExpTable.filter(it => !(it.goodsName && it.receiverTel && it.receiver && it.receiveAddr))
			check.length && this.$message.error('表格中存在空数据，请检查！')
			!check.length &&
				this.$post(this.$API.URL_GET_USER_INFO, {}, '').then(res => {
					sessionStorage.setItem('INFO', JSON.stringify(res))
					this.userInfo = res

					let sel = this.validatorForm.setSelectObj
					this.$log('this.validatorForm.setSelectObj', this.validatorForm.setSelectObj)
					if (sel && sel.prov && sel.county && sel.address) {
						let { address, prov, city, county, name, tel, postid } = sel
						let expressType = this.setDefaultExpType['express_type']
						let amt = this.setDefaultExpType.myMoney
						let flag = this.ExpTable.filter(item => {
							this.$log(0, item)
							if (
								item.goodsName &&
								item.receiveAddr &&
								// item.receiveCity &&
								// item.receiveCounty &&
								// item.receiveProv &&
								item.receiver &&
								// item.receiverPostid &&
								item.receiverTel
								// item.sendAddr &&
								// item.sendCity &&
								// item.sendCounty &&
								// item.sendProv &&
								// item.sender &&
								// item.senderPostid &&
								// item.senderTel &&
								// item.tid
							) {
								return false
							} else return true
						})
						if (flag.length) return this.$message.error('请检查数据，每个字段都必须填写')
						let allBal = parseFloat(this.ExpTable.length * parseFloat(amt))
						if (res.bal - allBal >= 0) {
							let timeString = Date.now() + ''
							for (const [k, { tid, ...iterator }] of Object.entries(this.ExpTable)) {
								let params = {
									batch: timeString,
									idx: k - 0 + 1,
									...iterator,
									tid: tid || '',
									expressType,
									amt,
									cost: this.setDefaultExpType.cost,
									sender: name,
									senderTel: tel,
									sendProv: prov,
									sendCity: city,
									sendCounty: county,
									sendAddr: address
									// senderPostid: postid
								}

								this.$log('mutily post', params)

								this.$post(this.$API.URL_POST_userRecharge, params, '')
							}
							this.ExpTable = []
							this.$message.success('下单完成')
							this.INFO()
						} else {
							this.$message.error('账户余额不足')
						}
					} else {
						this.$message.error('请先选择发货信息')
					}
				})
			// let pro = []
			// this.ExpTable.map(item => {
			// 	return new Promise((res, rej) => {
			// 		this.$post(this.$API.URL_POST_userRecharge, item, '')
			// 		res()
			// 	})
			// })
			// Promise.all(pro).then(
			// 	res => {
			// 		this.$log('promiseAll', res)
			// 	},
			// 	err => {
			// 		this.$log(0, err)
			// 	}
			// )
		},
		setSendPack() {
			this.$refs.receiverForm.validate(valida => {
				if (valida) {
					if (this.userInfo.bal - this.setDefaultExpType.myMoney < 0) return this.$message.error('账户余额不足')
					// this.$log(0, this.validatorForm.setSelectObj, this.setDefaultExpType)
					// let { name, tel, address, postid, expressOrder } = this.validatorForm.setSelectObj
					// let [receiver, receiverTel, receiveAddr, receiverPostid] = this.validatorForm.reciveAddress.split(',')
					let [sendProv, sendCity, sendCounty] = this.senderForm.sendAddr
					// let [receiveProv, receiveCity, receiveCounty] = this.receiverForm.receiveAddr

					let params = {
						...this.senderForm,
						sendProv,
						sendCity,
						sendCounty,
						sendAddr: this.senderForm.sendAddress,
						sendrAddress: this.senderForm.sendAddress,
						expressType: this.setDefaultExpType.express_type,
						amt: this.setDefaultExpType.myMoney,
						...this.receiverForm,
						// receiveProv,
						// receiveCity,
						// receiveCounty,
						receiveAddr: this.receiverForm.receiveAddr.join('') + this.receiverForm.receiverAddress,
						receiverAddress: this.receiverForm.receiveAddr.join('') + this.receiverForm.receiverAddress
					}

					this.$log(0, params)
					this.$post(this.$API.URL_POST_userRecharge, params, '单号购买成功，修改收货地址可继续发包。').then(() => this.INFO())
					// this.validatorForm.expressOrder = this.validatorForm.reciveAddress = ''
					this.receiverForm = {
						tid: '',
						goodsName: '',
						receiver: '',
						receiverTel: '',
						receiveAddr: [],
						receiverAddress: '',
						receiverPostid: ''
					}
				}
			})
		},
		goBack(val) {
			this.step = val
		},
		changeSeparate(val) {
			if (!(val == 'all' || this.setDefaultExpType.corp == val)) {
				this.validatorForm.ExpTypeID = ''
				this.validatorForm.ExpTypeLabel = ''
				this.setDefaultExpType = {}
			}
		},
		changeSeparateLabel(val) {
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
				this.expTypes = res.map((item, itemIndex) => {
					let text = []
					// for (const it of separateExpByType.slice(0)) {
					// 	if (it.map == item.corp) text.push(it.label)
					// }
					// if (!text.length) text.push('未设置')
					// for (const [key, it] of Object.entries(lvMap)) {
					// 	text.push(it + ':' + (item[key] || '00') + '元')
					// }

					// let lv = this.userInfo['user_lv']
					// switch (this.userInfo['user_lv']) {
					// 	case 'normal':
					// 		lv = 'lv1'
					// 		break
					// 	case 'vip':
					// 		lv = 'vip'
					// 		break
					// 	case 'proxy':
					// 		lv = 'proxy'
					// 		break
					// 	default:
					// 		lv = 'lv1'
					// }
					// item.myMoney = item[lv] || 0
					// text.push('我的价格:' + (item[lv] || '00') + '元')
					let lv = ''
					let price = this.userInfo['price']
					switch (this.userInfo['user_lv']) {
						case 'normal':
							lv = 'lv1'
							break
						case 'vip':
							lv = 'vip'
							break
						case 'proxy':
							lv = 'proxy'
							break
						default:
							lv = 'lv1'
					}
					item.myMoney = price >= 0 ? price : item[lv]
					text.push(item['express_name'])
					text.push('我的价格:' + item.myMoney + '元/单')
					// text.push('库存:' + item.surplus + '件')
					this.$log('item', item)

					// this.$set(text, 0, text[0] + ` ${item['express_name']}`)
					item.text = text.join(' / ')
					// if (itemIndex == 0 && !this.userInfo['def_express']) {
					// 	this.validatorForm.ExpTypeID = item.id
					// 	this.validatorForm.ExpTypeLabel = item.text
					// 	this.setDefaultExpType = item
					// }
					if (item.id == this.userInfo['def_express']) {
						item.default = 1
						this.validatorForm.ExpTypeID = item.id
						this.validatorForm.ExpTypeLabel = item.text
						this.setDefaultExpType = item
					}

					return item
				})
				if (!this.validatorForm.ExpTypeID && this.expTypes.length) {
					let item = this.expTypes[0]
					this.validatorForm.ExpTypeID = item.id
					this.validatorForm.ExpTypeLabel = item.text
					this.setDefaultExpType = item
				}
			})
		},

		// setSendExp() {
		// 	this.$refs.form2.validate(validat => {
		// 		if (validat) {
		// 			if (this.setDefaultExpType.id == this.validatorForm.ExpTypeID) {
		// 				this.form.ExpTypeID = this.validatorForm.ExpTypeID
		// 				this.step = 3
		// 			} else {
		// 				this.$message.error('系统库存为0,无法提交')
		// 			}
		// 		}
		// 	})
		// },
		setDefaultExp(row) {
			if (row['default']) {
				this.$message.error('已是默认')
			} else {
				let params = {
					// expressType: row['express_type']
					id: row.id
				}
				this.$log(0, params, row)
				this.$post(this.$API.URL_SET_DEFAULT_EXPRESS, params, '设置成功').then(() => {
					this.INFO()
					this.getExpType()
				})
			}
		},
		setDefault2Exp(row) {
			this.$refs.form2.validate(validat => {
				if (validat) {
					if (row['default']) {
						this.$message.error('已是默认')
					} else {
						let params = {
							// expressType: row['express_type']
							id: row.id
						}
						this.$log(0, params, row)
						this.$post(this.$API.URL_SET_DEFAULT_EXPRESS, params, '设置成功').then(() => {
							this.INFO()
							this.getExpType()
						})
					}
				}
			})
		},
		setSendAddress() {
			// this.$refs.senderForm.validate(validat => {
			// 	if (validat) {
			// 		this.step = 2
			// 	}
			// })
			if (this.validatorForm.setSelectObj.id) this.step = 2
			else this.$message.error('请选择发货地址')
		},
		setDefault() {
			this.$refs.senderForm.validate(validat => {
				if (validat) {
					let [sendProv, sendCity, sendCounty] = this.senderForm.sendAddr
					if (
						this.validatorForm.setSelectObj.id == this.userInfo.defaultAddr.id &&
						this.senderForm.sender == this.userInfo.defaultAddr.name &&
						this.senderForm.senderTel == this.userInfo.defaultAddr.tel &&
						sendProv == this.userInfo.defaultAddr.prov &&
						sendCity == this.userInfo.defaultAddr.city &&
						sendCounty == this.userInfo.defaultAddr.county &&
						this.senderForm.sendAddress == this.userInfo.defaultAddr.address
						// this.senderForm.sendPostid == this.userInfo.defaultAddr.postid
					)
						return this.$message.error('已是默认')
					let params = {
						...this.senderForm,
						sendTel: this.senderForm.senderTel,
						sendProv,
						sendCity,
						sendCounty
					}

					this.$post(this.$API.URL_SET_DEFAULT_ADDRESS, params, '设置成功').then(() => {
						this.$post(this.$API.URL_GET_USER_INFO, {}, '').then(res => {
							sessionStorage.setItem('INFO', JSON.stringify(res))
							this.userInfo = res
							this.validatorForm.setSelectObj.id = res.defaultAddr.id
							// this.getDefaultData()
						})
					})
				}
			})

			// if (this.senderForm.sender && this.senderForm.senderTel && sendProv && sendCity && sendCounty && this.senderForm.sendAddress) {
			// } else return this.$message.error('请填写完整信息')

			// 	}
			// })
		},
		checkPass() {
			return !this.validatorForm.setNewAddress
		},
		clearText() {
			// this.$refs.senderForm.clearValidate()
			this.validatorForm.setNewAddress = ``
			this.validatorForm.setSelectObj = {}
			this.senderForm = {}
		},
		handleSelect(row) {
			this.validatorForm.setNewAddress = `${row.name}/${row.prov}/${row.city}/${row.county}/${row.address}/${row.tel}/${row.postid}`
			this.validatorForm.setSelectObj = row
			let { address, prov, city, county, name, tel, postid } = row
			this.senderForm = {
				sender: name,
				senderTel: tel,
				sendAddr: [prov, city, county],
				sendAddress: address
				// sendPostid: postid
			}
		},
		querySearch(queryString, cb) {
			cb(this.sendAddr)
		}
	}
}
</script>

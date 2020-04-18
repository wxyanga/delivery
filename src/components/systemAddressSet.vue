<template>
	<div>
		<el-form>
			<!-- <el-form-item label="默认发货信息：">
				{{ validatorForm.setNewAddress || '暂未设置默认发货信息' }}
			</el-form-item> -->
			<el-form-item label="">
				<el-button type="primary" @click="modifyStytus = true">新增发货人</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData">
			<el-table-column prop="is_default" label="是否默认">
				<template slot-scope="prop">{{ prop.row['is_default'] == 1 ? '默认' : '' }}</template>
			</el-table-column>
			<el-table-column prop="name" label="发货人姓名"></el-table-column>
			<el-table-column prop="tel" label="发货人电话"></el-table-column>
			<el-table-column prop="prov" label="发货省份"></el-table-column>
			<el-table-column prop="city" label="发货城市"></el-table-column>
			<el-table-column prop="county" label="发货区（县）"></el-table-column>
			<el-table-column prop="address" label="发货人地址"></el-table-column>
			<!-- <el-table-column prop="postid" label="发货邮编"></el-table-column> -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="small" type="" @click.native.prevent="deleteRow(scope.row.id, scope.$index, tableData)">删除</el-button>
					<el-button size="small" type="primary" v-if="scope.row['is_default'] != 1" @click.native.prevent="setDefault(scope.row)">设为默认</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="新增发货人" :visible="modifyStytus" @close="handleLeftClick">
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
				<el-button size="medium" @click="setDefault(null)" class="footer-btn" type="primary">新增并设为默认</el-button>
			</div>
		</el-dialog>
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
		let checkReciveTID = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入电商平台订单号'))
			}

			callback()
		}
		return {
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
			modifyStytus: false,
			tableData: []
		}
	},

	mounted() {
		this.getDefaultData()
	},
	methods: {
		handleLeftClick() {
			this.modifyStytus = false
			this.senderForm = {
				sender: '',
				senderTel: '',
				sendAddr: [],
				sendAddress: '',
				sendPostid: ''
			}
		},
		deleteRow(id, index, rows) {
			this.$post(this.$API.URL_DELETE_USER_ADDRESS, { id }, '删除成功').then(() => {
				rows.splice(index, 1)
			})
		},

		getDefaultData() {
			this.$post(this.$API.URL_GET_USER_ADDRESS, {}, '').then(res => {
				this.tableData = res
				let f = res.filter(item => item['is_default'] == 1)
				// let f = []
				// if (this.userInfo.defaultAddr) f.push(this.userInfo.defaultAddr)
				if (f[0]) {
					this.validatorForm.setSelectObj = f[0]
					this.validatorForm.setNewAddress = `${f[0].name}/${f[0].prov}/${f[0].city}/${f[0].county}/${f[0].address}/${f[0].tel}`
				}
			})
		},

		setDefault(row) {
			if (row) {
				let params = {
					sender: row.name,
					sendTel: row.tel,
					sendProv: row.prov,
					sendCity: row.city,
					sendCounty: row.county,
					sendAddress: row.address,
					sendPostid: ''
				}
				this.$post(this.$API.URL_SET_DEFAULT_ADDRESS, params, '设置成功').then(() => {
					this.getDefaultData()
				})
			} else
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
							this.handleLeftClick()
							this.getDefaultData()
						})
					}
				})
		}
	}
}
</script>

<template>
	<div>
		<el-form>
			<!-- <el-form-item label="默认发货信息：">
				{{ validatorForm.setNewAddress || '暂未设置默认发货信息' }}
			</el-form-item> -->
			<el-form-item label="">
				<el-button type="primary" @click="addPublic">新增公告</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData">
			<el-table-column type="index" label="#" width="80px"></el-table-column>
			<el-table-column prop="content" label="公告内容"></el-table-column>
			<el-table-column label="操作" width="150px">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="setDefault(scope.row)">编辑</el-button>
					<el-button size="small" type="" @click="deleteRow(scope.row.id, scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<common-dialogs :right-click="dialogConfirm" :left-click="closedDialog" :closed-dialog="closedDialog" class="cust-Dialog-01">
			<template slot="add">
				<el-form style="width:80%" :model="form" ref="form" :rules="rules" label-width="130px">
					<el-form-item label="公告内容：" prop="content">
						<el-input type="textarea" show-word-limit maxlength="60" v-model="form.content"></el-input>
					</el-form-item>
				</el-form>
			</template>
			<template slot="modify">
				<el-form style="width:80%" :model="form" ref="form" :rules="rules" label-width="130px">
					<el-form-item label="公告内容：" prop="content">
						<el-input type="textarea" show-word-limit maxlength="60" v-model="form.content"></el-input>
					</el-form-item>
				</el-form>
			</template>
			<template slot="delete">
				<div>确认删除该公告吗？</div>
			</template>
		</common-dialogs>
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
			rules: {
				content: [{ required: true, message: '公告内容必填', trigger: 'blur' }]
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
				content: ''
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
		// URL_KF_PUBLIC_LIST: getBaseUrl + '/kf/notice/list/', // 公告列表
		// URL_KF_ADD_PUBLIC: getBaseUrl + '/kf/notice/add/', // 新增公告
		// URL_KF_MODIFY_PUBLIC: getBaseUrl + '/kf/notice/update/', // 修改公告
		// URL_KF_DELETE_PUBLIC: getBaseUrl + '/kf/notice/delete/', // 删除公告
		this.getDefaultData()
	},
	methods: {
		addPublic() {
			this.form = {
				content: ''
			}
			this.$showDialog({ title: '新增公告', slotName: 'add' })
		},
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
			this.$post(this.$API.URL_KF_DELETE_PUBLIC, { id }, '删除成功').then(() => {
				rows.splice(index, 1)
				this.$bus.$emit('changePublic')
			})
		},

		getDefaultData() {
			this.$post(this.$API.URL_KF_PUBLIC_LIST, {}, '').then(res => {
				this.tableData = res
			})
		},

		setDefault(row) {
			this.form = {
				id: row.id,
				content: row.content
			}
			this.$showDialog({ title: '修改公告', slotName: 'modify' })
		},
		dialogConfirm() {
			let slotName = this.$store.state.dialogOptions.slotName
			if (slotName == 'add') {
				this.$post(this.$API.URL_KF_ADD_PUBLIC, this.form, '新增成功').then(() => {
					this.getDefaultData()
					this.$bus.$emit('changePublic')
				})
			} else if (slotName == 'modify') {
				this.$post(this.$API.URL_KF_MODIFY_PUBLIC, this.form, '修改成功').then(() => {
					this.getDefaultData()
					this.$bus.$emit('changePublic')
				})
			}
		},
		closedDialog() {}
	}
}
</script>

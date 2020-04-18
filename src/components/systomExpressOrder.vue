<template>
	<div>
		<div style="margin-bottom:20px">
			<el-radio-group v-model="separateSelected" @change="changeSeparate">
				<el-radio-button v-for="(it, ind) in separateExpByType" :key="ind" :label="it.map">{{ it.label }}</el-radio-button>
			</el-radio-group>
			<el-button style="margin-left:10px" type="primary" @click="addSyltomMoney">新增公司</el-button>
			<!-- <el-button type="primary" @click="importEXL">Excel导入</el-button> -->
		</div>
		<div>
			<el-table :data="tableData">
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="corp_name" label="用途"></el-table-column>
				<el-table-column prop="express_name" label="公司名称"></el-table-column>
				<!-- <el-table-column prop="surplus" label="库存"></el-table-column> -->
				<template v-for="[key, value] in Object.entries(lvMap)">
					<el-table-column width="150px" :key="key" :prop="key" :label="value">
						<template slot-scope="prop">{{ prop.row[key] }}</template>
					</el-table-column>
				</template>
				<el-table-column label="操作">
					<template slot-scope="prop">
						<el-button @click="putSyltomMoney(prop.row)">修改</el-button>
						<!-- <el-button @click="addOrderSyltomMoney(prop.row)">添加面单</el-button> -->
						<el-button @click="delSyltomMoney(prop.row)">删除快递</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:total="total"
				:page-size="pageSize"
				:page-sizes="pageSizes"
				:current-page="pageNum"
				layout="total, prev, pager, next"
			>
			</el-pagination>-->
		</div>
		<common-dialogs
			:right-click="dialogConfirm"
			:isCenter="$store.state.dialogOptions.slotName == 'addOrder'"
			:left-click="closedDialog"
			:center-click="continueAdd"
			:centerButtonText="'继续添加'"
			:closed-dialog="closedDialog"
			class="cust-Dialog-01"
		>
			<template slot="add">
				<el-form :model="form" ref="form" :rules="rules" label-width="130px">
					<el-form-item prop="map" label="分类用途：">
						<el-select v-model="form.type" @change="changeType">
							<el-option v-for="(it, ind) in separateExpByType.filter(it => it.map != 'all')" :key="ind" :value="it.map" :label="it.label"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="label" label="公司名称：">
						<el-select v-model="form.comp" @change="changeComp" v-if="expTypesCode">
							<el-option v-for="(it, ind) in expTypesCode.filter(it => !it.codeGroup)" :key="ind" :value="it.codeValue" :label="it.codeName"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-for="[key, value] in Object.entries(lvMap)" :key="key" :label="value + '价格'" :prop="key">
						<el-input-number :controls="false" v-model="form[key]"></el-input-number>
					</el-form-item>
				</el-form>
			</template>
			<template slot="addOrder">
				<el-form :inline="true" :model="addForm" ref="addForm" label-width="150px">
					<el-form-item prop="surplus" label="面单数量1：">{{ form.surplus || 0 }}</el-form-item>
					<el-row v-for="(it, id) in addForm.addOrder" :key="id">
						<el-form-item :prop="it.start" :key="'start' + id" label="连续面单号开始：" :rules="[{ required: true, message: '连续面单号开始', trigger: 'blur' }]">
							<el-input v-model="it.start"></el-input>
						</el-form-item>
						<el-form-item :prop="it.stop" :key="'stop' + id" label="连续面单号结束：" :rules="[{ required: true, message: '连续面单号结束', trigger: 'blur' }]">
							<el-input v-model="it.stop"></el-input>
						</el-form-item>
					</el-row>
				</el-form>
			</template>
			<template slot="del">
				<div>确认删除 {{ deleteRow['express_name'] }} 吗？</div>
			</template>
		</common-dialogs>
		<!--点击删除按钮,弹出删除对话框-->
		<!-- <common-dialogs :right-click="dialogButtonOptions.rightClick" :right-button-type="dialogButtonOptions.rightButtonType" :left-button-type="dialogButtonOptions.leftButtonType"> -->
		<!-- <common-dialogs :right-click="dialogButtonOptions.rightClick">
			<template slot="Excel导入">
				<div style="width:60%;">
					<el-form :inline="true">
						<el-form-item label="请选择EXL格式的文件"><el-input v-model="fileName"></el-input></el-form-item>
						<el-form-item label=""
							><el-upload
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
						<el-form-item label="">
							<a v-if="!isIE()" style="margin-left: .5rem;margin-top: .5rem;float:left" type="text" download="模板" :href="templateUrl">模板下载</a>
							<a v-else style="margin-left: .5rem;margin-top: .5rem;float:left" type="text" :href="templateUrl">模板下载</a></el-form-item
						>
					</el-form>
				</div>
			</template>
			<template slot="Excel导出">
				<i class="el-icon-warning dialog-delete-message">系统将导出车辆信息数据，请确定是否导出？</i>
			</template>
		</common-dialogs>-->
	</div>
</template>

<script>
import mixin from 'static/mixins.js'
import CommonDialogs from './CommonDialogs.vue'

export default {
	components: {
		CommonDialogs
	},
	mixins: [mixin.pagination],
	data() {
		return {
			actionUrl: this.$API.URL_EXCEL_UPLEAD,
			templateUrl: this.$API.URL_EXCEL_MODEL,
			form: {
				id: '',
				type: '',
				cost: '',
				comp: '',
				label: '',
				codeName: '',
				isNew: false
			},
			addForm: {
				addOrder: []
			},
			lvMap: {},
			rules: {
				type: [{ required: true, message: '用途必填', trigger: 'change' }],
				comp: [{ required: true, message: '公司名称必填', trigger: 'blur' }]
			},
			separateSelected: '',
			separateExpByType: [],
			dialogButtonOptions: {
				rightButtonType: 'primary',
				leftButtonType: 'default',
				rightClick: 'default'
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
			fileName: '',
			expTypesCode: '',
			deleteRow: ''
		}
	},
	// beforeCreate() {
	// 	this.getExpType()
	// },
	mounted() {
		this.init()
		this.getExpCodeType()
		this.getExpType()
	},
	computed: {},
	methods: {
		init() {
			this.lvMap = lvMaps
			this.separateExpByType = separateExpByType
			this.separateSelected = this.separateExpByType[0].map
			for (const [key, value] of Object.entries(this.lvMap)) {
				this.rules[key] = [
					{ required: true, message: `${value}必填`, trigger: 'blur' },
					{ type: 'number', message: '金额必须是数字', trigger: 'blur' }
				]
				this.form[key] = ''
			}
		},
		changeType(row) {
			this.form.label = this.separateExpByType.filter(it => it.map == row)[0].label
		},
		changeComp(row) {
			this.form.codeName = this.expTypesCode.filter(it => it.codeValue == row)[0].codeName
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
			if (res.resultCode == '00') {
				this.$message({
					type: 'success',
					message: '上传成功'
				})
			} else {
				this.$message.error(res.resultMsg)
			}
			this.fileName = ''
		},
		uploadFailed() {
			this.$message({
				type: 'error',
				message: '上传失败'
			})
			this.fileName = ''
		},

		getTableData(val) {
			if (val == this.separateExpByType[0].map) this.tableData = this.expTypes
			else this.tableData = this.expTypes.filter(item => item.corp == val)
		},
		getExpCodeType() {
			this.$post(this.$API.URL_GET_EXPRESS_ORDER, {}, '').then(res => {
				this.expTypesCode = res['express_type']
			})
		},
		getExpType() {
			// let params = {}

			this.$post(this.$API.URL_EXCEL_EXPRESS_LIST, {}, '').then(res => {
				this.expTypes = res
				this.getTableData(this.separateExpByType[0].map)
			})
		},
		changeSeparate(val) {
			this.getTableData(val)
		},
		addSyltomMoney() {
			this.form = {
				id: '',
				type: '',
				comp: '',
				label: '',
				codeName: '',
				lv1: 2,
				lv2: '',
				lv3: '',
				cost: 1,
				isNew: true
			}
			this.$showDialog({ title: '新增公司面单', slotName: 'add' })
		},
		delSyltomMoney(row) {
			this.deleteRow = row

			this.$showDialog({ title: '删除公司面单', slotName: 'del' })
		},
		putSyltomMoney(row) {
			this.form = {
				id: row.id,
				type: row.corp,
				label: row.corp_name,
				comp: row.express_type,
				codeName: row.express_name,
				lv1: row.lv1,
				lv2: row.lv2,
				lv3: row.lv3,
				cost: row.cost,
				isNew: false
			}
			this.$log(0, this.form, row)
			this.$showDialog({ title: '修改公司面单', slotName: 'add' })
		},
		addOrderSyltomMoney(row) {
			this.form = row
			this.addForm.addOrder = [{ start: '', stop: '' }]
			this.$showDialog({ title: '添加面单', slotName: 'addOrder' })
		},
		continueAdd() {
			this.addForm.addOrder.push({ start: '', stop: '' })
		},
		dialogConfirm() {
			let slotName = this.$store.state.dialogOptions.slotName

			if (slotName == 'add') {
				let params = {
					id: this.form.id,
					corp: this.form.type,
					corpName: this.form.label,
					expressType: this.form.comp,
					expressName: this.form.codeName,
					lv1: this.form.lv1,
					lv2: this.form.lv2 || 0,
					lv3: this.form.lv3 || 0,
					cost: this.form.cost
				}
				let msg = ''
				if (this.form.isNew) {
					msg = '新增成功'
				} else {
					msg = '修改成功'
				}
				this.$post(this.$API.URL_EXCEL_COMP_MODIFY, params, msg).then(() => {
					this.getExpType()
				})
			} else if (slotName == 'addOrder') {
				// let params = {}
				// this.$post(this.$API.URL_ADD_EXPRESS_ORDER_NUM,params,'').then()
			} else if (slotName == 'del') {
				let params = {
					id: this.deleteRow.id
				}
				this.$post(this.$API.URL_EXCEL_COMP_DELETE, params, '删除成功').then(() => this.getExpType())
			}
			this.separateSelected = this.separateExpByType[0].map
		},
		closedDialog() {}
	}
}
</script>

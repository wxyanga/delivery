<template>
	<div>
		<el-tag :key="tag.label" v-for="tag in dynamicTags" closable :disable-transitions="false" @click="modifyComp(tag)" @close="handleClose(tag)">
			{{ tag.label }}
		</el-tag>
		<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"> </el-input>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">添加公司</el-button>
		<common-dialogs :right-click="dialogConfirm" :left-click="closedDialog" :closed-dialog="closedDialog">
			<template slot="modify">
				<el-form :inline="true" :model="form" ref="form" :rules="rules">
					<el-form-item prop="label" label="用途名称：">
						<el-input v-model="form.label"></el-input>
					</el-form-item>
				</el-form>
			</template>
		</common-dialogs>
		<!-- import CommonDialogs from './CommonDialogs.vue' -->
		<!-- components: { CommonDialogs }, -->
		<!-- dialogConfirm() {
			let slotName = this.$store.state.dialogOptions.slotName
			if (false) {
				if (slotName == 'add') {
					// let params = {}
					// this.$post(this.$API.URL_SYSTOM_ADD_MONEY,params,'').then()
				}
				if (slotName == 'modify') {
					// let params = {}
					// this.$post(this.$API.URL_SYSTOM_PUT_MONEY,params,'').then()
				}
				if (slotName == 'del') {
					// let params = {}
					// this.$post(this.$API.URL_SYSTOM_DEL_MONEY,params,'').then()
				}
			}
		},
		closedDialog() {} -->
	</div>
</template>

<script>
import mock from 'mock/mockData'
import CommonDialogs from './CommonDialogs.vue'

export default {
	components: { CommonDialogs },
	data() {
		return {
			form: {},
			dynamicTags: [],
			inputVisible: false,
			inputValue: '',
			rules: {
				label: [{ required: true, message: '名称必填', trigger: 'blur' }]
			}
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		getTableData() {
			// let params = {}
			this.$post(this.$API.URL_GET_EXPRESS_ORDER, {}, '').then()
			this.dynamicTags = mock.ExpTypes.separateExpByType
		},
		handleClose(tag) {
			// let params = {}
			// this.$post(this.$API.URL_DEL_EXPRESS_TYPES,params,'').then()
			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
		},

		showInput() {
			this.inputVisible = true
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus()
			})
		},

		handleInputConfirm() {
			let inputValue = this.inputValue
			if (inputValue) {
				// let params = {}
				// this.$post(this.$API.URL_ADD_EXPRESS_TYPES,params,'').then()
				this.dynamicTags.push(inputValue)
			}
			this.inputVisible = false
			this.inputValue = ''
		},
		modifyComp(row) {
			this.form = row
			this.$showDialog({ title: '修改面单用途', slotName: 'modify' })
		},
		dialogConfirm() {
			// let params = {}
			// this.$post(this.$API.URL_PUT_EXPRESS_TYPES,params,'').then()
		},
		closedDialog() {}
	}
}
</script>
<style>
.el-tag {
	margin: 10px;
}
.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 200px;
	margin: 10px;
	vertical-align: bottom;
}
</style>

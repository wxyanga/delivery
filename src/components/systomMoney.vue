<template>
	<div>
		<el-button @click="addSyltomMoney">添加金额</el-button>
		<el-table :data="tableData">
			<el-table-column type="index" width="50"> </el-table-column>
			<el-table-column label="充值金额" prop="money"> </el-table-column>
			<el-table-column label="充值二维码">
				<template slot-scope="prop">
					<img :src="prop.row.img" class="avatar-img" />
				</template>
			</el-table-column>
			<el-table-column label="更新时间" prop="update"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="prop">
					<el-button @click="putSyltomMoney(prop.row)">修改</el-button>
					<el-button @click="delSyltomMoney(prop.row)">删除金额</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			background
			:total="total"
			:page-size="pageSize"
			:page-sizes="pageSizes"
			:current-page="pageNum"
			layout="total,  prev, pager, next"
		>
		</el-pagination>
		<common-dialogs :right-click="dialogConfirm" :left-click="closedDialog" :closed-dialog="closedDialog">
			<template slot="add">
				<el-form :model="form" ref="form" :rules="rules">
					<el-form-item prop="money" label="充值金额：">
						<el-input-number :controls="false" v-model="form.money"></el-input-number>
					</el-form-item>
					<el-form-item prop="img" label="充值二维码:">
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="() => handleAvatarSuccess(prop.row)"
							:before-upload="beforeAvatarUpload"
						>
							<img v-if="form.img" :src="imageUrl" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
			</template>
			<template slot="modify">
				<el-form :model="form" ref="form" :rules="rules">
					<el-form-item prop="money" label="充值金额：">
						<el-input-number :controls="false" v-model="form.money"></el-input-number>
					</el-form-item>
					<el-form-item prop="img" label="充值二维码:">
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="() => handleAvatarSuccess(prop.row)"
							:before-upload="beforeAvatarUpload"
						>
							<img v-if="form.img" :src="imageUrl" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
			</template>
			<template slot="del"> 确定要删除充值金额为{{ form.money }}的记录吗？ </template>
			<template slot="showQR">
				<img v-if="form.img" :src="imageUrl" class="avatar" />
			</template>
		</common-dialogs>
	</div>
</template>

<script>
import mixin from 'static/mixins.js'
import mock from 'mock/mockData'
import CommonDialogs from './CommonDialogs.vue'
export default {
	components: {
		CommonDialogs
	},
	mixins: [mixin.pagination],
	data() {
		return {
			form: {
				money: '',
				img: ''
			},
			rules: {
				money: [{ required: true, message: '金额必填', trigger: 'blur' }],
				img: [{ required: true, message: '二维码必传', trigger: 'change' }]
			},
			imageUrl: '',
			actionURl: this.$API.URL_UPLOAD_FILES,
			moneyType: moneyType
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		callback() {
			this.getTableData()
		},
		getTableData() {
			// let params = {}
			// this.$post(this.$API.URL_GET_MONEY_DETAIL,params,'').then()
			this.tableData = mock.buyExpress
			this.total = 200
			this.pageSize = 10
		},

		handleAvatarSuccess(res, file, row) {
			this.imageUrl = URL.createObjectURL(file.raw)
			row.img = ''
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
			if (!isLt2M) this.$message.error('上传图片大小不能超过 2MB!')
			return isJPG && isLt2M
		},
		addSyltomMoney() {
			this.form = {
				money: '',
				img: ''
			}
			this.$showDialog({ title: '添加金额', slotName: 'add' })
		},
		delSyltomMoney(row) {
			this.form = row

			this.$showDialog({ title: '删除金额', slotName: 'del' })
		},
		putSyltomMoney(row) {
			this.form = row
			this.$showDialog({ title: '修改金额', slotName: 'modify' })
		},
		dialogConfirm() {
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
		closedDialog() {}
	}
}
</script>
<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.avatar-img {
	width: 40px;
	height: 40px;
	display: block;
}
</style>

<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<el-form-item label="用户名：">
				<el-input v-model="form.userId" placeholder="输入用户名"></el-input>
			</el-form-item>
			<!-- <el-form-item label="VIP类型：">
				<el-select v-model="form.type">
					<el-option v-for="(item, index) in lvMap" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item> -->
			<!-- <el-form-item label="注册时间：">
				<el-date-picker
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
					v-model="form.times"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</el-form-item> -->
			<!-- <el-form-item label="充值范围：">
				<el-input style="width:100px" v-model="form.min" :controls="false" placeholder="最小金额"></el-input>
				<span style="margin:0 5px">至</span>
				<el-input style="width:100px" v-model="form.max" :controls="false" placeholder="最大金额"></el-input>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
				<el-button type="primary" @click="lookHistory(form.userId)">查看修改历史</el-button>
			</el-form-item>
			<el-form-item>
				<!-- <el-button type="primary" @click="addVipType">添加VIP类型</el-button> -->
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData">
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<el-table-column label="用户名" prop="user_id"></el-table-column>
			<el-table-column label="会员级别" prop="user_type">
				<template slot-scope="prop">
					{{ lvMap.filter(item => item.value == prop.row['user_type'])[0].label }}
				</template>
			</el-table-column>
			<el-table-column label="账户余额" prop="bal"> </el-table-column>
			<el-table-column label="QQ号码" prop="qq"></el-table-column>
			<el-table-column label="E-mail" prop="email"></el-table-column>
			<el-table-column label="创建时间" prop="create_date"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="prop">
					<el-button @click="changeVIPType(prop.row)">编辑</el-button>
					<el-button @click="lookHistory(prop.row['user_id'])">查看修改历史</el-button>
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
		<common-dialogs
			:right-click="dialogConfirm"
			:left-click="closedDialog"
			:closed-dialog="closedDialog"
			class="cust-Dialog-01"
			:isCenter="true"
			:center-click="continueAdd"
			:center-button-type="'danger'"
			:centerButtonText="'重置密码'"
		>
			<template slot="add">
				<el-form :model="handleForm" ref="handleForm" label-width="100px">
					<el-form-item label="VIP类型：">
						<el-input v-model="handleForm.label"></el-input>
					</el-form-item>
					<el-form-item label="默认金额：">
						<el-input-number :controls="false" v-model="handleForm.defaultMoney"></el-input-number>
					</el-form-item>
				</el-form>
			</template>
			<template slot="history">
				<el-table :data="historyData">
					<el-table-column type="index" label="#"></el-table-column>
					<el-table-column label="修改内容" prop="update_col"></el-table-column>
					<el-table-column label="修改前" prop="before_update"></el-table-column>
					<el-table-column label="修改后" prop="after_update"></el-table-column>
					<el-table-column label="修改人" prop="kf_user_id"></el-table-column>
					<el-table-column label="修改时间" prop="update_date"></el-table-column>
				</el-table>
			</template>
			<template slot="modify">
				<el-form :model="handleForm" ref="handleForm" label-width="150px">
					<el-form-item label="用户名：">{{ handleForm['user_id'] }}</el-form-item>
					<!-- <el-form-item label="会员类型：">
						<div v-if="ModifyType">
							<el-select v-model="uploadForm.userType">
								<el-option v-for="(item, index) in lvMap" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
						<div v-else>
							<span v-if="handleForm['user_type']">{{ lvMap.filter(item => item.value == handleForm['user_type'])[0].label }}</span>
							<el-button type="text" style="margin-left:30px" @click="cType">编辑</el-button>
						</div>
					</el-form-item> -->
					<el-form-item label="账户余额：">
						<div v-if="ModifyMoney">
							<el-input-number :controls="false" v-model="uploadForm.bal"></el-input-number>
						</div>
						<div v-else>
							<span>{{ handleForm['bal'] }}</span>
							<el-button type="text" style="margin-left:30px" @click="cMoney">编辑</el-button>
						</div>
					</el-form-item>
					<el-form-item label="会员价：">
						<div v-if="ModifyType">
							<el-input-number :controls="false" v-model="uploadForm.price"></el-input-number>
							<span style="margin-left:10px;color:red">负数表示使用快递设定的价格</span>
						</div>
						<div v-else>
							<span>{{ handleForm['price'] }}</span>
							<el-button type="text" style="margin-left:30px" @click="cType">编辑</el-button>
							<span style="margin-left:10px;color:red">负数表示使用快递设定的价格</span>
						</div>
					</el-form-item>
					<!-- <el-form-item label="注册QQ：">{{ handleForm['qq'] }}</el-form-item>
					<el-form-item label="注册Email：">{{ handleForm['email'] }}</el-form-item> -->
					<el-form-item label="注册QQ：">
						<div v-if="modifyQQ">
							<el-input v-model="uploadForm.qq"></el-input>
						</div>
						<div v-else>
							<span>{{ handleForm['qq'] }}</span>
							<el-button type="text" style="margin-left:30px" @click="cQQ">编辑</el-button>
						</div>
					</el-form-item>
					<el-form-item label="注册Email：">
						<div v-if="modifyEmail">
							<el-input v-model="uploadForm.email"></el-input>
						</div>
						<div v-else>
							<span>{{ handleForm['email'] }}</span>
							<el-button type="text" style="margin-left:30px" @click="cEmail">编辑</el-button>
						</div>
					</el-form-item>
					<el-form-item label="注册时间：">{{ handleForm['create_date'] }}</el-form-item>
				</el-form>
			</template>
		</common-dialogs>
		<el-dialog title="密码重置成功" :visible="modifyStytus" @close="closeDialogModify">
			<div>
				<el-form :model="handleForm" ref="handleForm" label-width="150px">
					<el-form-item label="用户新密码：">{{ modifyNewPass }}</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<el-dialog title="修改历史" class="changeWidth" :visible="historyStytus" @close="closeDialoghistory">
			<el-table :data="historyData" height="600">
				<el-table-column label="用户" prop="user_id"></el-table-column>
				<el-table-column label="修改内容" prop="update_col"></el-table-column>
				<el-table-column label="修改前" prop="before_update"></el-table-column>
				<el-table-column label="修改后" prop="after_update"></el-table-column>
				<el-table-column label="修改人" prop="kf_user_id"></el-table-column>
				<el-table-column label="修改时间" prop="update_date"></el-table-column>
			</el-table>
		</el-dialog>
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
				userId: '',
				type: '',
				times: ['', ''],
				min: '',
				max: ''
			},
			uploadForm: {
				bal: 0,
				price: 0,
				qq: '',
				email: ''
				// userType: ''
			},
			historyData: [],
			historyStytus: false,
			ModifyMoney: false,
			ModifyVip: false,
			ModifyType: false,
			modifyStytus: false,
			modifyQQ: false,
			modifyEmail: false,
			modifyNewPass: '',
			handleForm: {},
			lvMap: []
		}
	},
	mounted() {
		this.getVIPType()
		this.getTableData()
	},
	methods: {
		callback() {
			this.getTableData(null, true)
		},
		cMoney() {
			this.uploadForm.bal = this.handleForm['bal']
			this.ModifyMoney = true
		},
		cVip() {
			this.uploadForm.bal = this.handleForm['bal']
			this.ModifyVip = true
		},
		cType() {
			this.uploadForm.price = this.handleForm['price']
			this.ModifyType = true
		},
		cQQ() {
			this.uploadForm.qq = this.handleForm['qq']
			this.modifyQQ = true
		},
		cEmail() {
			this.uploadForm.email = this.handleForm['email']
			this.modifyEmail = true
		},
		getVIPType() {
			// let params = {}
			// this.$post(this.$API.URL_GET_VIP_TYPE,params,'').then()
			this.lvMap = userLv
		},
		lookHistory(id) {
			this.historyData = []
			let params = { userId: id }
			this.$post(this.$API.URL_KF_UPDATE_HISTORY, params, '').then(res => {
				this.historyData = res
				// this.$showDialog({ title: '修改历史', slotName: 'history' })
				this.historyStytus = true
			})
		},
		getTableData(e, callback) {
			!callback && (this.pageNum = 1)
			let params = {
				userId: this.form.userId,
				pageSize: this.pageSize,
				page: this.pageNum
			}
			this.$post(this.$API.URL_KF_FIND_USER, params, '').then(res => {
				this.tableData = res.data
				this.pageNum = res.pageNum
				this.total = res.total
			})
		},
		addVipType() {
			this.handleForm = {
				label: '',
				lv: '',
				defaultMoney: ''
			}
			this.$showDialog({ title: '添加会员类型', slotName: 'add' })
		},
		changeVIPType(row) {
			this.handleForm = row
			this.$showDialog({ title: '会员编辑', slotName: 'modify' })
		},
		dialogConfirm() {
			let params = {
				userId: this.handleForm['user_id']
				// ...this.uploadForm
			}
			if (this.ModifyMoney && this.uploadForm.bal >= 0) params.bal = this.uploadForm.bal
			// if (this.uploadForm.userType) params.userType = this.uploadForm.userType
			if (this.ModifyType && this.uploadForm.price != '') params.price = this.uploadForm.price
			if (this.modifyQQ && this.uploadForm.qq != '') params.qq = this.uploadForm.qq
			if (this.modifyEmail && this.uploadForm.email != '') params.email = this.uploadForm.email
			this.$post(this.$API.URL_KF_UPLOAD_USER, params, '会员信息修改成功').then(res => {
				this.uploadForm = {
					bal: 0,
					price: 0,
					qq: '',
					email: ''
				}
				this.ModifyMoney = false
				this.ModifyType = false
				this.ModifyVip = false
				this.modifyQQ = false
				this.modifyEmail = false

				this.getTableData()
			})
		},
		closedDialog() {
			this.ModifyMoney = false
			this.ModifyType = false
			this.ModifyVip = false
			this.modifyQQ = false
			this.modifyEmail = false
		},

		continueAdd() {
			this.$post(this.$API.URL_SYSTOEM_RESET_PASSWORD, { userId: this.handleForm['user_id'] }, '').then(res => {
				this.modifyNewPass = res['new_password']
				this.modifyStytus = true
			})
		},
		closeDialogModify() {
			this.modifyNewPass = ''
			this.modifyStytus = false
		},
		closeDialoghistory() {
			this.historyStytus = false
		}
	}
}
</script>
<style>
.changeWidth .el-dialog {
	width: 80%;
}
</style>

<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<el-form-item label="注册时间：">
				<el-date-picker
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
					v-model="form.times"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="用户手机号：">
				<el-input v-model="form.userId" placeholder="输入用户手机号"></el-input>
			</el-form-item>
			<el-form-item label="用户QQ：">
				<el-input v-model="form.qq" placeholder="输入用户QQ"></el-input>
			</el-form-item>
			<el-form-item label="用户E-mail：">
				<el-input v-model="form.email" placeholder="输入用户E-mail"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData" :default-sort="{ prop: 'signDate', order: 'ascending' }">
			<el-table-column type="index" label="#"></el-table-column>
			<!-- 
cnt: "000000"
diff_cnt: "000000"
income: "000000"
diff_income: "000000"
month_cnt: "000000"
month_income: "000000"
yesterday_cnt: "000000"
			yesterday_income: "000000"-->
			<el-table-column label="用户名" prop="userId"></el-table-column>
			<el-table-column label="QQ号码" prop="qq"></el-table-column>
			<el-table-column label="E-mail" width="200px" prop="email"></el-table-column>
			<el-table-column label="余额" sortable prop="bal"></el-table-column>

			<el-table-column sortable prop="month_cnt" label="本月单量"></el-table-column>
			<el-table-column sortable prop="month_income" label="本月收入"></el-table-column>

			<el-table-column sortable prop="yesterday_cnt" label="昨日单量"></el-table-column>
			<el-table-column sortable prop="cnt" label="今日单量"></el-table-column>
			<el-table-column sortable prop="diff_cnt" label="2日单差"></el-table-column>

			<el-table-column sortable prop="yesterday_income" label="昨日收入"></el-table-column>
			<el-table-column sortable prop="income" label="今日收入"></el-table-column>
			<el-table-column sortable prop="diff_income" label="2日收入差"></el-table-column>

			<!-- <el-table-column label="注册时间" prop="signDate"></el-table-column> -->
			<el-table-column label="上次登录时间" prop="loginDate"></el-table-column>
		</el-table>
		<!-- <el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			background
			:total="total"
			:page-size="pageSize"
			:page-sizes="pageSizes"
			:current-page="pageNum"
			layout="total,  prev, pager, next"
		> 
		</el-pagination>-->
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
				form: {
					userId: '',
					times: ['', ''],
					qq: '',
					email: ''
				},
				uploadForm: {
					bal: 0,
					price: 0
					// userType: ''
				},
				ModifyMoney: false,
				ModifyVip: false,
				ModifyType: false,
				modifyStytus: false,
				modifyNewPass: '',
				handleForm: {},
				lvMap: []
			}
		},
		mounted() {
			this.getTableData()
		},
		methods: {
			callback() {
				this.getTableData()
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
			getVIPType() {
				// let params = {}
				// this.$post(this.$API.URL_GET_VIP_TYPE,params,'').then()
				this.lvMap = userLv
			},
			getTableData() {
				let params = {
					signUpDate: this.form.times || ['', ''],
					userId: this.form.userId,
					qq: this.form.qq,
					email: this.form.email
				}
				this.$post(this.$API.URL_KF_ALL_USER, params, '').then(res => {
					this.tableData = res
				})
			}
		}
	}
</script>

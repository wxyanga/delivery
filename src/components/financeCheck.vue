<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<!-- <el-form-item label="资金类型：">
				<el-select v-model="form.type">
					<el-option v-for="(item, index) in moneyType" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>-->
			<el-form-item label="用户名：">
				<el-input v-model="form.userId" placeholder="输入用户名"></el-input>
			</el-form-item>

			<el-form-item label="时间：">
				<el-date-picker
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd HH:mm:ss"
					v-model="form.chargeDate"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="金额范围：">
				<el-input style="width:100px" v-model="form.chargeMinAmt" :controls="false" placeholder="最小金额"></el-input>
				<span style="margin:0 5px">至</span>
				<el-input style="width:100px" v-model="form.chargeMaxAmt" :controls="false" placeholder="最大金额"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData">
			<el-table-column type="index" label="#"></el-table-column>
			<!-- <el-table-column prop="type" label="资金类型">
				<template slot-scope="prop">
					{{ moneyType.slice(1).filter(item => item.value == prop.row['charge_type'])[0]['label'] }}
				</template>
			</el-table-column> -->
			<el-table-column prop="user_id" label="用户名"></el-table-column>
			<!-- <el-table-column prop="amt" label="充值类型">
				<template
					slot-scope="prop"
				>{{ moneyType.filter(item => item.value == prop.row['charge_type'])[0]['label'] }}</template>
			</el-table-column> -->
			<el-table-column prop="order_id" label="交易单号"></el-table-column>
			<el-table-column prop="amt" label="充值金额"></el-table-column>
			<el-table-column prop="create_date" label="充值时间"></el-table-column>
			<el-table-column prop="create_date" label="审核状态">
				<template slot-scope="prop">
					<span :class="prop.row.status == FinanceStatus[0]['value'] ? 'cost cost-worrning' : prop.row.status == FinanceStatus[2]['value'] ? 'cost cost-pink' : 'cost'"></span>
					{{ FinanceStatus.filter(item => item.value == prop.row.status)[0]['label'] }}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="prop">
					<el-button v-if="prop.row.status !== FinanceStatus[1].value" @click="changeStatus(prop.row)">审核</el-button>
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
			layout="total, prev, pager, next"
		></el-pagination>
		<common-dialogs :right-click="dialogConfirm" :left-click="closedDialog" :closed-dialog="closedDialog" class="cust-Dialog-01">
			<template slot="send">
				<el-form label-width="100px" :model="checkForm" ref="checkForm" :rules="checkFormRules">
					<el-form-item prop="user_id" label="用户名：">{{ checkForm.user_id }}</el-form-item>
					<el-form-item prop="order_id" label="订单编号：">{{ checkForm.order_id }}</el-form-item>
					<el-form-item prop="amt" label="充值金额：">{{ checkForm.amt }}</el-form-item>
					<el-form-item prop="status" label="审核状态：">
						<el-radio-group v-model="checkForm.status">
							<el-radio label="pending">待审核</el-radio>
							<el-radio label="done">通过</el-radio>
							<el-radio label="reject">拒绝</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</template>
		</common-dialogs>
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
			//             flow_date = body.get('chargeDate')
			// flow_chargeMinAmt_amt = body.get('chargechargeMinAmtAmt', -1)
			// flow_chargeMaxAmt_amt = body.get('chargechargeMaxAmtAmt', -1)
			// page_size = int(body.get('pageSize', 10))
			// page = body.get('page', 1)
			form: {
				userId: '',
				chargeDate: ['', ''],
				chargeMinAmt: '',
				chargeMaxAmt: ''
			},
			checkForm: {
				status: ''
			},
			checkFormRules: {
				status: [{ required: true, message: '审核状态必填', trigger: 'blur' }],
				checkMoney: [
					{ required: true, message: '审核金额必填', trigger: 'blur' },
					{ type: 'number', chargeMinAmt: 0, message: '审核金额必须大于等于0' }
				]
			},
			moneyType: RechargeType,
			FinanceStatus: FinanceStatus
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		callback() {
			this.getTableData(null, true)
		},
		getTableData(e, callback) {
			!callback && (this.pageNum = 1)
			// this.$post(this.$API.URL_GET_CHARGE_FINANCE_LIST, params, '').then()
			let params = {
				userId: this.form.userId,
				chargeDate: this.form.chargeDate || ['', ''],
				chargeMinAmt: this.form.chargeMinAmt == '' ? -1 : parseInt(this.form.chargeMinAmt), //mumber
				chargeMaxAmt: this.form.chargeMaxAmt == '' ? -1 : parseInt(this.form.chargeMaxAmt), // number
				pageSize: this.pageSize,
				page: this.pageNum
			}
			this.$post(this.$API.URL_GET_CHARGE_FINANCE_LIST, params, '').then(res => {
				this.tableData = res.data
				this.pageNum = res.pageNum
				this.total = res.total
			})
			// this.total = 200
			// this.pageSize = 10
		},
		changeStatus(row) {
			this.checkForm = Object.assign({}, row)
			this.$showDialog({ title: '充值审核', slotName: 'send' })
		},
		dialogConfirm() {
			this.$refs.checkForm.validate(vali => {
				if (vali) {
					this.$log(0, this.checkForm)
					let params = {
						chargeStatus: this.checkForm.status,
						id: this.checkForm.id
					}
					this.$post(this.$API.URL_PUT_RECHARGE_CHECK, params, '审核成功').then(() => {
						this.checkForm = {}
						this.getTableData()
						this.$hideDialog()
					})
				}
			})
		},
		closedDialog() {}
	}
}
</script>

<style></style>

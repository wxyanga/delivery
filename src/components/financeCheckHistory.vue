<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<!-- <el-form-item label="审核状态：">
				<el-select v-model="form.type">
					<el-option v-for="(item, index) in moneyType" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item> -->
			<el-form-item label="时间：">
				<el-date-picker
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd HH:mm:ss"
					v-model="form.chargeDate"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
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
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<!-- <el-table-column prop="type" label="资金类型">
				<template slot-scope="prop">
					{{ moneyType.slice(1).filter(item => item.value == prop.row.type)[0]['label'] }}
				</template>
			</el-table-column> -->
			<!-- <el-table-column type="index" label="#"></el-table-column> -->

			<el-table-column prop="user_id" label="用户名"></el-table-column>
			<el-table-column prop="order_id" label="交易单号"></el-table-column>
			<el-table-column prop="amt" label="充值金额"></el-table-column>
			<el-table-column prop="create_date" label="充值时间"></el-table-column>

			<el-table-column prop="status" label="充值状态">
				<template slot-scope="prop">
					{{ moneyType.slice(0).filter(item => item.value == prop.row.status)[0]['label'] }}
				</template>
			</el-table-column>
			<el-table-column prop="update_date" label="审核时间"></el-table-column>
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
	</div>
</template>

<script>
import mixin from 'static/mixins.js'

export default {
	mixins: [mixin.pagination],
	data() {
		return {
			form: {
				type: '',
				chargeDate: ['', '']
			},
			checkForm: {
				type: '',
				times: ['', ''],
				min: '',
				max: ''
			},
			checkFormRules: {
				status: [
					{ required: true, message: '审核状态必填', trigger: 'blur' },
					{ type: 'number', min: 1, message: '审核状态必须选择' }
				],
				checkMoney: [
					{ required: true, message: '审核金额必填', trigger: 'blur' },
					{ type: 'number', min: 0, message: '审核金额必须大于等于0' }
				]
			},
			moneyType: FinanceStatus
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
			let params = {
				chargeDate: this.form.chargeDate,
				chargeMinAmt: this.form.chargeMinAmt ? this.form.chargeMinAmt : -1,
				chargeMaxAmt: this.form.chargeMaxAmt ? this.form.chargeMaxAmt : -1,
				pageSize: this.pageSize,
				page: this.pageNum
			}
			this.$post(this.$API.URL_GET_CHARGE_FINANCE_LIST, params, '').then(res => {
				this.tableData = res.data
				this.total = res.total
				this.pageSize = res.pageSize
			})
		}
	}
}
</script>

<style></style>

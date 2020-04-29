<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<el-form-item label="资金类型：">
				<el-select v-model="form.chargeType">
					<el-option v-for="(item, index) in moneyType" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
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
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="金额范围：">
				<el-input style="width:100px" v-model="form.chargeMinAmt" :controls="false" placeholder="最小金额"></el-input>
				<span style="margin:0 5px">至</span>
				<el-input style="width:100px" v-model="form.chargeMaxAmt" :controls="false" placeholder="最大金额"></el-input>
			</el-form-item>
		</el-form>
		<el-form :inline="true" label-width="100px">
			<el-form-item label=" ">
				<el-button type="primary" @click="getTableData">查询</el-button>
				<el-button type="primary" @click="exportEXLApi">导出</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData">
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<el-table-column prop="chart_type" label="资金类型">
				<template slot-scope="prop">
					{{ getType(prop.row['chart_type']) }}
				</template>
			</el-table-column>
			<el-table-column prop="amt" label="金额"></el-table-column>
			<el-table-column prop="charge_date" label="时间"></el-table-column>
			<el-table-column prop="chargeStatus" label="充值状态">
				<template slot-scope="prop">
					<span v-if="prop.row.chargeStatus">{{ FinanceStatus.filter(item => item.value == prop.row.chargeStatus)[0].label }}</span>
					<span v-else></span>
				</template>
			</el-table-column>
			<el-table-column prop="orderStatus" label="发货状态">
				<template slot-scope="prop">
					<span v-if="prop.row.orderStatus">{{ expressStatus.filter(item => item.value == prop.row.orderStatus)[0].label }}</span>
					<span v-else></span>
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
				chargeType: '',
				chargeDate: ['', ''],
				chargeMinAmt: '', //mumber
				chargeMaxAmt: '' // number
			},
			moneyType: moneyType,
			FinanceStatus: FinanceStatus,
			expressStatus: expressStatus
		}
	},
	mounted() {
		if (this.$route.params.searchType) {
			this.form.chargeType = this.$route.params.searchType
		}
		this.getTableData()
	},
	computed: {},
	methods: {
		callback() {
			this.getTableData(null, true)
		},
		getType(type) {
			return this.moneyType.slice(1).filter(item => item.value == type)[0].label
		},
		exportEXLApi() {
			let params = {
				chargeType: this.form.chargeType,
				chargeDate: this.form.chargeDate || ['', ''],
				chargeMinAmt: this.form.chargeMinAmt == '' ? -1 : parseInt(this.form.chargeMinAmt), //mumber
				chargeMaxAmt: this.form.chargeMaxAmt == '' ? -1 : parseInt(this.form.chargeMaxAmt) // number
			}
			this.$post(this.$API.URL_EXCEL_USER_FINANCE, params, '').then(result => {
				this.$log(0, result)
				let body = document.body
				let a = document.createElement('a')
				a.download = ''
				a.href = getBaseUrl + result['excel_url']
				body.appendChild(a)
				a.click()
				body.removeChild(a)
			})
		},
		getTableData(e, callback) {
			!callback && (this.pageNum = 1)
			let params = {
				chargeType: this.form.chargeType,
				chargeDate: this.form.chargeDate || ['', ''],
				chargeMinAmt: this.form.chargeMinAmt == '' ? -1 : parseInt(this.form.chargeMinAmt), //mumber
				chargeMaxAmt: this.form.chargeMaxAmt == '' ? -1 : parseInt(this.form.chargeMaxAmt), // number
				pageSize: this.pageSize,
				page: this.pageNum
			}
			this.$post(this.$API.URL_GET_MONEY_DETAIL, params, '').then(res => {
				this.tableData = res.data
				this.pageNum = res.pageNum
				this.total = res.total
			})
			this.$log(0, this.form)
			// this.total = 200
			// this.pageSize = 10
		}
	}
}
</script>

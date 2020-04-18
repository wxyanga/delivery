<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<el-form-item label="下单时间：">
				<el-date-picker
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd HH:mm:ss"
					v-model="form.orderDate"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData">
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<el-table-column prop="user_id" label="用户名"></el-table-column>
			<el-table-column prop="amt" label="使用金额"></el-table-column>
			<el-table-column prop="create_date" label="提交时间"></el-table-column>
			<el-table-column label="使用快递">
				<template slot-scope="prop">{{ prop.row['express_name'] || useExpress.filter(item => item.codeValue == prop.row['express_type'])[0].codeName }}</template>
			</el-table-column>
			<el-table-column prop="order_id" label="物流单号"></el-table-column>
			<el-table-column prop="status" label="发货状态">
				<template slot-scope="prop">
					<span :class="prop.row.status == expressStatus[1]['value'] ? 'cost cost-worrning' : prop.row.status == expressStatus[2]['value'] ? 'cost cost-pink' : 'cost'"></span>
					{{ expressStatus.slice(1).filter(item => item.value == prop.row.status)[0]['label'] }}
				</template>
			</el-table-column>
			<el-table-column prop="update_date" label="发货时间"></el-table-column>
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
	</div>
</template>

<script>
import mixin from 'static/mixins.js'
export default {
	mixins: [mixin.pagination],
	data() {
		return {
			form: {
				orderDate: ['', ''],
				chargeMinAmt: '',
				chargeMaxAmt: ''
			},
			expressStatus: expressStatus,
			useExpress: []
		}
	},
	mounted() {
		this.getExpType()
		this.getTableData()
	},
	methods: {
		callback() {
			this.getTableData()
		},
		getExpType() {
			this.$post(this.$API.URL_GET_EXPRESS_ORDER, {}, '').then(res => {
				this.useExpress = res['express_type']
			})
		},
		getTableData() {
			this.pageNum = 1
			let params = {
				orderDate: this.form.orderDate || ['', ''],
				chargeMinAmt: this.form.chargeMinAmt == '' ? -1 : parseInt(this.form.chargeMinAmt), //mumber
				chargeMaxAmt: this.form.chargeMinAmt == '' ? -1 : parseInt(this.form.chargeMinAmt), // number
				pageSize: this.pageSize,
				page: this.pageNum
			}
			this.$post(this.$API.URL_GET_ORDER_FINANCE_LIST, params, '').then(res => {
				this.tableData = res.data
				this.pageNum = res.pageNum
				this.total = res.total
			})
		}
	}
}
</script>

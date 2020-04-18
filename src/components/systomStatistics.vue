<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<!-- <el-form-item label="订单状态：">
				<el-select v-model="form.status">
					<el-option v-for="(item, index) in expressStatus.slice(0, 3)" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>-->
			<el-form-item label="统计时间：">
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
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
			</el-form-item>
		</el-form>
		<el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
			<el-tab-pane label="按月统计" name="first">
				<el-table :data="tableData" @selection-change="handleSelectionChange">
					<el-table-column type="index" label="#"></el-table-column>
					<el-table-column prop="date" label="统计月份"></el-table-column>
					<el-table-column prop="cnt" label="单量"></el-table-column>
					<el-table-column prop="diff_cnt" label="两月单差"></el-table-column>
					<el-table-column prop="amt" label="总收入"></el-table-column>
					<el-table-column prop="cost" label="总成本"></el-table-column>
					<el-table-column prop="income" label="总利润"></el-table-column>
					<el-table-column prop="diff_income" label="两月利润差"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="按日统计" name="second">
				<el-table :data="tableData1" @selection-change="handleSelectionChange">
					<el-table-column type="index" label="#"></el-table-column>
					<el-table-column prop="date" label="统计日期"></el-table-column>
					<el-table-column prop="cnt" label="单量"></el-table-column>
					<el-table-column prop="diff_cnt" label="2日单差"></el-table-column>
					<el-table-column prop="amt" label="总收入"></el-table-column>
					<el-table-column prop="cost" label="总成本"></el-table-column>
					<el-table-column prop="income" label="总利润"></el-table-column>
					<el-table-column prop="diff_income" label="2日利润差"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>

		<common-dialogs
			:right-click="dialogConfirm"
			:isCenter="true"
			:left-click="closedDialog"
			:center-click="continueAdd"
			:centerButtonText="'打印单号'"
			:closed-dialog="closedDialog"
			class="cust-Dialog-01"
		>
			<template slot="send">
				<div>{{ this.expressNum.join(' , ') }}</div>
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
				activeName: 'first',
				form: {
					chargeDate: ['', '']
				},
				tableData1: [],
				id: [],
				sendRow: {},
				expressNum: [],
				expressStatus: expressStatus,
				useExpress: [],
				multipleSelection: []
			}
		},
		mounted() {
			this.init()
			this.getTableData()
		},
		methods: {
			handleClick() {},
			callback() {
				this.getTableData()
			},
			init() {
				this.$post(this.$API.URL_GET_EXPRESS_ORDER, {}, '').then(res => {
					this.useExpress = res['express_type']
				})
			},
			changeStatus(row, rows) {
				let id = []
				this.expressNum = []
				this.$log(0, row)
				if (rows) {
					if (!this.multipleSelection.length) return
					this.multipleSelection.forEach(item => {
						if (item.status !== this.expressStatus[2].value) {
							id.push(item.id + '')
							this.expressNum.push(item['order_id'])
						}
					})
				} else {
					id.push(row.id)
					this.expressNum.push(row['order_id'])
				}
				if (id.length) {
					this.id = id
					this.sendRow = row
					// this.$showDialog({ title: '发货单号确认', slotName: 'send' })
					// this.$post(this.$API.URL_PUT_ORDER_CHECK,params,'').then()
					this.dialogConfirm()
				} else {
					this.$message.error('未找到“已提交”订单')
				}
			},

			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			getTableData() {
				let params = {
					date: this.form.chargeDate || ['', '']
				}
				this.$post(this.$API.URL_KF_ALL_MONTH, params, '').then(res => {
					this.tableData = res
				})
				this.$post(this.$API.URL_KF_ALL_DAY, params, '').then(res => {
					this.tableData1 = res
				})

				// amt: 36.9 价格
				// cnt: 3 单量
				// cost: 0 成本
				// date: "2020-03-15"
				// diff_cnt: "--" 单差
				// diff_income: "--" 收入差
				// income: 36.9 收入

				// amt: 2064.4
				// cnt: 151
				// cost: 0
				// date: "2020-03"
				// diff_cnt: "--"
				// diff_income: "--"
				// income: 2064.4
				// .then(res => {
				//     this.tableData = res.data
				// 	this.total = res.total
				// 	this.pageSize = res.pageSize
				// })
			},
			dialogConfirm() {
				let params = {
					id: this.id[0] + ''
					// orderStatus: 'done'
				}
				this.$post(this.$API.URL_PUT_ORDER_REBACK_CHECK, params, '发货成功').then(res => {
					this.id = []
					// this.sendRow = res.data
					this.$log(0, res)
					this.getTableData()
				})
			},
			dialogResendConfirm(row) {
				let params = {
					id: [row.id]
				}
				this.$post(this.$API.URL_PUT_ORDER_CHECK_RESEND, params, '重新发货成功').then(res => {
					this.id = []
					this.getTableData()
				})
			},
			closedDialog() {},
			continueAdd() {
				this.$log(0, '打印单号', this.expressNum)
			}
		}
	}
</script>

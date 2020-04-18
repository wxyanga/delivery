<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<!-- <el-form-item label="订单状态：">
				<el-select v-model="form.status">
					<el-option v-for="(item, index) in expressStatus.slice(0, 3)" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item> -->
			<el-form-item label="使用快递：">
				<el-select v-model="form.useExpress">
					<el-option v-for="(item, index) in useExpress" :key="index" :label="item.label" :value="item.map"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="下单时间：">
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
			</el-form-item>
			<el-form-item label="发货时间：">
				<el-date-picker
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
					v-model="form.times1"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData" @selection-change="handleSelectionChange">
			<el-table-column type="expand">
				<template slot-scope="prop">
					<el-form label-position="left" label-width="100px" class="demo-table-expand">
						<el-form-item label="使用快递:">
							<span>{{ useExpress.filter(item => item.id == prop.row.useComp)[0]['label'] }}</span>
						</el-form-item>
						<el-form-item label="发货信息:">
							<span>{{ prop.row.sendmsg }}</span>
						</el-form-item>
						<el-form-item label="收货信息:">
							<span>{{ prop.row.getmsg }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<!-- <el-table-column type="selection" width="55"> </el-table-column> -->
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<el-table-column prop="create" label="提交时间"></el-table-column>
			<el-table-column prop="useMoney" label="使用金额"></el-table-column>

			<!-- <el-table-column prop="useComp" label="使用快递">
				<template slot-scope="prop">
					{{ useExpress.filter(item => item.id == prop.row.useComp)[0]['label'] }}
				</template>
			</el-table-column> -->
			<el-table-column prop="expressNum" label="物流单号"></el-table-column>

			<el-table-column prop="status" label="发货状态">
				<template slot-scope="prop">
					<span :class="prop.row.status == '0' ? 'cost cost-worrning' : prop.row.status == '1' ? 'cost cost-pink' : 'cost '"></span
					>{{ expressStatus.slice(1).filter(item => item.value == prop.row.status)[0]['label'] }}
				</template>
			</el-table-column>
			<el-table-column prop="update" label="发货时间"></el-table-column>
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
		<common-dialogs :right-click="dialogConfirm" :left-click="closedDialog" :closed-dialog="closedDialog" class="cust-Dialog-01">
			<template slot="add"> </template>
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
				status: '',
				times: ['', ''],
				times1: ['', ''],
				expressNum: ''
			},
			expressStatus: expressStatus,
			useExpress: [],
			multipleSelection: []
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		callback() {
			this.getTableData()
		},
		changeStatus(row) {
			let id = []
			if (row) {
				id.push(row.id)
			} else {
				this.multipleSelection.forEach(item => {
					id.push(item.id)
				})
			}
			let params = {
				id: id.join(',')
			}
			// this.$post(this.$API.URL_GET_DELIVER_STATUS,params,'').then()
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		getTableData() {
			// let params = {}
			// this.$post(this.$API.URL_GET_EXPRESS_MESSAGE,params,'').then()
			this.tableData = mock.ExpressDetail.filter(item => item.status == 1)
			this.total = 200
			this.pageSize = 10

			this.useExpress = mock.ExpTypes.list
		},
		dialogConfirm() {
			let slotName = this.$store.state.dialogOptions.slotName
			if (false) {
				if (slotName == 'add') {
					if (this.form.isNew) {
						// let params = {}
						// this.$post(this.$API.URL_SYSTOM_ADD_MONEY,params,'').then()
					} else {
						// let params = {}
						// this.$post(this.$API.URL_PUT_EXPRESS_ORDER,params,'').then()
					}
				} else if (slotName == 'addOrder') {
					// let params = {}
					// this.$post(this.$API.URL_ADD_EXPRESS_ORDER_NUM,params,'').then()
				}
			}
		},
		closedDialog() {}
	}
}
</script>

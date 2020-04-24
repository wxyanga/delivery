<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<el-form-item label="订单状态：">
				<el-select v-model="form.orderStatus">
					<el-option v-for="(item, index) in expressStatus" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="订单号：">
				<el-input v-model="form.tid" placeholder="输入电商订单号"></el-input>
			</el-form-item>
			<el-form-item label="物流单号：">
				<el-input v-model="form.orderId" placeholder="输入物流单号"></el-input>
			</el-form-item>
			<el-form-item label="下单时间：">
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
		</el-form>
		<el-form :inline="true" label-width="100px">
			<el-form-item label=" ">
				<el-button type="primary" @click="getTableData">查询</el-button>
				<el-button type="primary" @click="exportEXLApi(null, true)">导出当日快递单号</el-button>
				<el-button type="primary" @click="exportEXLApi">导出所有查询单号</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData">
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<el-table-column type="expand">
				<template slot-scope="prop">
					<el-form label-position="left" label-width="100px" class="demo-table-expand">
						<!-- <el-form-item label="使用快递:">
							<span>{{ useExpress.filter(item => item.codeValue == prop.row['express_type'])[0]['codeName'] }}</span>
						</el-form-item> -->
						<!-- <el-form-item label="发货信息:">
							<span>{{ prop.row.sendmsg }}</span>
						</el-form-item> -->
						<el-form-item label="收货信息:">
							<span>{{ prop.row.getmsg }}</span>
						</el-form-item>
						<el-form-item label="提交时间:">
							<span>{{ prop.row['create_date'] }}</span>
						</el-form-item>
						<!-- <el-form-item label="发货时间:">
							<span>{{ prop.row['update_date'] }}</span>
						</el-form-item>-->
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="create_date" label="提交时间"></el-table-column>
			<el-table-column prop="amt" label="使用金额">
				<template slot-scope="prop">
					{{ prop.row.order_id == ''?'0':prop.row.amt }}
				</template>
			</el-table-column>
			<el-table-column prop="useComp" label="使用快递">
				<template slot-scope="prop">{{ prop.row['express_name'] || useExpress.filter(item => item.codeValue == prop.row['express_type'])[0].codeName }}</template>
			</el-table-column>
			<el-table-column prop="ec_id" label="订单号"></el-table-column>
			<el-table-column prop="order_id" label="物流单号"></el-table-column>

			<el-table-column prop="status" label="发货状态">
				<template slot-scope="prop">
					<span :class="prop.row.status == expressStatus[1]['value'] ? 'cost cost-worrning' : prop.row.status == expressStatus[2]['value'] ? 'cost cost-pink' : 'cost'"></span>
					{{ expressStatus.slice(1).filter(item => item.value == prop.row.status)[0]['label'] }}
				</template>
			</el-table-column>
			<el-table-column prop="update_date" label="发货时间"></el-table-column>
		</el-table>
		<a ref="download" download :href="href"></a>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			background
			:total="total"
			:page-size="pageSize"
			:page-sizes="pageSizes"
			:current-page="pageNum"
			layout="total,  prev, pager, next"
		></el-pagination>
	</div>
</template>

<script>
import mixin from 'static/mixins.js'
export default {
	mixins: [mixin.pagination],
	data() {
		return {
			value8: '',
			form: {
				orderStatus: '',
				tid: '',
				chargeDate: ['', ''],
				orderId: '',
				todayDate: ''
			},
			href: '',
			expressStatus: expressStatus,
			useExpress: []
		}
	},
	mounted() {
		this.getExpType()
		this.getTableData()
	},
	methods: {
		exportEXLApi(e, today = false) {
			let params = {}
			if (today) {
				let Day = new Date()
				let days =
					Day.getFullYear() +
					'-' +
					(Day.getMonth() + 1).toString().padStart(2, '00') +
					'-' +
					Day.getDate()
						.toString()
						.padStart(2, '00')
				params = {
					chargeDate: [days + ' 00:00:00', days + ' 23:59:59']
				}
			} else {
				if (this.form.chargeDate[0] && this.form.chargeDate[0] == this.form.chargeDate[1]) {
					this.form.chargeDate[1] = this.form.chargeDate[1].split(' ')[0] + ' 23:59:59'
				}
				params = {
					orderStatus: this.form.orderStatus,
					chargeDate: this.form.chargeDate || ['', ''],
					orderId: this.form.orderId,
					tid: this.form.tid
				}
			}
			this.$post(this.$API.URL_EXCEL_SEARCH_DOWNLOAD, params, '').then(result => {
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
		callback() {
			this.getTableData(null, true)
		},
		getExpType() {
			this.$post(this.$API.URL_GET_EXPRESS_ORDER, {}, '').then(res => {
				this.useExpress = res['express_type']
			})
		},
		downLoadSelectData() {
			// let params = {}
			// this.$post(this.$API.URL_DOWNLOAD_EXPRESS_MESSAGE,params,'').then()
		},
		getTableData(e, callback) {
			// let params = {}
			// this.$post(this.$API.URL_GET_EXPRESS_MESSAGE,params,'').then()
			// this.total = 200
			// this.pageSize = 10
			!callback && (this.pageNum = 1)
			if (this.form.chargeDate[0] && this.form.chargeDate[0] == this.form.chargeDate[1]) {
				this.form.chargeDate[1] = this.form.chargeDate[1].split(' ')[0] + ' 23:59:59'
			}
			let params = {
				orderStatus: this.form.orderStatus,
				chargeDate: this.form.chargeDate || ['', ''],
				orderId: this.form.orderId,
				tid: this.form.tid,
				pageSize: this.pageSize,
				page: this.pageNum
			}
			this.$post(this.$API.URL_GET_EXPRESS_MESSAGE, params, '').then(res => {
				// this.tableData = res.data
				this.tableData = res.data.filter(item => {
					// for (const it of this.UserData) {
					// 	if (it['user_id'] == item['user_id']) {
					// 		item.userData = it
					// 		break
					// 	}
					// }
					item.sendmsg = `${item.sender}/${item['send_prov']}/${item['send_city']}/${item['send_county']}/${item['send_addr']}/${item['sender_tel']}`
					item.getmsg = `${item.receiver}/${item['receive_prov']}/${item['receive_city']}/${item['receive_county']}/${item['receive_addr']}/${item['receiver_tel']}`
					return item
				})
				this.pageNum = res.pageNum
				this.total = res.total
			})
		}
	}
}
</script>

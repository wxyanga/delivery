<template>
	<div>
		<el-form :inline="true" label-width="100px">
			<!-- <el-form-item label="订单状态：">
				<el-select v-model="form.status">
					<el-option v-for="(item, index) in expressStatus.slice(0, 3)" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>-->
			<el-form-item label="用户名">
				<el-input v-model="form.userId" placeholder="输入用户名"></el-input>
			</el-form-item>
			<el-form-item label="订单状态">
				<el-select v-model="form.orderStatus">
					<el-option
						v-for="(item, index) in expressStatus"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="订单号">
				<el-input v-model="form.tid" placeholder="输入电商订单号"></el-input>
			</el-form-item>
			<el-form-item label="物流单号">
				<el-input v-model="form.orderId" placeholder="输入物流单号"></el-input>
			</el-form-item>
			<el-form-item label="使用快递">
				<el-select v-model="form.expressType">
					<el-option label="所有快递" value></el-option>
					<el-option
						v-for="(item, index) in useExpress"
						:key="index"
						:label="item.codeName"
						:value="item.codeValue"
					></el-option>
				</el-select>
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
			<el-form-item label="打印时间段：">
				<el-date-picker
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd HH:mm:ss"
					v-model="form.printDate"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getTableData">查询</el-button>
				<el-button type="primary" @click="exportEXLApi">导出查询所有结果</el-button>
				<!-- <el-button type="primary" @click="changeStatus(false, true)">批量发货</el-button> -->
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="tableData" @selection-change="handleSelectionChange">
			<el-table-column type="expand">
				<template slot-scope="prop">
					<el-form label-position="left" label-width="100px" class="demo-table-expand">
						<el-form-item label="使用快递:">
							<span>{{ useExpress.filter(item => item.codeValue == prop.row['express_type'])[0]['codeName'] }}</span>
						</el-form-item>
						<el-form-item label="发货信息:">
							<span>{{ prop.row.sendmsg }}</span>
						</el-form-item>
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
			<el-table-column type="selection" prop="status" width="55"></el-table-column>
			<!-- <el-table-column type="index" label="#"></el-table-column> -->
			<el-table-column prop="user_id" label="用户名">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>
							<span class="popover_costom">用户名:</span>
							{{ scope.row.userData['user_id'] }}
						</p>
						<p>
							<span class="popover_costom">账户余额:</span>
							{{ scope.row.userData.bal }}
						</p>
						<p>
							<span class="popover_costom">会员价:</span>
							{{ scope.row.userData.price }}
						</p>
						<p>
							<span class="popover_costom">E-mail:</span>
							{{ scope.row.userData.email }}
						</p>
						<p>
							<span class="popover_costom">QQ:</span>
							{{ scope.row.userData.qq }}
						</p>
						<p>
							<span class="popover_costom">注册时间:</span>
							{{ scope.row.userData['create_date'] }}
						</p>
						<div slot="reference" class="name-wrapper">{{ scope.row['user_id'] }}</div>
					</el-popover>
				</template>
			</el-table-column>

			<el-table-column prop="amt" label="使用金额">
				<template slot-scope="prop">
					{{ prop.row.order_id == ''?'0':prop.row.amt }}
				</template>
			</el-table-column>
			<!-- <el-table-column prop="useComp" label="使用快递">
				<template slot-scope="prop">
					{{ useExpress.filter(item => item.id == prop.row.useComp)[0]['label'] }}
				</template>
			</el-table-column>-->
			<el-table-column prop="ec_id" label="订单号："></el-table-column>
			<el-table-column prop="order_id" label="物流单号"></el-table-column>
			<el-table-column prop="status" label="发货状态">
				<template slot-scope="prop">
					<span
						:class="prop.row.status == expressStatus[1]['value'] ? 'cost cost-worrning' : prop.row.status == expressStatus[2]['value'] ? 'cost cost-pink' : 'cost'"
					></span>
					{{ expressStatus.slice(1).filter(item => item.value == prop.row.status)[0]['label'] }}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="prop">
					<el-button v-if="prop.row.status == expressStatus[1].value" @click="changeStatus(prop.row)">发货</el-button>
					<el-button v-else @click="dialogResendConfirm(prop.row)">重新发货</el-button>
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
				UserData: [],
				form: {
					userId: '',
					orderId: '',
					tid: '',
					expressType: '',
					chargeDate: ['', ''],
					printDate: ['', ''],
					chargeMinAmt: '',
					chargeMaxAmt: '',
					orderStatus: ''
				},
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
			this.getAllUserData()
		},
		methods: {
			getAllUserData() {
				let params = {
					userId: '',
					pageSize: 99999999,
					page: 1
				}
				this.$post(this.$API.URL_KF_FIND_USER, params, '').then(res => {
					this.UserData = res.data
					this.getTableData()
				})
			},
			cellMouseEnter() {
				this.$log('cellMouseEnter', arguments)
			},
			exportEXLApi() {
				let params = {
					userId: this.form.userId,
					orderId: this.form.orderId,
					tid: this.form.tid,
					orderDate: this.form.chargeDate || ['', ''],
					printDate: this.form.printDate || ['', ''],
					expressType: this.form.expressType,
					chargeMinAmt: this.form.chargeMinAmt ? this.form.chargeMinAmt : -1,
					chargeMaxAmt: this.form.chargeMaxAmt ? this.form.chargeMaxAmt : -1,
					orderStatus: this.form.orderStatus
				}
				this.$post(this.$API.URL_EXCEL_KF_SEARCH_DOWNLOAD, params, '').then(result => {
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
			getTableData(e, callback) {
				if (!callback) this.pageNum = 1
				let params = {
					userId: this.form.userId,
					orderId: this.form.orderId,
					tid: this.form.tid,
					orderDate: this.form.chargeDate || ['', ''],
					printDate: this.form.printDate || ['', ''],
					expressType: this.form.expressType,
					chargeMinAmt: this.form.chargeMinAmt ? this.form.chargeMinAmt : -1,
					chargeMaxAmt: this.form.chargeMaxAmt ? this.form.chargeMaxAmt : -1,
					orderStatus: this.form.orderStatus,
					pageSize: this.pageSize,
					page: this.pageNum
				}
				this.$post(this.$API.URL_GET_ORDER_FINANCE_LIST, params, '').then(res => {
					this.tableData = res.data.filter(item => {
						for (const it of this.UserData) {
							if (it['user_id'] == item['user_id']) {
								item.userData = it
								break
							}
						}
						item.sendmsg = `${item.sender}/${item['send_prov']}/${item['send_city']}/${item['send_county']}/${item['send_addr']}/${item['sender_tel']}`
						item.getmsg = `${item.receiver}/${item['receive_prov']}/${item['receive_city']}/${item['receive_county']}/${item['receive_addr']}/${item['receiver_tel']}`
						return item
					})
					// send_addr: "SDFSDFsgse sdfsd 色告诉过我是"
					// send_prov: "北京市"
					// send_city: "北京城区"
					// send_county: "丰台区"
					// receive_addr: "软二38号"
					// receive_prov: "福建省"
					// receive_city: "厦门市"
					// receive_county: "思明区"
					// sender: "噢噢噢噢1"
					// sender_postid: ""
					// sender_tel: "18150401975"
					// receiver: "杨伟雄"
					this.total = res.total
					this.pageSize = res.pageSize
				})
				// let params = {}
				// this.$post(this.$API.URL_GET_DELIVER_STATUS,params,'').then()
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
<style scoped>
	.popover_costom {
		display: inline-block;
		width: 80px;
		text-align: right;
		margin-right: 10px;
	}
</style>

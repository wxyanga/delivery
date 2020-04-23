<template>
	<div>
		<!-- <div class="tipsClass">
			<template v-for="(it, index) in tips">
				<a v-if="it.url" :key="index" :href="it.url" target="_blank" :style="it.style">{{ it.label }}</a>
				<span v-else :key="index" :href="it.url" target="_blank" :style="it.style">{{ it.label }}</span>
			</template>
		</div>-->
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="批量补打" name="second">
				<el-form ref="form1" class="cust-exp-type" label-width="150px">
					<el-form-item label="录入参照格式">
						<div>
							<span style="background:green;color:#fff;padding:5px 10px;margin-right:10px">物流单号</span>
							<span style="color:red">每条物流单号使用回车换行</span>
						</div>
					</el-form-item>
					<el-form-item label="手动录入物流单号信息" style="width:80%">
						<el-input type="textarea" v-model="textAreaValue" :rows="10"></el-input>
					</el-form-item>
					<el-form-item label="物流单号录入" style="width:80%">
						<el-button type="primary" @click="analysis">解析数据</el-button>
						<el-button type @click="resetForm">重置</el-button>
						<el-button type="primary" style="float: right;" :disabled="ExpTable.length == 0" @click="upEXP">
							共 {{ ExpTable.length }} 个信息，确认补打
						</el-button>
						<el-button type="primary" style="float: right;" :disabled="ExpTable.length == 0" @click="downEXP">
							导出单号地址
						</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="ExpTable">
					<el-table-column prop="orderId" label="物流单号" >
						<template slot-scope="prop">
							<el-input style="width: 200px;" v-model="prop.row.orderId"></el-input>
						</template>
					</el-table-column>
                    <el-table-column prop="resendNum" label="补打次数" >
                        <template slot-scope="prop">
                            <div :style="prop.row.resendNum>0?'color:#ec5656;':'color:#01b79d;'" >{{prop.row.resendNum}}</div>
                        </template>
                    </el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click.native.prevent="deleteRow(scope.$index, ExpTable)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
                <el-table :data="FindFailResultTable" v-show="findFailResultShow">
                    <el-table-column prop="orderId" :label="'系统物流单号未找到(总计'+FindFailResultTable.length+'条)'" >
                        <template slot-scope="prop">
                            <div style="color: rgba(175,1,0,0.79);" >{{prop.row.orderId}}</div>
                        </template>
                    </el-table-column>
                </el-table>
				<el-table :data="FailResultTable" v-show="failResultShow">
					<el-table-column prop="orderId" :label="'补打失败物流单号(总计'+FailResultTable.length+'条)（请检查系统是否有此物流单号）'" >
						<template slot-scope="prop">
							<div style="color: rgba(175,1,0,0.79);" >{{prop.row.orderId}}</div>
						</template>
					</el-table-column>
				</el-table>
				<el-table :data="SuccessResultTable" v-show="successResultShow">
					<el-table-column prop="orderId" :label="'补打成功物流单号(总计'+SuccessResultTable.length+'条)'"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import area from 'static/area.js'
import mixin from 'static/mixins'

export default {
	components: {


	},
	mixins: [mixin.INFO],
	data() {
		return {
			activeName: 'second',
			textAreaValue: '',
			actionUrl: this.$API.URL_PUT_ORDER_LIST_RESEND,
			exportUrl: this.$API.URL_PUT_ORDER_RESEND_DETAIL_EXPORT,
			dialogButtonOptions: {
				rightButtonType: 'primary',
				leftButtonType: 'default',
				rightClick: () => {}
			},
			isIE: () => {
				if (!!window.ActiveXObject || 'ActiveXObject' in window) {
					return true
				} else {
					return false
				}
			},
			normalHint: {
				text: '请选择DAT格式的文件',
				color: 'rgb(191,191,191)'
			},
			errorHint: {
				text: '文件格式错误',
				color: '#F56C6C'
			},
			options: area.province,
			cascaderProps: {
				value: 'label'
			},
			step: 1,
			tips: [],
			ExpTable: [],
			SuccessResultTable: [],
			FailResultTable: [],
			FindFailResultTable: []
		}
	},

	mounted() {

	},
	computed: {
		successResultShow:function() {
			if(this.SuccessResultTable.length>0){
				return true
			}else {
				return false;
			}
		},
		failResultShow:function() {
			if(this.FailResultTable.length>0){
				return true
			}else {
				return false;
			}
		},
		findFailResultShow:function() {
			if(this.FindFailResultTable.length>0){
				return true
			}else {
				return false;
			}
		}
	},
	methods: {
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
		analysis() {
			let alalysisArr = this.textAreaValue
					.trim()
					.split('\n')
					.filter(i => i)
			this.$log('alalysisArr', alalysisArr)

			alalysisArr.forEach(item => {
				let orderId = item.trim()
				// this.ExpTable.push({
				// 	'orderId':orderId,
				// 	'resendNum':0
				// })
				let params = {
					orderId: orderId
				}
				this.$post(this.$API.URL_GET_ORDER_FINANCE, params, '').then(result => {
					this.$log(0, result)
					if(result.total>0){
						this.ExpTable.push({
                            'orderId':orderId,
                            'resendNum':result.data[0]['resend_num']
                        })
					}else{
						this.FindFailResultTable.push({
							'orderId':orderId
						})
                    }
				})
			})
			this.$log(0, this.FindFailResultTable)
			this.textAreaValue = ''
			this.SuccessResultTable = []
			this.FailResultTable = []
		},
		resetForm() {
			this.textAreaValue = ''
			this.ExpTable = []
			this.SuccessResultTable = []
			this.FailResultTable = []
			this.FindFailResultTable = []
		},

		upEXP() {
			this.SuccessResultTable = []
			this.FailResultTable = []
			let check = this.ExpTable.filter(it => !it.orderId)
			check.length && this.$message.error('表格中存在空数据，请检查！')
			if(!check.length){
				let timeString = Date.now() + ''
				for (const [k,{orderId}] of Object.entries(this.ExpTable)) {
					let params = {
						batch: timeString,
						orderId: orderId || ''
					}

					this.$log('mutily post', params)

					this.$post(this.$API.URL_PUT_ORDER_CHECK_RESEND, params,'').then(result => {
						if(result['resend']=='0'){
							this.FailResultTable.push({'orderId':orderId})
						}else if(result['resend']=='1'){
							this.SuccessResultTable.push({'orderId':orderId})
						}
					}).catch()
				}
				this.textAreaValue = ''
				this.ExpTable = []
			}
		},
		downEXP(){
			let check = this.ExpTable.filter(it => !it.orderId)
			check.length && this.$message.error('表格中存在空数据，请检查！')
			if (!check.length){
				let timeString = Date.now() + ''
				let orderIds = []
				for (const [k, {orderId}] of Object.entries(this.ExpTable)) {
					orderIds.push(orderId)
				}
				this.$log('mutily post', orderIds.join(","))
				let params = {
					batch: timeString,
					orderIds: orderIds.join(",")
				}

				this.$log('mutily post', params)
				this.$post(this.$API.URL_PUT_ORDER_RESEND_DETAIL_EXPORT, params, '').then(result => {
					this.$log(0, result)
					let body = document.body
					let a = document.createElement('a')
					a.download = ''
					a.href = getBaseUrl + result['excel_url']
					body.appendChild(a)
					a.click()
					body.removeChild(a)
				})
			}
		}

	}
}
</script>

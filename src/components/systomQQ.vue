<template>
	<div>
		<el-row>
			<el-col :span="9" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
				<el-card>
					<div slot="header" class="clearfix">
						<span>QQ客服</span>
					</div>
					<el-form :inline="false" label-width="100px">
						<el-form-item label="客服名称：">
							<el-input placeholder="最长5个汉字" maxlength="5" v-model="form[index].name"></el-input>
						</el-form-item>
						<el-form-item label="客服QQ：">
							<el-input placeholder="QQ号需要到官网开通权限" v-model="form[index].qq"></el-input>
						</el-form-item>
						<el-form-item label="启用/禁用：">
							<el-checkbox v-model="form[index].valid">启用</el-checkbox>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<p></p>
		<el-row>
			<el-col :span="9" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
				<el-card>
					<div slot="header" class="clearfix">
						<span>QQ客服</span>
					</div>
					<el-form :inline="false" label-width="100px">
						<el-form-item label="客服名称：">
							<el-input placeholder="最长5个汉字" maxlength="5" v-model="form[index + 2].name"></el-input>
						</el-form-item>
						<el-form-item label="客服QQ：">
							<el-input placeholder="QQ号需要到官网开通权限" v-model="form[index + 2].qq"></el-input>
						</el-form-item>
						<el-form-item label="启用/禁用：">
							<el-checkbox v-model="form[index + 2].valid">启用</el-checkbox>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<p></p>
		<el-row>
			<el-col :span="9">
				<el-card>
					<div slot="header" class="clearfix">
						<span>QQ客服</span>
					</div>
					<el-form :inline="false" label-width="100px">
						<el-form-item label="客服名称：">
							<el-input placeholder="最长5个汉字" maxlength="5" v-model="form[4].name"></el-input>
						</el-form-item>
						<el-form-item label="客服QQ：">
							<el-input placeholder="QQ号需要到官网开通权限" v-model="form[4].qq"></el-input>
						</el-form-item>
						<el-form-item label="启用/禁用：">
							<el-checkbox v-model="form[4].valid">启用</el-checkbox>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :span="9" :offset="2">
				<el-card>
					<div slot="header" class="clearfix">
						<span>提交保存</span>
					</div>
					<el-form :inline="false" label-width="100px">
						<el-form-item>
							<el-button type="primary" @click="putSave">保存信息</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: [
				{
					name: '',
					qq: '',
					valid: true
				},
				{
					name: '',
					qq: '',
					valid: true
				},
				{
					name: '',
					qq: '',
					valid: true
				},
				{
					name: '',
					qq: '',
					valid: true
				},
				{
					name: '',
					qq: '',
					valid: true
				}
			]
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		callback() {
			this.getTableData()
		},
		getTableData() {
			// URL_KF_LIST: getBaseUrl + '/kf/kf/list/', // 客服列表
			// URL_KF_MODIFY: getBaseUrl + '/kf/update/kf/', // 修改客服信息

			this.$post(this.$API.URL_KF_LIST, {}, '').then(res => {
				this.form = Object.values(res).map(it => {
					it.valid = it.valid == 1 ? true : false
					return it
				})
			})
		},
		putSave() {
			let params = {}
			this.form.forEach((item, index) => {
				item.valid = item.valid ? '1' : '0'
				let { name, qq, valid } = item
				params[index + 1 + ''] = { name, qq, valid }
			})
			this.$post(this.$API.URL_KF_MODIFY, params, '客服信息保存成功')
		}
	}
}
</script>

<style>
.box-card {
	width: 40%;
}
</style>

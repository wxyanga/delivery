<template>
	<div>
		<div class="ct cttext">
			<el-icon class="el-icon-success" style="color: green;"></el-icon>
			充值成功
		</div>
		<div class="ct">
			<el-button type="primary" @click="routerNext('userRecharge')">继续充值</el-button>
			<el-button type="primary" @click="routerNext('userRechargeDetail')">查看充值记录</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {
		this.$log('pay', this.$route.params, this.$route.query, this.$route.query.orderId)
		let orderId = this.$route.query.orderId
		orderId && this.$post(this.$API.URL_EXCEL_ZFB_PAY_SUCCESS, { order_id: orderId }, '')
	},
	methods: {
		routerNext(name) {
			if (name == 'userRechargeDetail') {
				this.$router.push({ name: 'userRechargeDetail', params: { searchType: 'bal' } })
			} else this.$router.push({ name })
		}
	}
}
</script>

<style scoped>
.ct {
	text-align: center;
}
.cttext {
	line-height: 25vh;
	font-size: 30px;
}
</style>

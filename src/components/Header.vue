<template>
	<el-row>
		<el-col :span="4"
			><div class="" @click="routerBlank">{{ systomConfig.name }}</div></el-col
		>
		<el-col :span="19"
			><div class="text-ellipsis">
				<el-form label-width="100px" class="headerTop">
					<el-form-item label="网站公告:">
						<el-carousel height="60px" indicator-position="none" arrow="never" direction="vertical" :interval="5000">
							<el-carousel-item v-for="item in msg" :key="item.content">
								<div>{{ item.content }}</div>
							</el-carousel-item>
						</el-carousel>
					</el-form-item>
				</el-form>

				<!-- <span :href="msg.url" target="_blank" :style="msg.style">{{ msg.label }}</span> -->
			</div>
		</el-col>
		<el-col :span="1"
			><div class="">
				<el-button type="text" @click="quit">退出</el-button>
			</div></el-col
		>
	</el-row>
</template>

<script>
export default {
	name: 'cus-header',
	data() {
		return {
			msg: '',
			systomConfig: systomConfig
		}
	},
	mounted() {
		this.getDefaultData()
		this.$bus.$on('changePublic', () => this.getDefaultData())
	},
	methods: {
		getDefaultData() {
			this.$log('changePublic', '111111111111111111')
			this.$post(this.$API.URL_KF_PUBLIC_LIST, {}, '').then(res => {
				this.msg = res
				if (!res.length) this.msg = [{ content: '' }]
			})
		},
		routerBlank() {
			this.$router.push('/home/')
		},
		quit() {
			showCollection.times = 1
			this.$post(this.$API.URL_QUIT_LOGIN, {}, '您已成功退出系统！').then(res => {
				sessionStorage.removeItem('accessToken')
				sessionStorage.removeItem('loginState')
				sessionStorage.removeItem('INFO')
				this.$store.commit('isLogin', false)
				this.$router.push('/')
			})
		}
	}
}
</script>

<style></style>

<template>
	<el-container style="height: 100vh;">
		<el-header>
			<Header></Header>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<Aside></Aside>
			</el-aside>
			<el-container style="border-left:1px solid #ccc">
				<el-main style="height:80vh">
					<qq></qq>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		<el-footer></el-footer>
	</el-container>
</template>

<script>
import Aside from 'components/Aside.vue'
import Header from 'components/Header.vue'
import qq from 'components/qq.vue'
import mixin from 'static/mixins.js'
export default {
	name: 'home',
	mixins: [mixin.INFO],
	components: { Aside, Header, qq },
	data() {
		return {}
	},
	mounted() {
		this.$log('HOME mounted', JSON.parse(sessionStorage.getItem('INFO')).id)
	},
	methods: {
		quit() {
			sessionStorage.removeItem('accessToken')
			sessionStorage.removeItem('loginState')
			sessionStorage.removeItem('INFO')
			this.$store.commit('isLogin', false)
			this.$router.push('/')
		}
	}
}
</script>

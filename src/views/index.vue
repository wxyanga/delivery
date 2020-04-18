<template>
	<div>
		<div :class="MainData.boxClass">
			<img :src="MainData.innerImage" alt />
		</div>
		<el-menu :default-active="activeIndex2" :class="MainData.menuClass" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="2">首页</el-menu-item>
			<el-menu-item index="0">会员中心</el-menu-item>
			<el-menu-item index="1">购买单号</el-menu-item>
		</el-menu>
		<el-carousel indicator-position="outside" :class="MainData.bannerClass">
			<el-carousel-item v-for="(item, index) in MainData.banner" :key="index">
				<a :href="item.link" v-if="item.link" target="_blank" :title="item.title">
					<img style="width:100%" :src="item.url" :alt="item.title" :title="item.title" />
				</a>
				<a href="javascript:;" v-else :title="item.title">
					<img style="width:100%" :src="item.url" :alt="item.title" :title="item.title" />
				</a>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex2: '2',
			MainData: MainIndex
		}
	},
	methods: {
		goLogin(val) {
			this.$router.push({
				name: 'login',
				params: {
					step: val
				}
			})
		},
		handleSelect(key, keyPath) {
			let isLogin = sessionStorage.getItem('loginState')
			let type = JSON.parse(sessionStorage.getItem('INFO'))
			if (key == 0) {
				if (isLogin) {
					this.$router.push('/home/')
				} else {
					this.goLogin(key)
				}
			} else if (key == 1 && isLogin) {
				if (type && type.role == 'admin') {
					this.$router.push('/home/')
				} else {
					this.$router.push('/home/userExpressOrder')
				}
			} else {
				this.goLogin(0)
			}
		}
	}
}
</script>

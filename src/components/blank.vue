<template>
	<div>
		<a v-if="msg.url" :href="msg.url" target="_blank" :style="msg.style">{{ msg.label }}</a>
		<span v-else :href="msg.url" :style="msg.style">{{ msg.label }}</span>
		<!--<common-dialogs :right-click="dialogConfirm" :left-click="closedDialog" rightButtonText="点击收藏" leftButtonText="关闭" :closed-dialog="closedDialog" class="cust-Dialog-01">-->
		<common-dialogs :left-click="closedDialog" leftButtonText="关闭" :closed-dialog="closedDialog" class="cust-Dialog-01">
			<template slot="Collection">
				<!--<p>-->
					<!--新网址地址：<a :href="changeUrl.url" target="_blank">{{ changeUrl.url }}</a>-->
				<!--</p>-->
				<p>充值二维码换了，大家键盘ctrl+F5强刷新，才会显示新的二维码，这个是浏览器无法实时刷新缓存的问题。</p>
			</template>
		</common-dialogs>
	</div>
</template>
<script>
import CommonDialogs from './CommonDialogs.vue'

export default {
	components: {
		CommonDialogs
	},
	// mounted() {
	// 	this.$post(this.$API.URL_GET_USER_INFO, {}, '')
	// }
	data() {
		return {
			msg: systomConfig,
			changeUrl: {}
		}
	},
	mounted() {
		this.changeUrl = showCollection
		this.$log(0, showCollection)
		this.showDialog()
	},
	methods: {
		showDialog() {
			this.changeUrl.dialog &&
				this.changeUrl.times > 0 &&
				!this.changeUrl.url.includes(window.location.hostname) &&
				this.changeUrl.times-- &&
				this.$showDialog({ title: '提示', slotName: 'Collection' })
		},
		dialogConfirm() {
			try {
				if (document.all) {
					window.external.AddFavorite(this.changeUrl.url, this.changeUrl.siteName)
				} else if (window.sidebar && window.sidebar.addPanel) {
					window.sidebar.addPanel(this.changeUrl.siteName, this.changeUrl.url, '')
				} else if (window.external) {
					window.external.AddFavorite(this.changeUrl.url, this.changeUrl.siteName)
				}
				this.$message.success('收藏成功')
			} catch (e) {
				let open = confirm('加入收藏失败，点击确定跳转新网址，并使用 Ctrl + D 手动添加！')
				if (open) {
					window.open(this.changeUrl.url, '_blank')
				}
			}
		},
		closedDialog() {}
	}
}
</script>

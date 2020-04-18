<template>
	<div>
		<a v-if="msg.url" :href="msg.url" target="_blank" :style="msg.style">{{ msg.label }}</a>
		<span v-else :href="msg.url" :style="msg.style">{{ msg.label }}</span>
	</div>
</template>
<script>
export default {
	// mounted() {
	// 	this.$post(this.$API.URL_GET_USER_INFO, {}, '')
	// }
	data() {
		return {
			msg: systomConfig
		}
	}
}
</script>

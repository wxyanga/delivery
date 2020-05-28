export default {
	pagination: {
		data: function() {
			return {
				tableData: [],
				pageSizes: [10],
				total: 0,
				pageNum: 1,
				pageSize: 10
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val
				this.callback()
			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.callback()
			}
		},
		components: {}
	},
	INFO: {
		mounted() {
			this.INFO()
		},
		data() {
			return {
				userInfo: JSON.parse(sessionStorage.getItem('INFO'))
			}
		},
		methods: {
			INFO() {
				this.$post(this.$API.URL_GET_USER_INFO, {}, '').then(res => {
					sessionStorage.setItem('INFO', JSON.stringify(res))
					this.userInfo = res
				})
			}
		}
	},
	ADMIN: {
		mounted() {
			if (this.userInfo['role'] == 'admin') this.startIntervalIfAdmin()
		},
		data() {
			return {
				userInfo: JSON.parse(sessionStorage.getItem('INFO')),
				// mediaAudio: mediaAudio,
				audio: new Audio(mediaAudio.url),
				times: null
			}
		},
		methods: {
			startIntervalIfAdmin() {
				// this.audio.src = this.mediaAudio.url
				this.audio.loop = false
				// this.audio.onload = function() {
				// 	console.info('audio load')
				// 	this.StartMussic()
				// }
				this.$post(this.$API.PROXY_CHARGE, {}, '', false).then(res => {
					res.hasCharge && this.StartMussic()
				})
				this.times = setInterval(() => {
					this.$post(this.$API.PROXY_CHARGE, {}, '', false).then(res => {
						res.hasCharge && this.StartMussic()
					})
				}, mediaAudio.times)
			},
			StartMussic() {
				this.audio.play()
			}
		},
		destroyed() {
			clearInterval(this.times)
		}
	}
}

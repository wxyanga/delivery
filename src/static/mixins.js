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
	}
}

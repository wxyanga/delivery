<template>
	<div v-if="$store.state.dialogOptions.isDialogShow">
		<el-dialog
			ref="dialog"
			:title="$store.state.dialogOptions.title"
			:before-close="beforeCloseFunc"
			:visible="$store.state.dialogOptions.isDialogShow"
			@close="closeDialog"
			:width="width"
			@closed="handleClosed"
			:close-on-click-modal="modalType"
		>
			<div style="display: flex;">
				<div class="dialog-slot-wrap">
					<slot :name="$store.state.dialogOptions.slotName"></slot>
				</div>
			</div>
			<div slot="footer" v-if="showFooter" class="dialog-footer">
				<el-button size="medium" @click="handleLeftClick" class="footer-btn" :type="leftButtonType">{{ leftButtonText }}</el-button>
				<el-button size="medium" @click="handleCenterClick" class="footer-btn" :disabled="disabledCenterBtn" :type="centerButtonType" v-if="isShowCenter">{{ centerButtonText }}</el-button>
				<el-button size="medium" @click="handleRightClick" class="footer-btn" :disabled="disabledBtn" :type="rightButtonType">{{ rightButtonText }}</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'CommonDialogs',
	components: {},
	props: {
		disabledBtn: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '50%'
		},
		isCenter: {
			type: Boolean,
			default: false
		},
		leftButtonText: {
			type: String,
			default: '取消'
		},
		rightButtonText: {
			type: String,
			default: '确定'
		},
		centerButtonText: {
			type: String,
			default: '重置'
		},
		leftButtonType: {
			type: String,
			default: 'default'
		},
		rightButtonType: {
			type: String,
			default: 'primary'
		},
		centerButtonType: {
			type: String,
			default: 'default'
		},
		leftClick: {
			type: Function,
			default: null
		},
		rightClick: {
			type: Function,
			default: null
		},
		centerClick: {
			type: Function,
			default: null
		},
		closedDialog: {
			type: Function,
			default: null
		},
		beforeClose: {
			type: Function,
			default: null
		},
		showFooter: {
			type: Boolean,
			default: true
		},
		disabledCenterBtn: {
			type: Boolean,
			default: false
		},
		modalType: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {}
	},
	watch: {},
	computed: {
		isShowCenter() {
			return this.$props.isCenter
		}
	},
	mounted() {},
	methods: {
		closeDialog() {
			if (this.$props.closedDialog) {
				this.$props.closedDialog()
			}
			this.$hideDialog()
		},
		handleLeftClick() {
			if (this.$props.leftClick) {
				this.$props.leftClick()
			}
			this.$hideDialog()
		},
		handleRightClick() {
			if (this.$props.rightClick) {
				if (this.$props.rightClick() == false) {
					return false
				}
			}
			this.$hideDialog()
		},
		handleClosed() {
			if (this.$props.closedDialog) {
				this.$props.closedDialog()
			}
		},
		handleCenterClick() {
			if (this.$props.centerClick) {
				this.$props.centerClick()
			}
		},
		beforeCloseFunc(done) {
			if (this.$props.beforeClose) {
				this.$props.beforeClose()
			}
			done()
		},
		refreshSvg() {
			this.$refs.dialog.refreshSvg()
		}
	}
}
</script>

<style>
.dialog-slot-wrap {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	min-height: 9.4rem;
	font-size: 0.8rem;
	color: #90a3cf;
}

.dialog-slot-wrap .el-icon-warning.warning-icon {
	color: #f06122 !important;
	font-size: 0.9rem !important;
}

.dialog-footer {
	display: flex;
	justify-content: center;
}

.dialog-footer .el-button {
	margin: 0 0.6rem;
	background-color: transparent;
	color: #90a3cf;
	border-color: #90a3cf;
}

.dialog-footer .el-button:hover {
	filter: brightness(1.3);
	background-color: transparent;
}

.dialog-footer .el-button.el-button--primary {
	background-color: #1c92ff;
	color: #fff;
	border-color: #1c92ff;
}
</style>

<template>
	<div>
		<transition>
			<div v-if="!show" class="rides-cs" style="height:246px;">
				<div class="floatL">
					<a v-if="!show" style="top:20px" class="btnOpen" title="查看在线客服" href="javascript:void(0);" @click="show = !show">展开</a>
					<a v-if="show" style="top:20px" class="btnCtn" title="关闭在线客服" href="javascript:void(0);" @click="show = !show">收缩</a>
				</div>
			</div>
		</transition>
		<transition name="show-list">
			<div v-if="show" class="rides-cs" style="height:246px;">
				<div class="floatL">
					<a v-if="!show" style="top:20px" class="btnOpen" title="查看在线客服" href="javascript:void(0);" @click="show = !show">展开</a>
					<a v-if="show" style="top:20px" class="btnCtn" title="关闭在线客服" href="javascript:void(0);" @click="show = !show">收缩</a>
				</div>
				<div class="floatR" style="height:237px;width: 140px;">
					<div class="cn">
						<h3 class="titZx">QQ在线客服</h3>
						<ul>
							<li v-for="(it, index) in form" :key="index">
								<template v-if="it.valid == '1'">
									<a target="_blank" v-if="it.qq" title="联系客服" :href="`http://wpa.qq.com/msgrd?v=3&uin=${it.qq}&site=qq&menu=yes`"
										><img v-if="it.qq" border="0" src="../assets/online.png" /><span style="vertical-align: middle;display:inline-block;width:60px">{{ it.name }}</span></a
									>
								</template>
								<!-- <template v-else-if="index == 4 && it.valid">
									<li style="border:none;">
										{{ it.phone }}
									</li>
								</template> -->
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			form: []
		}
	},
	mounted() {
		this.show = openQQ
		this.getTableData()
	},
	methods: {
		getTableData() {
			// URL_KF_LIST: getBaseUrl + '/kf/kf/list/', // 客服列表
			// URL_KF_MODIFY: getBaseUrl + '/kf/update/kf/', // 修改客服信息
			this.$post(this.$API.URL_KF_LIST, {}, '').then(res => {
				this.form = Object.values(res).map(it => {
					it.valid = it.valid == 1 ? true : false
					return it
				})
			})
		}
	}
}
</script>
<style scoped>
body {
	text-align: left;
	color: #444;
	font-size: 14px;
	font-family: 'microsoft yahei';
}
img {
	border: 0;
}
* {
	margin: 0;
	padding: 0;
}
ul {
	list-style: none;
}
select,
input,
img,
select {
	vertical-align: middle;
}
a {
	text-decoration: none;
	cursor: pointer;
	color: #000;
	font-weight: normal;
}
a:hover {
	color: #0f91ed;
}
</style>
<style>
.header_l img {
	height: 65px;
	margin-top: 10px;
}

.rides-cs {
	font-size: 12px;
	background: #29a7e2;
	position: fixed;
	top: 250px;
	right: 0px;
	position: absolute;
	z-index: 1500;
	border-radius: 6px 0px 0 6px;
}
.rides-cs a {
	color: #00a0e9;
}
.rides-cs a:hover {
	color: #ff8100;
	text-decoration: none;
}
.rides-cs .floatL {
	width: 36px;
	float: left;
	position: relative;
	z-index: 1;
	margin-top: 21px;
	height: 181px;
}
.rides-cs .floatL a {
	font-size: 0;
	text-indent: -999em;
	display: block;
}
.rides-cs .floatR {
	width: 130px;
	float: left;
	padding: 5px;
	overflow: hidden;
}
.rides-cs .floatR .cn {
	background: #f7f7f7;
	border-radius: 6px;
	margin-top: 4px;
}
.rides-cs .cn .titZx {
	font-size: 14px;
	color: #333;
	font-weight: 600;
	line-height: 24px;
	padding: 5px;
	text-align: center;
}
.rides-cs .cn ul {
	padding: 0px;
}
.rides-cs .cn ul li {
	line-height: 38px;
	height: 38px;
	border-bottom: solid 1px #e6e4e4;
	overflow: hidden;
	text-align: center;
}
.rides-cs .cn ul li span {
	color: #777;
}
.rides-cs .cn ul li a {
	color: #777;
}
.rides-cs .cn ul li img {
	vertical-align: middle;
}
.rides-cs .cn ul li:last-child {
	border-bottom: none;
}
.rides-cs .btnOpen,
.rides-cs .btnCtn {
	position: relative;
	z-index: 9;
	top: 25px;
	left: 0;
	background-image: url(../assets/shopnc.png);
	background-repeat: no-repeat;
	display: block;
	height: 146px;
	padding: 8px;
}
.rides-cs .btnOpen {
	background-position: -410px 0;
}
.rides-cs .btnCtn {
	background-position: -450px 0;
}
.rides-cs ul li.top {
	border-bottom: solid #ace5f9 1px;
}
.rides-cs ul li.bot {
	border-bottom: none;
}
.show-list-enter,
.show-list-leave-to {
	transform: translateX(150px);
}
.show-list-enter-to,
.show-list-leave {
	transform: translateX(0px);
}
.show-list-enter-active,
.show-list-leave-active {
	transition: all ease 0.8s;
}
</style>

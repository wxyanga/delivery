<template>
	<el-menu :default-openeds="defaultOpeneds" :unique-opened="true" :router="false" @select="menuSelect">
		<template v-for="menu in menuData">
			<el-menu-item v-if="!menu.children" :index="menu.index" :key="menu.index">
				<i :class="menu.icon"></i>
				<span slot="title">{{ menu.name }}</span>
			</el-menu-item>
			<el-submenu v-else :index="menu.index" :key="menu.index">
				<template slot="title"><i :class="menu.icon"></i>{{ menu.name }}</template>
				<template v-for="smenu in menu.children">
					<el-menu-item v-if="!smenu.children" :index="smenu.index" :key="smenu.index">
						<!-- <i :class="smenu.icon"></i> -->
						<span slot="title">{{ smenu.name }}</span>
					</el-menu-item>
					<el-submenu v-else :index="smenu.index" :key="smenu.index">
						<template slot="title">{{ smenu.name }}</template>
						<el-menu-item v-for="ssmenu in smenu.children" :key="ssmenu.index" :index="ssmenu.index">
							<i :class="ssmenu.icon"></i>
							<span slot="title">{{ ssmenu.name }}</span>
						</el-menu-item>
					</el-submenu>
				</template>
			</el-submenu>
		</template>
	</el-menu>
</template>

<script>
export default {
	name: 'cus-aside',
	provider() {
		return {}
	},
	data() {
		return {
			defaultOpeneds: [],
			menuData: [],
			userType: ''
		}
	},
	mounted() {
		this.getMenu()
	},
	methods: {
		getMenu() {
			this.userType = JSON.parse(sessionStorage.getItem('INFO')).role
			// let params = {}
			// this.$post(this.$API.URL_GET_MENU, params, '').then()
			this.$log('---needChange menu', this.userType)
			// this.menuData = mock.menu[this.userType]
			this.menuData = menu[this['userType']]
			// this.menuData = menu['admin']
			// this.menuData = menuAll
		},
		menuSelect(name) {
			// this.$log('menuSelect', arguments)
			this.$router.push({ name })
		}
	}
}
</script>

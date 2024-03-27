<template>
	<el-container>
		<el-aside width="300px" v-loading="menuloading">
			<el-container>
				<el-header style="height:25px;">
					<el-text class="mx-1">菜单</el-text>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="menu" class="menu" node-key="id" :data="menuList" :props="menuProps" draggable highlight-current :expand-on-click-node="false" check-strictly show-checkbox :filter-node-method="menuFilterNode" @node-click="menuClick" @node-drop="nodeDrop">
						<template #default="{node}">
							<span class="custom-tree-node">
								<span class="label">
									{{ node.label }}
								</span>
							</span>
						</template>

					</el-tree>
				</el-main>
				<el-footer style="height:51px;"></el-footer>
			</el-container>
		</el-aside>
		<el-container>
			<el-main class="nopadding" style="padding:20px;" ref="main">
				<save ref="save" :menu="menuList"></save>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>

import save from './save'

export default {
	name: "city",
	components: {
		save
	},
	data() {
		return {
			menuloading: false,
			menuList: [],
			menuProps: {
				label: (data) => {
					return data.name
				}
			},
			menuFilterText: ""
		}
	},
	mounted() {
		this.getMenu();
	},
	methods: {
		//加载树数据
		async getMenu() {
			this.menuloading = true
			var res = await this.$API.system.city.cityTree.get();
			this.menuloading = false
			this.menuList = res.data;
		},
		//树点击
		menuClick(data, node) {
			console.log('data', data)
			console.log('data', node)

			var pid = data.parent_id;
			var level = data.level;
			this.$refs.save.setData(data, pid, level)
			this.$refs.main.$el.scrollTop = 0
		},
		//树过滤
		menuFilterNode(value, data) {
			if (!value) return true;
			var targetText = data.label;
			return targetText.indexOf(value) !== -1;
		}

	}
}
</script>

<style scoped>
.menu:deep(.el-tree-node__label) {
	display: flex;
	flex: 1;
	height: 100%;
}

.custom-tree-node {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	height: 100%;
	padding-right: 24px;
}

.custom-tree-node .label {
	display: flex;
	align-items: center;;
	height: 100%;
}

.custom-tree-node .label .el-tag {
	margin-left: 5px;
}

.custom-tree-node .do {
	display: none;
}

.custom-tree-node .do i {
	margin-left: 5px;
	color: #999;
}

.custom-tree-node .do i:hover {
	color: #333;
}

.custom-tree-node:hover .do {
	display: inline-block;
}
</style>

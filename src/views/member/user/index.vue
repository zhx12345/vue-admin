<template>
	<el-container>
		<el-aside width="200px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" class="menu" node-key="id"  :props="{children: 'children', label: 'title'}" :data="groupData" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick"></el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
			<el-header>
				<div class="left-panel">

				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.keyword" placeholder="用户名/手机号/会员码/昵称/真实姓名" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="list.apiObj" row-key="id" stripe>
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="会员码" prop="membership_code"></el-table-column>
					<el-table-column label="用户名" prop="username"></el-table-column>
					<el-table-column label="昵称" prop="nickname"></el-table-column>
					<el-table-column label="真实姓名" prop="realname"></el-table-column>
					<el-table-column label="成长值" prop="growth_value"></el-table-column>
					<el-table-column label="积分值" prop="integral_value"></el-table-column>
					<el-table-column label="余额值" prop="balance_value"></el-table-column>
					<el-table-column label="最近登录" prop="source_channel" width="140">
						<template #default="scope">
							<el-text class="mx-1">{{ scope.row.last_accessed_times }}</el-text>
							<br>
							<el-text class="mx-1">（{{ scope.row.last_accessed_ip }}）</el-text>
						</template>
					</el-table-column>
					<el-table-column label="来源" prop="source_channel">
						<template #default="scope">
							<el-tag type="success" v-if="scope.row.source_channel == 1">微信公众号</el-tag>
							<el-tag type="success" v-if="scope.row.source_channel == 2">微信小程序</el-tag>
							<el-tag type="success" v-if="scope.row.source_channel == 3">支付宝小程序</el-tag>
							<el-tag type="success" v-if="scope.row.source_channel == 4">PC</el-tag>
							<el-tag type="success" v-if="scope.row.source_channel == 5">H5</el-tag>
							<el-tag type="success" v-if="scope.row.source_channel == 6">APP</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="注册时间" prop="created_at" width="140"></el-table-column>

					<el-table-column label="操作" fixed="right" align="right">
						<template #default="scope">
						<el-dropdown>
							<el-button icon="el-icon-more" size="small"></el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="table_show(scope.row, scope.$index)" >查看</el-dropdown-item>
									<el-dropdown-item divided @click="table_edit(scope.row, scope.$index)">账户调整</el-dropdown-item>
									<el-dropdown-item @click="table_delete(scope.row, scope.$index)">停用</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
						</template>
					</el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: 'memberUser',
	data() {
		return {
			groupFilterText: "",
			groupData: [],
			showGrouploading: false,
			list: {
				apiObj: this.$API.member.user.list
			},
			search: {
				keyword: ""
			}
		}
	},
	watch: {
		groupFilterText(val) {
			this.$refs.group.filter(val);
		}
	},
	mounted() {
		this.getGroup()
	},
	methods: {
		// 查看
		async table_show(row, type) {
			this.$confirm(`确定要生成 `+type+`模型吗？生成后将覆盖已有文件`, '提示', {
				type: 'warning'
			}).then(async () => {
				var reqData = {name: row.name, comment: row.comment, type: type}
				const loading = this.$loading();
				var res = await this.$API.system.generate.add.post(reqData);
				loading.close();
				if (res.code == 200) {
					this.$message.success("生成成功")
				} else {
					this.$alert(res.message, "提示", {type: 'error'})
				}
			}).catch(() => {})
		},
		//加载树数据
		async getGroup(){
			this.showGrouploading = true;
			var res = await this.$API.member.level.list.get({paging: false});
			this.showGrouploading = false;
			var allNode = {id: '', title: '全部'}
			res.data.unshift(allNode);
			console.log(res.data)

			this.groupData = res.data;
			console.log(this.groupData)
		},
		//树过滤
		groupFilterNode(value, data){
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树点击事件
		groupClick(data){
			var params = {
				groupId: data.id
			}
			this.$refs.table.reload(params)
		},
		//搜索
		upsearch(){
			this.$refs.table.upData(this.search)
		},
	}
}
</script>

<style>
</style>

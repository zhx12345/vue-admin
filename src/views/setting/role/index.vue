<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
				<el-button type="primary" plain :disabled="selection.length!=1" @click="permission">权限设置</el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="角色名称 / 别名" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="#" type="index" width="50"></el-table-column>
				<el-table-column label="角色名称" prop="label" width="150"></el-table-column>
				<el-table-column label="别名" prop="alias" width="200"></el-table-column>
				<el-table-column label="排序" prop="sort" width="80"></el-table-column>
				<el-table-column label="状态" prop="status" width="80">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status == 1">使用中</el-tag>
						<el-tag type="warning" v-else>已禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="created_at" width="180"></el-table-column>
				<el-table-column label="备注" prop="remark" min-width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="170">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
							<el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
							<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)" v-if="scope.row.id != 1">
								<template #reference>
									<el-button text type="primary" size="small">删除</el-button>
								</template>
							</el-popconfirm>
						</el-button-group>
					</template>
				</el-table-column>

			</scTable>
		</el-main>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

	<permission-dialog v-if="dialog.permission" ref="permissionDialog" @closed="dialog.permission=false"></permission-dialog>

</template>

<script>
	import saveDialog from './save'
	import permissionDialog from './permission'

	export default {
		name: 'role',
		components: {
			saveDialog,
			permissionDialog
		},
		data() {
			return {
				dialog: {
					save: false,
					permission: false
				},
				apiObj: this.$API.system.role.list,
				selection: [],
				search: {
					keyword: null
				}
			 }
		},
		methods: {
			//添加
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open()
				})
			},
			//编辑
			table_edit(row){
				console.log(row)
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('edit').setData(row)
				})
			},
			//查看
			table_show(row){
				console.log(row)
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('show').setData(row)
				})
			},
			//权限设置
			permission(){
				let selectedIds = []; // 创建一个用于存储选中项的 id 的数组
				// 遍历 selection 中的每个项目
				this.selection.forEach(item => {
					// 在 tableData 中查找匹配的项
					this.$refs.table.tableData.forEach(itemI => {
						if (item.id === itemI.id) {
							// 将匹配的项的 id 添加到数组中
							selectedIds.push(itemI.id);
						}
					});
				});

				this.dialog.permission = true
				this.$nextTick(() => {
					this.$refs.permissionDialog.open(selectedIds[0])
				})
			},
			//删除
			async table_del(row){
				var reqData = {id: row.id}
				var res = await this.$API.system.role.delete.delete(reqData.id);
				if(res.code == 200){
					this.$refs.table.refresh()
					this.$message.success("删除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量删除
			async batch_del(){
				this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？如果删除项中含有子集将会被一并删除`, '提示', {
					type: 'warning'
				}).then(() => {
					const loading = this.$loading();
					try {
						this.selection.forEach(item => {
							this.$refs.table.tableData.forEach((itemI, indexI) => {
								if (item.id === itemI.id) {
									// 删除数据
									this.$API.system.role.delete.delete(itemI.id);
									// 删除页面显示
									this.$refs.table.tableData.splice(indexI, 1)
								}
							})
						})
					} catch (error) {
						console.error('Error:', error);
					}
					// this.$refs.table.refresh()
					loading.close();
					this.$message.success("操作成功")
				}).catch(() => {

				})
			},
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
			//搜索
			upsearch(){
				this.$refs.table.upData(this.search)
			},
			//根据ID获取树结构
			filterTree(id){
				var target = null;
				function filter(tree){
					tree.forEach(item => {
						if(item.id == id){
							target = item
						}
						if(item.children){
							filter(item.children)
						}
					})
				}
				filter(this.$refs.table.tableData)
				return target
			},
			//本地更新数据
			handleSaveSuccess(data, mode){
				if(mode=='add'){
					this.$refs.table.refresh()
				}else if(mode=='edit'){
					this.$refs.table.refresh()
				}
			}
		}
	}
</script>

<style>
</style>

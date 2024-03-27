<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.name" placeholder="分类名称" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="#" type="index" width="50"></el-table-column>
				<el-table-column label="分类名称" prop="name"></el-table-column>
				<el-table-column label="分类说明" prop="description"></el-table-column>
				<el-table-column label="默认" prop="is_default" width="80">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.is_default == 1">系统默认</el-tag>
						<el-tag type="warning" v-else>自定义</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="170">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)" v-if="scope.row.is_default !== 1">查看</el-button>
							<el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)" v-if="scope.row.is_default !== 1">编辑</el-button>
							<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)" v-if="scope.row.is_default !== 1">
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

</template>

<script>
import saveDialog from './save'

export default {
	name: 'categories2',
	components: {
		saveDialog,
	},
	data() {
		return {
			dialog: {
				save: false,
			},
			apiObj: this.$API.content.categories.listType1,
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
		//删除
		async table_del(row){
			var reqData = {id: row.id}
			var res = await this.$API.content.categories.delete.delete(reqData.id);
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

				this.selection.forEach(item => {
					this.$refs.table.tableData.forEach((itemI, indexI) => {
						if (item.id === itemI.id) {
							// 删除数据
							this.$API.content.categories.delete.delete(itemI.id);
							// 删除页面显示
							this.$refs.table.tableData.splice(indexI, 1)
						}
					})
				})
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

<template>
	<el-container>
<!--		<el-header>-->
<!--			<div class="left-panel">-->
<!--&lt;!&ndash;				<el-button type="danger" plain icon="el-icon-plus" :disabled="selection.length==0" @click="batch_generate">一键生成模块</el-button>&ndash;&gt;-->
<!--			</div>-->
<!--		</el-header>-->
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="name" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="表名" prop="name"></el-table-column>
				<el-table-column label="表备注" prop="comment"></el-table-column>
				<el-table-column label="引擎" prop="engine"></el-table-column>
				<el-table-column label="版本" prop="version"></el-table-column>
				<el-table-column label="行数" prop="rows"></el-table-column>
				<el-table-column label="大小" prop="data_length"></el-table-column>
				<el-table-column label="编码" prop="collation"></el-table-column>
				<el-table-column label="创建时间" prop="create_time"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="120">
					<template #default="scope">
						<el-dropdown>
							<el-button icon="el-icon-more" size="small"></el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="generate(scope.row,'all')">一键生成</el-dropdown-item>
									<el-dropdown-item @click="generate(scope.row,'model')">生成Model模型</el-dropdown-item>
									<el-dropdown-item @click="generate(scope.row,'controller')">生成Controller控制器</el-dropdown-item>
									<el-dropdown-item @click="generate(scope.row,'formRequest')">生成FormRequest验证类</el-dropdown-item>
<!--									<el-dropdown-item @click="generate(scope.row,'vue-page')">生成Vue页面</el-dropdown-item>-->
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</el-table-column>

			</scTable>
		</el-main>
	</el-container>


</template>

<script>
	export default {
		name: "generate",
		components: {},
		data(){
			return {
				apiObj: this.$API.system.generate.list,
				selection: []
			}
		},
		methods: {
			// 生成模块
			async generate(row, type) {
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
			//表格选择后回调事件
			selectionChange(selection){
				console.log(selection,'selection')
				this.selection = selection;
			},
		}
	}
</script>

<style>
</style>

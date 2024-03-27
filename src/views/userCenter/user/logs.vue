<template>
	<el-card shadow="never" header="近7天操作记录">
		<scTable ref="table" :data="data" v-loading="loading" height="auto" paginationLayout="total, prev, pager, next" hideDo>
			<sc-table-column label="序号" prop="id"></sc-table-column>
			<sc-table-column label="业务名称" prop="name"></sc-table-column>
			<sc-table-column label="地址" prop="url" ></sc-table-column>
			<sc-table-column label="IP" prop="cip"></sc-table-column>
			<el-table-column label="结果" prop="code">
				<template #default="scope">
					<el-tag type="success" v-if="scope.row.code == 200">成功</el-tag>
					<el-tag type="warning" v-if="scope.row.code != 200">失败</el-tag>
				</template>
			</el-table-column>
			<sc-table-column label="操作时间" prop="created_at" width="150"></sc-table-column>
		</scTable>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				form: {
					paging: false
				},
				data: [

				]
			}
		},
		mounted() {
			this.getlist()
		},
		methods: {
			//加数据
			async getlist(){
				try {
					this.loading = true
					var res = await this.$API.system.log.list.get(this.form);
					this.loading = false
					if(this.form.paging == true){
						this.data = res.data.data;
					}else{
						this.data = res.data;
					}

				}catch (error) {
					this.isSaveing = false;
				}
			},

		}
	}
</script>

<style>
</style>

<template>
	<el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
		</el-col>
		<template v-else>
			<el-col :lg="12" style="margin-left: 2rem">
				<h2>{{ form.name || "新增菜单" }}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="显示名称" prop="name">
						<el-input v-model="form.name" clearable placeholder="菜单显示名字"></el-input>
					</el-form-item>
					<el-form-item label="城市编号" prop="citycode">
						<el-input v-model="form.citycode" clearable placeholder="城市编号"></el-input>
					</el-form-item>
					<el-form-item label="地理编号" prop="adcode">
						<el-input v-model="form.adcode" clearable placeholder="地理编号"></el-input>
					</el-form-item>
					<el-form-item label="经度" prop="lng">
						<el-input v-model="form.lng" clearable placeholder="经度"></el-input>
					</el-form-item>
					<el-form-item label="纬度" prop="lat">
						<el-input v-model="form.lat" clearable placeholder="纬度"></el-input>
					</el-form-item>
					<el-form-item label="排序" prop="sort">
						<el-input-number v-model="form.sort" controls-position="right" :min="1"></el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save" :loading="loading">保 存</el-button>
					</el-form-item>
				</el-form>

			</el-col>
		</template>
	</el-row>

</template>

<script>
import scIconSelect from '@/components/scIconSelect'

export default {
	components: {
		scIconSelect
	},
	props: {
		menu: {
			type: Object, default: () => {
			}
		},
	},
	data() {
		return {
			form: {
				id: "",
				parent_id: "",
				name: "",
				level: "",
				citycode: "",
				adcode: "",
				lng: "",
				lat: "",
				sort: 125
			},
			rules: {
				parent_id: [
					{required: true, message: '请选择父级'}
				],
				name: [
					{required: true, message: '请输入名称'}
				],
				level: [
					{required: true, message: '请输入级别'}
				],
				sort: [
					{required: true, message: '请输入排序'}
				]
			},
			loading: false
		}
	},
	mounted() {

	},
	methods: {
		//保存
		async save() {
			this.loading = true
			var res = await this.$API.system.city.edit.put(this.form)
			this.loading = false
			if (res.code == 200) {
				this.$message.success("保存成功")
			} else {
				this.$message.warning(res.message)
			}
		},
		//表单注入数据
		setData(data, pid,level) {
			this.form.id = data.id
			this.form.parent_id = pid
			this.form.name = data.name
			this.form.level = level
			this.form.citycode = data.citycode
			this.form.adcode = data.adcode
			this.form.lng = data.lng
			this.form.lat = data.lat
			this.form.sort = data.sort
		}
	}
}
</script>

<style scoped>
h2 {
	font-size: 17px;
	color: #3c4a54;
	padding: 0 0 30px 0;
}

.apilist {
	border-left: 1px solid #eee;
}

[data-theme="dark"] h2 {
	color: #fff;
}

[data-theme="dark"] .apilist {
	border-color: #434343;
}
</style>

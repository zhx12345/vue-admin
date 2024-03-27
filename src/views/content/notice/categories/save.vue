<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="说明" prop="description">
				<el-input v-model="form.description" type="textarea" placeholder="请输入说明" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode!='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增',
					edit: '编辑',
					show: '查看'
				},
				visible: false,
				isSaveing: false,
				//表单数据
				form: {
					id:"",
					type: 1,
					name: "",
					description: "",
					is_default: 0
				},
				//验证规则
				rules: {
					name: [
						{required: true, message: '请输入姓名'}
					]
				},
			}
		},
		mounted() {

		},
		methods: {
			//显示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//表单提交方法
			async submit(){
				var valid = await this.$refs.dialogForm.validate().catch(() => {})
				if(!valid){
					return false
				}
				this.isSaveing = true;
				var res;
				if(this.mode=='add'){
					res = await this.$API.content.categories.add.post(this.form);
				}else{
					res = await this.$API.content.categories.edit.put(this.form);
				}
				this.isSaveing = false;
				if(res.code == 200){
					if(this.mode=='add'){
						this.form.id = res.data
					}
					this.$emit('success', this.form, this.mode)
					this.visible = false;
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.type = 1
				this.form.name = data.name
				this.form.description = data.description
				this.form.is_default = 0

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>

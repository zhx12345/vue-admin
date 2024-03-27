<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="1000" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px">
			<el-form-item label="分类" prop="category_id">
				<el-select v-model="form.category_id" placeholder="请选择分类">
					<el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<sc-editor v-model="form.content" placeholder="请输入内容" :templates="templates" :height="400"></sc-editor>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode!='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));
export default {
	emits: ['success', 'closed'],
	components: {
		scEditor
	},
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
				category_id: "",
				title: "",
				content: "",
			},
			//验证规则
			rules: {
				title: [
					{required: true, message: '请输入标题'}
				],
				category_id: [
					{required: true, message: '请选择分类'}
				],
				content: [
					{required: true, message: '请输入内容'}
				],
			},
			//所需数据选项
			category: [],
		}
	},
	mounted() {
		this.getCategories()
	},
	methods: {
		//显示
		open(mode='add'){
			this.mode = mode;
			this.visible = true;
			return this
		},
		async getCategories(){
			var res = await this.$API.content.categories.listType1.get({paging: false});
			this.category = res.data;
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
				res = await this.$API.content.notices.add.post(this.form);
			}else{
				res = await this.$API.content.notices.edit.put(this.form);
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
			this.form.title = data.title
			this.form.category_id = data.category_id
			this.form.content = data.content

			//可以和上面一样单个注入，也可以像下面一样直接合并进去
			//Object.assign(this.form, data)
		}
	}
}
</script>

<style>
</style>

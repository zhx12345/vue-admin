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
			<el-form-item label="广告图" prop="image">
				<sc-upload v-model="form.image" title="上传封广告图"></sc-upload>
			</el-form-item>
			<el-form-item label="广告图" prop="type">
				<el-radio-group v-model="form.type" label="size control">
					<el-radio-button label="1">页面</el-radio-button>
					<el-radio-button label="2">自定义链接</el-radio-button>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="页面" v-if="form.type == 1">
				<el-input v-model="form.store_page" placeholder="请输入页面" clearable></el-input>
			</el-form-item>
			<el-form-item label="自定义链接" v-if="form.type == 2">
				<el-input v-model="form.link" placeholder="请输入自定义链接" clearable>
					<template #prepend>Https://</template>
				</el-input>
			</el-form-item>

			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="form.sort" controls-position="right" :min="1"></el-input-number>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-switch v-model="form.status" inline-prompt active-value="1" inactive-value="0" active-text="启用" inactive-text="禁用"/>
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
				image: "",
				type: 2,
				link: "",
				store_page: "",
				sort: 50,
				status: "1",
			},
			//验证规则
			rules: {
				title: [
					{required: true, message: '请输入标题'}
				],
				category_id: [
					{required: true, message: '请选择分类'}
				],
				image: [
					{required: true, message: '请选择广告图'}
				],
				type: [
					{required: true, message: '请输入内容'}
				],
				sort: [
					{required: true, message: '请输入排序'}
				],
				status: [
					{required: true, message: '请选择状态'}
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
			try{
				var res = await this.$API.content.categories.listType3.get({paging: false});
				this.category = res.data;
			} catch (error) {
				console.error('Error:', error);
			}
		},
		//表单提交方法
		async submit(){
			var valid = await this.$refs.dialogForm.validate().catch(() => {})
			if(!valid){
				return false
			}
			this.isSaveing = true;
			try{
				var res;
				if(this.mode=='add'){
					res = await this.$API.content.advertisements.add.post(this.form);
				}else{
					res = await this.$API.content.advertisements.edit.put(this.form);
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
			} catch (error) {
				console.error('Error:', error);
			}
		},
		//表单注入数据
		setData(data){
			// this.form.id = data.id
			// this.form.title = data.title
			// this.form.category_id = data.category_id
			// this.form.type = data.type
			// this.form.link = data.link
			// this.form.store_page = data.store_page
			// this.form.status = data.status

			//可以和上面一样单个注入，也可以像下面一样直接合并进去
			Object.assign(this.form, data)
		}
	}
}
</script>

<style>
</style>

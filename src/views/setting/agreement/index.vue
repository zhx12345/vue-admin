<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">

				<el-tab-pane label="服务协议">
					<el-alert title="*会员注册时的服务协议，在登录注册页面显示。" type="warning" style="margin-bottom: 15px;"></el-alert>
					<sc-editor v-model="type1.content" placeholder="请输入" :templates="templates" :height="600"></sc-editor>
					<el-button type="primary" :loading="isSaveing" @click="edit(1)" style="margin-top: 20px;">保存</el-button>
				</el-tab-pane>
				<el-tab-pane label="隐私政策协议">
					<el-alert title="*会员隐私政策协议，在登录注册页面显示。" type="warning" style="margin-bottom: 15px;"></el-alert>
					<sc-editor v-model="type2.content" placeholder="请输入" :templates="templates" :height="600"></sc-editor>
					<el-button type="primary" :loading="isSaveing" @click="edit(2)" style="margin-top: 20px;">保存</el-button>
				</el-tab-pane>
				<el-tab-pane label="售后保障协议">
					<el-alert title="*售后保障协议，在退款申请页面显示。" type="warning" style="margin-bottom: 15px;"></el-alert>
					<sc-editor v-model="type3.content" placeholder="请输入" :templates="templates" :height="600"></sc-editor>
					<el-button type="primary" :loading="isSaveing" @click="edit(3)" style="margin-top: 20px;">保存</el-button>
				</el-tab-pane>

			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));
	export default {
		name: 'agreement',
		components: {
			scEditor
		},
		data() {
			return {
				type1: [],
				type2: [],
				type3: [],
				isSaveing: false,
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			async getList(){
				var res = await this.$API.system.agreement.list.get();
				this.type1 = res.data.type1;
				this.type2 = res.data.type2;
				this.type3 = res.data.type3;
			},
			async edit(type){
				this.isSaveing = true;
				var param;
				if (type == 1) {
					param = this.type1
				} else if (type == 2) {
					param = this.type2
				} else if (type == 3) {
					param = this.type3
				}
				var res = await this.$API.system.agreement.edit.put(param)
				this.isSaveing = false;
				if(res.code == 200){
					this.$emit('success', this.form, this.mode)
					this.visible = false;
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			}
		}
	}
</script>

<style>
</style>

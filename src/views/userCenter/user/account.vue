<template>
	<el-card shadow="never" header="个人信息">
		<el-form ref="dialogForm" :model="form" label-width="120px" style="margin-top:20px;">
			<el-form-item label="头像" prop="avatar">
				<sc-upload v-model="form.avatar" title="上传头像"></sc-upload>
			</el-form-item>
			<el-form-item label="账号">
				<el-input v-model="form.user_name" disabled></el-input>
				<div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="form.sex" placeholder="请选择">
					<el-option label="保密" value="0"></el-option>
					<el-option label="男" value="1"></el-option>
					<el-option label="女" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="生日">
				<el-date-picker v-model="form.birthday" type="date" placeholder="请选择生日" format="YYYY/MM/DD"/>
			</el-form-item>
			<el-form-item label="个性签名">
				<el-input v-model="form.about" type="textarea"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="isSaveing" @click="submit()">保存</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				isSaveing: false,
				form: {
					id: 0,
					avatar: "",
					user_name: "",
					name: "",
					sex: "0",
					birthday: null,
					about: "",
				},
				//验证规则
				rules: {
					avatar:[
						{required: true, message: '请上传头像'}
					],
					name: [
						{required: true, message: '请输入真实姓名'}
					],
					sex: [
						{required: true, message: '请选择性别'}
					]
				}
			}
		},
		mounted() {
			this.userInfo()
		},
		methods: {
			// 用户信息
			async userInfo(){
				var userInfo = this.$TOOL.data.get("USER_INFO")

				this.form.id = userInfo.id
				this.form.avatar = userInfo.avatar
				this.form.name = userInfo.name
				this.form.user_name = userInfo.user_name
				this.form.sex = userInfo.sex.toString()
				this.form.birthday = userInfo.birthday
				this.form.about = userInfo.about

			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						try {
							this.isSaveing = true;
							var res = await this.$API.system.user.edit.put(this.form);
							this.isSaveing = false;
							if(res.code == 200){
								this.$emit('success', this.form, this.mode)
								this.visible = false;
								this.$message.success("操作成功")
								// 更新缓存
								var userInfo = this.$TOOL.data.get("USER_INFO")
								userInfo.avatar = this.form.avatar
								userInfo.name = this.form.name
								userInfo.user_name = this.form.user_name
								userInfo.sex = this.form.sex
								userInfo.birthday = this.form.birthday
								userInfo.about = this.form.about
								this.$TOOL.data.set("USER_INFO", userInfo)

								// 刷新浏览器
								location.reload()
							}else{
								this.$alert(res.message, "提示", {type: 'error'})
							}
						}catch (error) {
							this.isSaveing = false;
						}
					}else{
						return false;
					}
				})
			}

		}
	}
</script>

<style>
</style>

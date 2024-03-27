<template>
	<el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">

		<!-- <el-form-item prop="user">
			<el-input v-model="form.user" prefix-icon="el-icon-user" clearable :placeholder="$t('login.userPlaceholder')">
				<template #append>
					<el-select v-model="userType" style="width: 130px;">
						<el-option :label="$t('login.admin')" value="admin"></el-option>
						<el-option :label="$t('login.user')" value="user"></el-option>
					</el-select>
				</template>
			</el-input>
		</el-form-item> -->

		<!-- 用户名 -->
		<el-form-item prop="user">
			<el-input v-model="form.user" prefix-icon="el-icon-user" clearable :placeholder="$t('login.userPlaceholder')">
			</el-input>
		</el-form-item>
		<!-- 密码 -->
		<el-form-item prop="password">
			<el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password :placeholder="$t('login.PWPlaceholder')"></el-input>
		</el-form-item>
		<!-- 验证码 -->
		<el-form-item prop="code">
			<el-input v-model="form.code" style="width: 70%;" maxlength="5" minlength="5" clearable prefix-icon="el-icon-edit" :placeholder="$t('login.numberCodeError')"></el-input>
			<el-image style="width: 8rem; margin-left: 1rem;" :src="captcha" fit="fill" alt="验证码" @click="getCaptcha"></el-image>
		</el-form-item>
		<el-form-item style="margin-bottom: 10px;">
				<!-- 24小时免登录 -->
				<el-col :span="12">
					<el-checkbox :label="$t('login.rememberMe')" v-model="form.autologin"></el-checkbox>
				</el-col>
				<!-- 忘记密码 -->
				<!-- <el-col :span="12" class="login-forgot">
					<router-link to="/reset_password">{{ $t('login.forgetPassword') }}？</router-link>
				</el-col> -->
		</el-form-item>
		<!-- 登录 -->
		<el-form-item>
			<el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">{{ $t('login.signIn') }}</el-button>
		</el-form-item>
		<!-- 还没有账号? 创建新账号 -->
		<!-- <div class="login-reg">
			{{$t('login.noAccount')}} <router-link to="/user_register">{{$t('login.createAccount')}}</router-link>
		</div> -->
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				userType: 'admin',
				captcha: '',
				// 表单字段
				form: {
					user: "",
					password: "",
					code: "",
					autologin: false,
					time: "",
				},
				// 验证
				rules: {
					user: [
						{required: true, message: this.$t('login.userError'), trigger: 'blur'}
					],
					password: [
						{required: true, message: this.$t('login.PWError'), trigger: 'blur'}
					],
					code: [
						{required: true, message: this.$t('login.numberCodeError'), trigger: 'blur'}
					]
				},
				islogin: false,
			}
		},
		watch:{
			userType(val){
				if(val == 'admin'){
					this.form.user = ''
					this.form.password = ''
				}else if(val == 'user'){
					this.form.user = ''
					this.form.password = ''
				}
			}
		},
		mounted() {
			this.getCaptcha()
		},
		methods: {
			async getCaptcha(){
				try {
					//获取验证码
					var data = await this.$API.auth.captcha.get()
					if(data.code == 200){
						this.captcha = data.data.captcha
						this.form.time = data.data.time
					}else{
						this.$message.warning('验证码加载失败！')
						return false
					}
				}catch (error) {
					this.isSaveing = false;
				}
			},
			async login(){

				var validate = await this.$refs.loginForm.validate().catch(()=>{})
				if(!validate){ return false }
				try {
					this.islogin = true
					//获取token
					var user = await this.$API.auth.token.post(this.form)
					if(user.code == 200){
						this.$TOOL.cookie.set("TOKEN", user.data.token, {
							expires: this.form.autologin? 24*60*60 : 0
						})
						this.$TOOL.data.set("USER_INFO", user.data.userInfo)
					}else{
						this.islogin = false
						this.$message.warning(user.message)
						this.getCaptcha()
						return false
					}
					//获取菜单
					var menu = null
					// if(this.form.user == 'admin'){
					// 	menu = await this.$API.system.menu.myMenus.get()
					// }else{
					// 	menu = await this.$API.demo.menu.get()
					// }
					menu = await this.$API.system.menu.myMenus.get()
					if(menu.code == 200){
						if(menu.data.menu.length==0){
							this.islogin = false
							this.$alert("当前用户无任何菜单权限，请联系系统管理员", "无权限访问", {
								type: 'error',
								center: true
							})
							return false
						}
						this.$TOOL.data.set("MENU", menu.data.menu)
						this.$TOOL.data.set("PERMISSIONS", menu.data.permissions)
						this.$TOOL.data.set("DASHBOARDGRID", menu.data.dashboardGrid)
					}else{
						this.islogin = false
						this.$message.warning(menu.message)
						return false
					}

					this.$router.replace({
						path: '/'
					})
					this.$message.success("Login Success 登录成功")
					this.islogin = false

				}catch (error) {
					this.islogin = false;
				}
			},
		}
	}
</script>

<style>
</style>

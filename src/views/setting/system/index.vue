<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">

				<el-tab-pane label="系统设置">
					<el-form ref="form" :model="sys" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="系统名称">
							<el-input v-model="sys.name"></el-input>
						</el-form-item>
						<el-form-item label="LogoUrl">
							<sc-upload v-model="sys.logoUrl" title="上传logo"></sc-upload>
						</el-form-item>
						<el-form-item label="密码验证规则">
							<el-input v-model="sys.passwordRules"></el-input>
						</el-form-item>
						<el-form-item label="禁止IP">
							<el-input type="textarea" :autosize="{minRows: 4}" v-model="sys.banIp"></el-input>
						</el-form-item>
						<el-form-item label="版权号">
							<el-input v-model="sys.copyrightNumber"></el-input>
						</el-form-item>
						<el-form-item label="版权信息">
							<el-input type="textarea" :autosize="{minRows: 4}" v-model="sys.copyright"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="editSys">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="短信配置">
					<el-form ref="form" :model="sms" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="短信开关">
							<el-switch v-model="sms.sms_open"></el-switch>
							<div class="el-form-item-msg" data-v-b33b3cf8="">关闭后用户无法收到短信，但日志中将记录</div>
						</el-form-item>
						<el-form-item label="签名">
							<el-input v-model="sms.sms_signature"></el-input>
						</el-form-item>
						<el-form-item label="AppKey">
							<el-input v-model="sms.sms_appKey"></el-input>
						</el-form-item>
						<el-form-item label="SecretKey">
							<el-input v-model="sms.sms_secretKey"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="editSms">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="扩展配置">
					<el-alert title="扩展配置为系统业务所有的配置，应该由系统管理员操作，如需用户配置应另起业务配置页面。" type="warning" style="margin-bottom: 15px;"></el-alert>
					<el-table :data="setting" stripe>
						<el-table-column label="#" type="index" width="50"></el-table-column>
						<el-table-column label="键" prop="key" width="150">
							<template #default="scope">
								<el-input v-if="scope.row.isSet" v-model="scope.row.key" placeholder="请输入内容"></el-input>
								<span v-else>{{scope.row.key}}</span>
							</template>
						</el-table-column>
						<el-table-column label="值" prop="value" width="350">
							<template #default="scope">
								<template v-if="scope.row.isSet">
									<el-switch v-if="typeof scope.row.value==='boolean'" v-model="scope.row.value"></el-switch>
									<el-input v-else v-model="scope.row.value" placeholder="请输入内容"></el-input>
								</template>
								<span v-else>{{scope.row.value}}</span>
							</template>
						</el-table-column>
						<el-table-column label="分类" prop="category" width="150">
							<template #default="scope">
								<el-input v-if="scope.row.isSet" v-model="scope.row.category" placeholder="请输入内容"></el-input>
								<span v-else>{{scope.row.category}}</span>
							</template>
						</el-table-column>
						<el-table-column label="标题" prop="title" width="350">
							<template #default="scope">
								<el-input v-if="scope.row.isSet" v-model="scope.row.title" placeholder="请输入内容"></el-input>
								<span v-else>{{scope.row.title}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="1"></el-table-column>
						<el-table-column label="操作" fixed="right" width="120">
							<template #default="scope">
								<el-button-group>
									<el-button @click="table_edit(scope.row, scope.$index)" text type="primary" size="small">{{scope.row.isSet?'保存':"修改"}}</el-button>
									<el-button v-if="scope.row.isSet" @click="scope.row.isSet=false" text type="primary" size="small">取消</el-button>
									<el-popconfirm v-if="!scope.row.isSet" title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
										<template #reference>
											<el-button text type="primary" size="small">删除</el-button>
										</template>
									</el-popconfirm>
								</el-button-group>
							</template>
						</el-table-column>
					</el-table>
					<el-button type="primary" icon="el-icon-plus" :loading="isSaveing" @click="table_add" style="margin-top: 20px;"></el-button>
				</el-tab-pane>

			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'system',
		data() {
			return {
				sys: {
					login : true
				},
				sms: {},
				setting: [],
				isSaveing: false,
			}
		},
		mounted() {
			this.getConfig()
		},
		methods: {
			async getConfig(){
				var res = await this.$API.system.config.list.get({paging: false});
				this.sys = res.data.sys;
				this.sms = res.data.sms;
				this.setting = res.data.setting;
			},
			async editSys(){
				this.isSaveing = true;
				var res = await this.$API.system.config.editSys.put(this.sys)
				this.isSaveing = false;
				if(res.code == 200){
					this.$emit('success', this.form, this.mode)
					this.visible = false;
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			async editSms(){
				this.isSaveing = true;
				var res = await this.$API.system.config.editSms.put(this.sms)
				this.isSaveing = false;
				if(res.code == 200){
					this.$emit('success', this.form, this.mode)
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			async table_add(){
				var newRow = {
					key: "",
					value: "",
					title: "",
					isSet: true,
					type: 3,
					category: 'url'
				}
				var res = await this.$API.system.config.add.post(newRow)
				if(res.code == 200){
					newRow.id = res.data.id
					console.log(newRow,'newRow')
					this.setting.push(newRow)

					this.$emit('success', this.form, this.mode)
					this.visible = false;
					this.$message.success("操作成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}

			},
			async table_edit(row){
				if(row.isSet){
					this.$API.system.config.edit.put({
						id: row.id,
						key: row.key,
						value: row.value,
						title: row.title,
						type: row.type,
						category: row.category,
					})
					row.isSet = false
				}else{
					row.isSet = true
				}
			},
			table_del(row, index){
				this.$API.system.config.delete.delete(row.id)
				this.setting.splice(index, 1)
			},
		}
	}
</script>

<style>
</style>

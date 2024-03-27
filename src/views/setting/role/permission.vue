<template>
	<el-dialog title="角色权限设置" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-tabs tab-position="top">
			<el-tab-pane label="菜单权限">
				<div class="treeMain">
					<el-tree ref="menu" node-key="id" :data="menu.list" :props="menu.props" show-checkbox></el-tree>
				</div>
			</el-tab-pane>
<!--			<el-tab-pane label="数据权限">-->
<!--				<el-form label-width="100px" label-position="left">-->
<!--					<el-form-item label="规则类型">-->
<!--						<el-select v-model="data.dataType" placeholder="请选择">-->
<!--							<el-option label="全部可见" value="1"></el-option>-->
<!--							<el-option label="本人可见" value="2"></el-option>-->
<!--							<el-option label="所在部门可见" value="3"></el-option>-->
<!--							<el-option label="所在部门及子级可见" value="4"></el-option>-->
<!--							<el-option label="选择的部门可见" value="5"></el-option>-->
<!--							<el-option label="自定义" value="6"></el-option>-->
<!--						</el-select>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="选择部门" v-show="data.dataType=='5'">-->
<!--						<div class="treeMain" style="width: 100%;">-->
<!--							<el-tree ref="dept" node-key="id" :data="data.list" :props="data.props" show-checkbox></el-tree>-->
<!--						</div>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="规则值" v-show="data.dataType=='6'">-->
<!--						<el-input v-model="data.rule" clearable categories="textarea" :rows="6" placeholder="请输入自定义规则代码"></el-input>-->
<!--					</el-form-item>-->
<!--				</el-form>-->
<!--			</el-tab-pane>-->
			<el-tab-pane label="控制台模块">
				<div class="treeMain">
					<el-tree ref="grid" node-key="key" :data="grid.list" :props="grid.props" :default-checked-keys="grid.checked" show-checkbox></el-tree>
				</div>
			</el-tab-pane>
			<el-tab-pane label="控制台">
				<el-form label-width="100px" label-position="left">
					<el-form-item label="控制台视图">
						<el-select v-model="dashboard" placeholder="请选择">
							<el-option v-for="item in dashboardOptions" :key="item.value" :label="item.label" :value="item.value">
								<span style="float: left">{{ item.label }}</span>
								<span style="float: right; color: #8492a6; font-size: 12px">{{ item.views }}</span>
							</el-option>
						</el-select>
						<div class="el-form-item-msg">用于控制角色登录后控制台的视图</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				parent_id: 0,
				visible: false,
				isSaveing: false,
				menu: {
					list: [],
					checked: [],
					props: {
						label: (data)=>{
							return data.meta.title
						}
					}
				},
				grid: {
					list: [],
					checked: ["welcome", "ver", "time", "progress", "echarts", "about"],
					props: {
						label: (data)=>{
							return data.title
						},
						disabled: (data)=>{
							return data.isFixed
						}
					}
				},
				data: {
					dataType :"1",
					list: [],
					checked: [],
					props: {},
					rule: ""
				},
				dashboard: "0",
				dashboardOptions: [
					{
						value: '0',
						label: '数据统计',
						views: 'stats'

					},
					{
						value: '1',
						label: '工作台',
						views: 'work'
					},
				]
			}
		},
		mounted() {
			this.getMenu()
			// this.getDept()
			this.getGrid()
		},
		methods: {
			open(id){
				this.visible = true;
				this.parent_id = id;
				return this
			},
			submit(){
				this.isSaveing = true;
				//选中的和半选的合并后传值接口
				var checkedKeys = this.$refs.menu.getCheckedKeys().concat(this.$refs.menu.getHalfCheckedKeys())

				try {
					// 保存权限
					this.$API.system.role.roleAsMenu.get({ role: this.parent_id, menu: checkedKeys.join(',') });

					setTimeout(()=>{
						this.isSaveing = false;
						this.visible = false;
						this.$message.success("操作成功")
						this.$emit('success')
					},1000)
				} catch (error) {
					console.error('Error:', error);
				}
			},
			async getMenu(){
				try {
					// 异步获取菜单数据
					const res = await this.$API.system.menu.list.get();
					const list = await this.$API.system.menu.chackMenu.get(this.parent_id);

					// 确保 'menu' 对象存在并初始化 'checked' 数组
					this.menu = this.menu || {};
					this.menu.list = res.data;
					this.menu.checked = list.data; // 默认选中

					// 等待菜单组件渲染完毕并数据加载完成
					await this.$nextTick();

					// 检查节点是否存在后再调用 getNode
					if (this.$refs.menu && this.$refs.menu.getNode) {
						// 过滤掉没有叶子节点的键
						let filterKeys = this.menu.checked.filter(key => {
							const node = this.$refs.menu.getNode(key);
							return node && node.isLeaf;
						});
						// 在菜单中设置选中的键
						this.$refs.menu.setCheckedKeys(filterKeys, true);
					} else {
						console.error('错误：无法访问菜单组件或 getNode 方法。');
					}
				} catch (error) {
					console.error('获取菜单列表时出错：', error);
				}
			},
			async getDept(){
				try{
					var res = await this.$API.system.dept.list.get();
					this.data.list = res.data
					this.data.checked = ["12", "2", "21", "22", "1"]
					this.$nextTick(() => {
						let filterKeys = this.data.checked.filter(key => this.$refs.dept.getNode(key).isLeaf)
						this.$refs.dept.setCheckedKeys(filterKeys, true)
					})
				} catch (error) {
					console.error('Error:', error);
				}
			},
			getGrid(){
				this.grid.list = [
					{
						key: "welcome",
						title: "欢迎",
						isFixed: true
					},
					{
						key: "ver",
						title: "版本信息",
						isFixed: true
					},
					{
						key: "time",
						title: "时钟"
					},
					{
						key: "progress",
						title: "进度环"
					},
					{
						key: "echarts",
						title: "实时收入"
					},
					{
						key: "about",
						title: "关于项目"
					}
				]
			}
		}
	}
</script>

<style scoped>
	.treeMain {height:280px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>

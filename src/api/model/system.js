import config from "@/config"
import http from "@/utils/request"

export default {
	sysver: {
		url: `${config.API_URL}/sysver`,
		name: "获取最新版本号",
		get: async function (params) {
			return await http.get(this.url, params);
		}
	},
	menu: {
		myMenus: {
			url: `${config.API_URL}/myMenu`,
			name: "获取我的菜单",
			get: async function () {
				return await http.get(this.url);
			}
		},
		chackMenu: {
			url: `${config.API_URL}/chackMenu`,
			name: "获取菜单",
			get: async function (role) {
				return await http.get(this.url + '/' + role);
			}
		},
		list: {
			url: `${config.API_URL}/sysMenu`,
			name: "获取菜单",
			get: async function () {
				return await http.get(this.url);
			}
		},
		info: {
			url: `${config.API_URL}/sysMenu`,
			name: "获取菜单详细",
			get: async function (id) {
				return await http.get(this.url, id);
			}
		},
		add: {
			url: `${config.API_URL}/sysMenu`,
			name: "创建菜单",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/sysMenu`,
			name: "编辑菜单",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/sysMenu`,
			name: "删除菜单",
			delete: async function (ids) {
				if (ids)
					return await http.delete(this.url + '/' + ids);
			}
		},
	},
	dic: {
		tree: {
			url: `${config.API_URL}/sysDicTree`,
			name: "获取字典树",
			get: async function () {
				return await http.get(this.url);
			}
		},
		typeAdd: {
			url: `${config.API_URL}/sysDicType`,
			name: "创建数据字典分类",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		typeEdit: {
			url: `${config.API_URL}/sysDicType`,
			name: "编辑数据字典分类",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		typeDelete: {
			url: `${config.API_URL}/sysDicType`,
			name: "删除数据字典分类",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
		list: {
			url: `${config.API_URL}/sysDic`,
			name: "字典明细",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/sysDic`,
			name: "创建数据字典",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/sysDic`,
			name: "编辑数据字典",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/sysDic`,
			name: "删除数据字典",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
	},
	role: {
		list: {
			url: `${config.API_URL}/sysRole`,
			name: "获取角色列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/sysRole`,
			name: "创建角色",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/sysRole`,
			name: "编辑角色",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/sysRole`,
			name: "删除角色",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
		roleAsMenu: {
			url: `${config.API_URL}/sysRoleAsMenu`,
			name: "权限关联角色",
			get: async function (data = {}) {
				return await http.get(this.url, data);
			}
		},
	},
	user: {
		list: {
			url: `${config.API_URL}/sysUser`,
			name: "获取用户列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		info: {
			url: `${config.API_URL}/sysUser`,
			name: "获取用户列表详细",
			get: async function (id) {
				return await http.get(this.url, id);
			}
		},
		add: {
			url: `${config.API_URL}/sysUser`,
			name: "创建用户列表",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/sysUser`,
			name: "编辑用户列表",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/sysUser`,
			name: "删除用户列表",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
		password: {
			url: `${config.API_URL}/password`,
			name: "修改密码",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		}
	},
	log: {
		list: {
			url: `${config.API_URL}/sysLog`,
			name: "获取当前用户操作日志的列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		}
	},
	config: {
		list: {
			url: `${config.API_URL}/sysConfig`,
			name: "获取配置",
			get: async function (data) {
				return await http.get(this.url, data);
			}
		},
		add: {
			url: `${config.API_URL}/sysConfig`,
			name: "创建配置",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/sysConfig`,
			name: "编辑配置",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		editSys: {
			url: `${config.API_URL}/editSysConfig`,
			name: "创建SYS配置",
			put: async function (data = {}) {
				return await http.put(this.url, data);
			}
		},
		editSms: {
			url: `${config.API_URL}/editSmsConfig`,
			name: "创建SMS配置",
			put: async function (data = {}) {
				return await http.put(this.url, data);
			}
		},
		delete: {
			url: `${config.API_URL}/sysConfig`,
			name: "删除配置",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		}
	},
	agreement: {
		list: {
			url: `${config.API_URL}/agreement`,
				name: "获取协议配置",
				get: async function (data) {
				return await http.get(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/agreement`,
				name: "编辑协议配置",
				put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		}
	},
	generate: {
		list: {
			url: `${config.API_URL}/generate`,
			name: "代码生成器列表",
			get: async function (data= {}) {
				return await http.get(this.url, data);
			}
		},
		add: {
			url: `${config.API_URL}/generate`,
			name: "生成代码",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		}
	},
	notice: {
		list: {
			url: `${config.API_URL}/notice`,
			name: "获取通知列表",
			get: async function () {
				return await http.get(this.url);
			}
		},
		info: {
			url: `${config.API_URL}/notice`,
			name: "获取通知详细",
			get: async function (id) {
				return await http.get(this.url +'/'+ id);
			}
		},
		add: {
			url: `${config.API_URL}/notice`,
			name: "创建通知",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/notice`,
			name: "编辑通知",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/notice`,
			name: "删除通知",
			delete: async function (ids) {
				if (ids)
					return await http.delete(this.url + '/' + ids);
			}
		},
	},
	article: {
		list: {
			url: `${config.API_URL}/article`,
			name: "获取文章列表",
			get: async function () {
				return await http.get(this.url);
			}
		},
		info: {
			url: `${config.API_URL}/article`,
			name: "获取文章详细",
			get: async function (id) {
				return await http.get(this.url +'/'+ id);
			}
		},
		add: {
			url: `${config.API_URL}/article`,
			name: "创建文章",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/article`,
			name: "编辑文章",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/article`,
			name: "删除文章",
			delete: async function (ids) {
				if (ids)
					return await http.delete(this.url + '/' + ids);
			}
		},
	},
	city: {
		cityTree: {
			url: `${config.API_URL}/cityTree`,
			name: "获取行政区划 省市 Tree",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		list: {
			url: `${config.API_URL}/city`,
				name: "获取行政区划管理列表",
				get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/city`,
				name: "创建行政区划管理",
				post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/city`,
				name: "编辑行政区划管理",
				put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/city`,
				name: "删除行政区划管理",
				delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
	},

	table: {
		list: {
			url: `${config.API_URL}/system/table/list`,
			name: "表格列管理列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		info: {
			url: `${config.API_URL}/system/table/info`,
			name: "表格列管理详情",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		}
	},
	tasks: {
		list: {
			url: `${config.API_URL}/system/tasks/list`,
			name: "系统任务管理",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		}
	}
}

import config from "@/config"
import http from "@/utils/request"

export default {
	user: {
		list: {
			url: `${config.API_URL}/member`,
			name: "获取会员列表",
			get: async function (params = {}) {
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/member`,
			name: "创建会员",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/member`,
			name: "编辑会员",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/member`,
			name: "删除会员",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
	},
	level: {
		list: {
			url: `${config.API_URL}/memberLevel`,
			name: "获取会员等级列表",
			get: async function (params = {}) {
				params.sort = 'id'
				params.sortOrder = 'asc'
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/memberLevel`,
			name: "创建会员等级",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/memberLevel`,
			name: "编辑会员等级",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/memberLevel`,
			name: "删除会员等级",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
	}


}

import config from "@/config"
import http from "@/utils/request"

export default {
	categories: {
		listType1: {
			url: `${config.API_URL}/categories`,
			name: "获取分类列表",
			get: async function (params = {}) {
				params.type = 1;
				return await http.get(this.url, params);
			}
		},
		listType2: {
			url: `${config.API_URL}/categories`,
			name: "获取分类列表",
			get: async function (params = {}) {
				params.type = 2;
				return await http.get(this.url, params);
			}
		},
		listType3: {
			url: `${config.API_URL}/categories`,
			name: "获取分类列表",
			get: async function (params = {}) {
				params.type = 3;
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/categories`,
			name: "创建分类",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/categories`,
			name: "编辑分类",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/categories`,
			name: "删除分类",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		},
	},
	articles: {
		list: {
			url: `${config.API_URL}/articles`,
			name: "获取文章列表",
			get: async function (params) {
				params.sort = 'sort'
				params.sortOrder = 'desc';
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/articles`,
			name: "创建文章",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/articles`,
			name: "编辑文章",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/articles`,
			name: "删除文章",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		}
	},
	notices: {
		list: {
			url: `${config.API_URL}/notices`,
			name: "获取通知列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/notices`,
			name: "创建通知",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/notices`,
			name: "编辑通知",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/notices`,
			name: "删除通知",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		}
	},
	advertisements: {
		list: {
			url: `${config.API_URL}/advertisements`,
			name: "获取广告列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.API_URL}/advertisements`,
			name: "创建广告",
			post: async function (data = {}) {
				return await http.post(this.url, data);
			}
		},
		edit: {
			url: `${config.API_URL}/advertisements`,
			name: "编辑广告",
			put: async function (data = {}) {
				return await http.put(this.url + '/' + data.id, data);
			}
		},
		delete: {
			url: `${config.API_URL}/advertisements`,
			name: "删除广告",
			delete: async function (ids) {
				return await http.delete(this.url + '/' + ids);
			}
		}
	},
}

import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `${config.API_URL}/token`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	},
	captcha: {
		url: `${config.API_URL}/captcha`,
		name: '获取验证码',
		get: async function (params) {
			return await http.get(this.url, params);
		}
	}
}

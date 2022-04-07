/**
 *
 * @ 为异步任务添加顶部进度条
 * 异步请求数据使用axios插件
 * axios的请求和响应拦截器，配合进度条
 *
 */
// 导入顶部进度条插件和样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 配置axios
import axios from 'axios';
// 配置NProgress
const config = {
	trickle: false, // 不显示细长进度条
	showSpinner: true, // 显示旋转进度条
	easing: 'ease', // 动画函数类型
	speed: 500 // 进度条速度
};
NProgress.configure(config);
const instance = axios.create({
	timeout: 3000 // 设置延时时间更长，以保证异步请求数据完成，设置的值过小，会提示请求超时警告
});
// 1.拦截器
// axios的请求和响应一旦发生，拦截器即开始工作
// 1.1 请求拦截器
instance.interceptors.request.use(
	(config) => {
		NProgress.start();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
// 1.2 响应拦截器
instance.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(err) => {
		return Promise.reject(err);
	}
);
// 封装get请求函数
export function get(url) {
	return instance.get(url);
}

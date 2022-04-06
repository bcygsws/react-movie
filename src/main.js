// 一、使用react，要安装两个基本的包：react、react-dom
// 1.1 react主要用于组件创建和生命周期相关的包
// 1.2 react-dom主要封装了操作dom相关的包
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
// React全局定义时间格式化
export default React.Component.prototype.dateFormat = (ctime) => {
	let date = new Date(ctime);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1 + '').padStart(2, '0');
	const day = (date.getDate() + '').padStart(2, '0');
	const hours = (date.getHours() + '').padStart(2, '0');
	const minutes = (date.getMinutes() + '').padStart(2, '0');
	const seconds = (date.getSeconds() + '').padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
ReactDOM.render(
	<HashRouter>
		<App></App>
	</HashRouter>,
	document.getElementById('app')
);

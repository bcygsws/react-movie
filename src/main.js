// 一、使用react，要安装两个基本的包：react、react-dom
// 1.1 react主要用于组件创建和生命周期相关的包
// 1.2 react-dom主要封装了操作dom相关的包
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
ReactDOM.render(
	<App></App>,
	document.getElementById('app')
);

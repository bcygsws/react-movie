/**
 *
 * @ 点击某一个展示块，进入详情页
 *
 */
import React from 'react';
// import fetchJsonp from 'fetch-jsonp';
// import { withRouter } from 'react-router-dom';
export default class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 点击的那个电影信息块的唯一id
			id: props.match.params.id
		};
	}
	render() {
		return <div>{this.state.id}</div>;
	}
	UNSAFE_componentWillMount() {
		console.log(this.props);
		// 根据id请求数据
		// 1.可用的数据接口，使用  https://movie.querydata.org/api?id=1302425,从路由属性中获取这个参数，已经绑定到当前组件的state
		// 2.使用fetch请求数据,有时候报错如下：可以转换思路，改用fetch-jsonp尝试
		/* 
		ccess to fetch at 'https://movie.querydata.org/api?id={this.state.id}' from origin 'http://localhost:3002' 
		has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
		 If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS
		  disabled.
		*/
		fetch(`https://movie.querydata.org/api?id=${this.state.id}`)
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				console.log(res);
			});
	}
	// 封装根据id请求详情数据的方法
	// 	getDetail = () => {
	// 		fetch('https://movie.querydata.org/api?id=1291841')
	// 			.then((response) => {
	// 				console.log(response);
	// 				return response.json();
	// 			})
	// 			.then((res) => {
	// 				console.log(res);
	// 			});
	// 	};
}
// export default withRouter(Detail);

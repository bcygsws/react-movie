/**
 *
 * @ 点击某一个展示块，进入详情页
 *
 */
import React from 'react';
// import { withRouter } from 'react-router-dom';
export default class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params
		};
	}
	render() {
		return <div>{this.state.params}</div>;
	}
	// 点击box，根据当前盒子的doubanId进入详情页
	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log(nextProps);
    this.setState({
      params: nextProps.match.params
    })
	}
	UNSAFE_componentWillMount() {
		console.log(this.props.match.params);
		console.log(window.location);
		/**
		 *
		 * @ 使用Context属性
		 * 从App.jsx到Detail.jsx传递这个id
		 *
		 *
		 *
		 */
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

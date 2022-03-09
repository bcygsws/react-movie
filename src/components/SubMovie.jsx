import React from 'react';
import PerMv from './PerMv.jsx';
export default class SubMovie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routeParams: props.match.params
		};
	}
	render() {
		return (
			<div className="sub-movie">
				<h3>这是电影显示页面</h3>
				{this.state.routeParams.type}---
				{this.state.routeParams.page}
				<div>
					<PerMv></PerMv>
				</div>
			</div>
		);
	}
	// 获取进入电影展示内容页面路由的type和page参数
	UNSAFE_componentWillMount() {
		// console.log(this.props.match.params);
	}
	UNSAFE_componentWillUpdate() {
		console.log(this.props.match.params);
	}
}

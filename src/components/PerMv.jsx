/* SubMovie组件中填充的每一部电影布局 */
import React from 'react';
// import imgURL from '../images/model.jpg';
import Per from '../css/permv.less';
// 导入挂载到prototype上时间格式化方法
import dateFormat from '../main.js';
// 导入评价组件
import { Rate } from 'antd';
// 使用witchRouter获取三大对象
import { withRouter } from 'react-router-dom';
class PerMv extends React.Component {
	// 整个组件所有box响应式布局，在SubMovie里设置相应样式
	/* jsx中不能这样写图片路径，有两种方式，实现1.import URL或者2.使用require()*;.box盒子响应式布局 */

	/**
	 * @ 星级评价规则
	 * [9.5,10] 5星
	 * [9.0,9.5) 4星半
	 * [8.5,9.0) 4星
	 * [8.0,8.5) 3星半
	 * [7.5,8.0) 3星
	 * [7,7.5)   2星
	 * (,7)      1星
	 *	props.imdbRating;
	 *
	 *  */
	constructor(props) {
		super(props);
		this.state = {
			id: props.doubanId
		};
	}
	render() {
		return (
			<div
				className={Per.box}
				onClick={() => {
					this.handleNav();
				}}
			>
				{/* PerMv组件中的box的点击事件，引入withRouter，然后调用一下，可以为当前属性添加location、match和history三大对象 */}
				<img
					src={this.props.data[0].poster}
					width="135"
					height="200"
					alt=""
					className={Per.img}
				/>
				<h2 className={Per._name}>{this.props.data[0].name}</h2>
				<h4 className={Per.time}>
					上映时间：{dateFormat(this.props.createdAt)}
				</h4>
				<h4 className={Per.type}>
					电影类型：{this.props.data[0].genre}
				</h4>
				<h4>语言：{this.props.data[0].language}</h4>
				<h4 className={Per.update}>
					<span> 评分：</span>
					<Rate allowHalf defaultValue={this.rate()} disabled />
				</h4>
			</div>
		);
	}
	rate = () => {
		const rating = parseFloat(this.props.imdbRating);
		let val;
		// case和switch表达式类型一致，都是布尔型
		switch (true) {
			case rating >= 9.5:
				val = 5;
				break;
			case rating >= 9.0:
				val = 4.5;
				break;
			case rating >= 8.5:
				val = 4;
				break;
			case rating >= 8.0:
				val = 3.5;
				break;
			case rating >= 7.5:
				val = 3;
				break;
			case rating >= 7.0:
				val = 2.5;
				break;
			default:
				val = 2;
		}
		return val;
	};
	// 编程式导航，进入该id所对应的详情页
	handleNav = () => {
		// 返回结果是一个对象，是当前条目的详细数据
		console.log(this.props);
		// 编程式导航，跳转至详情页
		/* bug3:报错:PerMv.jsx:121 Uncaught TypeError: Cannot read properties of undefined (reading 'push'),使用witchRouter把
		props的history、match和location三大对象加进去 */
		this.props.history.push('/details/' + this.state.id);
	};
}
export default withRouter(PerMv);

/* SubMovie组件中填充的每一部电影布局 */
import React from 'react';
// import imgURL from '../images/model.jpg';
import Per from '../css/permv.less';
// 导入挂载到prototype上时间格式化方法
import dateFormat from '../main.js';
// 导入评价组件
import { Rate } from 'antd';
// 使用witchRouter获取三大对象
// import { withRouter } from 'react-router-dom';
export default class PerMv extends React.Component {
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
		this.props.history.push('/movie/details/' + this.state.id);
	};
}
// export default withRouter(PerMv);
/**
 *
 * @ bug4：
 * 在当前组件-PerMv中，有一个点击.box，编程式导航的操作
 *
 * 点击.box，导航至“详情页”，然而会报一个错误：PerMv.jsx:124 Uncaught TypeError: Cannot read properties of undefined (reading 'push')
 * 不能读取属性push,问题出在this.props中没有history属性；因此this.props.history就是undefined，后面再调用push方法是不可能实现的
 * 解决方案1：
 * 1.须知PerMv是SubMovie的子组件，在SubMovie组件中循环渲染PerMv时，可以为PerMv绑定一个history属性或者直接使用属性扩散将
 * this.props传递
 *
 * 	1.1 <PerMv{...item} key={index} {...this.props}></PerMv>
 *  1.2 编程式导航中只用到history,绑定属性this.props中的history也是可以的
 *  <PerMv{...item} key={index} history={this.props.history}></PerMv>
 *
 * 解决方案2：
 * 使用withRouter插件，它来自react-router-dom这个包，和Route Link Switch等路由相关标签一样，按需导入一下即可
 * 2.1 引入，import {withRouter} from  'react-router-dom';
 * 2.2 在PerMv组件中，使用export default withRouter(PerMv);导出当前组件使用withRouter(PerMv)调用后的组件
 * 
 * 本项目中使用方案1，属性扩散的方式，传递this.props
 *
 *
 *
 *
 *
 */

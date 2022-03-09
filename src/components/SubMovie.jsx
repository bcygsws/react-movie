import React from 'react';
import PerMv from './PerMv.jsx';
// 导入分页组件
import { Pagination, Spin } from 'antd';
// // 使用withRouter
// import { withRouter } from 'react-router-dom';
/**
 * @ 参考文档：https://www.jianshu.com/p/8d3cf411a639
 * 高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象
 * history, location, match就会被放进这个组件的props属性中
 *
 *
 */
// 导入模块化样式
import Sub from '../css/submv.less';
class SubMovie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routeParams: props.match.params,
			// 存储电影信息列表
			list: [],
			// 每页的容量
			pageSize: 10, // 默认值50
			curPage: 1, // 默认为1，即在第1页
			type: '', // 电影类型
			total: 250, // 给固定值250
			// Spin动画，提示加载中，动画工作一定时间后，展示电影页面，isLoading:true默认值，表示正在加载
			isLoading: true
		};
	}
	render() {
		return (
			<div className={Sub.sub_movie}>
				{/* <h3>这是电影显示页面</h3> */}
				{/* 	{this.state.routeParams.type}--- */}
				{/* this.state.routeParams.page} */}
				{this.animationHandle()}
			</div>
		);
	}
	// 页码变化的事件处理函数
	changeHandle(page) {
		console.log(page);
		this.setState({
			curPage: page
		});
		this.getList(this.state.curPage);
	}
	// 加载动画控制函数，状态量isLoading:true;是默认值，表示正在加载动画
	animationHandle = () => {
		if (this.state.isLoading) {
			return <Spin tip="加载中..." className={Sub.myspin}></Spin>;
		} else {
			return (
				<div>
					<div className={Sub.parent}>
						{/* 循环渲染每个电影信息展示块 */}
						{this.state.list.map((item, index) => {
							return (
								<PerMv {...item.data[0]} key={index}></PerMv>
							);
						})}
					</div>
					{/* 分页 */}
					<Pagination
						defaultCurrent={this.state.curPage}
						total={this.state.total}
						pageSize={this.state.pageSize}
						onChange={this.changeHandle.bind(this)}
					/>
				</div>
			);
		}
	};
	// 将请求数据单独封装成一个函数getList
	getList = (page) => {
		// console.log(this);
		// console.log('ok');
		/**
		 *
		 * @ ES6使用fetch API,来请求数据；当使用fetch获取数据时，第一个then中是获取不到对象的，返回的是一个response对象，可以通过response.json()拿到一个promise
		 * 实例，这个promise.then才能拿到数据
		 *
		 * https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=100&page_start=0
		 *
		 * 其中tag和sort可以参考：
		 * https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0
		 * sort=recommend 按照热度排名
		 * sort=time 按照时间排序
		 * sort=rank 按照评价排序
		 *
		 * tag=热门 热门
		 * tag=最新 最新
		 * tag=经典  经典
		 *
		 */

		// fetch('http://www.liulongbin.top:3005/api/getlunbo')
		// 	.then(
		// 		(res) => {
		// 			console.log(res);
		// 			return res.json(); // 返回一个promise实例
		// 		},
		// 		(rej) => {
		// 			console.log(rej);
		// 		}
		// 	)
		// 	.then((data) => {
		// 		console.log(data);
		// 	});

		// top250电影接口
		fetch(
			`https://api.wmdb.tv/api/v1/top?type=Imdb&skip=${page}&limit=${this.state.pageSize}&lang=Cn`
		)
			.then((response) => {
				console.log(response);
				// 响应数据流，使用json处理
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				this.state.list = data;
				// data是一个数组，如果长度为0，就是空数组data.length===0
				if (data.length) {
					this.setState({
						isLoading: false
					});
				}
			});
	};
	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		this.setState({
			routeParams: nextProps.match.params
		});
	}
	// vue项目的一个接口，根路径是：http://www.liulongbin.top:3005
	// 使用fetch来请求后台数据
	UNSAFE_componentWillMount() {
		// 需求：在App.jsx中配置的带参数的路由/movie/top250/10，参数要获取到，根据这些参数，去后台请求数据，这在项目中非常普遍
		// vue中 this.$route.params获取带参数的路由的参数值
		// React中使用this.props.match.params获取参数数据,关联到当前组件SubMovie的state私有数据上
		// console.log(this.state.routeParams);
		// a.模拟数据加载的过程，数据请求完成后，isLoading，通过state来改名，必定触发页面更新，页面更新，必然重新渲染render函数，
		// 进而调用this.animationHandle()
		//b.假设2s后数据回来
		// setTimeout(() => {
		// 	this.setState({
		// 		isLoading: false
		// 	});
		// }, 2000);
		// c.项目中做法，在请求数据中判断
		this.getList(this.state.curPage);
	}
}
export default SubMovie;

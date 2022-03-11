import React from 'react';
import PerMv from './PerMv.jsx';
// 引入fetchJsonp对象
// import fetchJsonp from 'fetch-jsonp';
// 导入分页组件
import { Pagination, Spin, Alert } from 'antd';
/**
 * @ 参考文档：https://www.jianshu.com/p/8d3cf411a639
 * 高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象
 * history, location, match就会被放进这个组件的props属性中
 *
 *
 */
// 导入模块化样式
import Sub from '../css/submv.less';
export default class SubMovie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 存储电影信息列表
			list: [],
			// 每页的容量
			pageSize: 10, // 默认值50
			curPage: parseInt(props.match.params.page), // 默认为1，即在第1页
			type: props.match.params.type, // 电影类型
			total: 250, // 给固定值250
			// Spin动画，提示加载中，动画工作一定时间后，展示电影页面，isLoading:true默认值，表示正在加载
			isLoading: true
		};
	}
	render() {
		return (
			<div className={Sub.sub_movie}>
				{/* <h3>这是电影显示页面</h3> */}
				{this.state.type}------
				{this.state.curPage}
				{this.animationHandle()}
			</div>
		);
	}
	// 页码变化的事件处理函数
	changeHandle(page) {
		console.log(page);
		// this.setState({
		// 	curPage: page
		// });
		console.log(this.props);
		// 重点：
		// 1.编程式导航，跳转到url新地址。等同于Movie.jsx中匹配的路由地址变化了，那么组件SubMovie.jsx依赖的属性this.props.match.params
		// 必然发生变化。即：生命周期钩子componentWillReceiveProps()将再次执行；因此，【页码变化+编程式导航跳转新路由】，更新数据列表
		// 都在钩子componentWillReceiveProps里面处理
		// 2.在这里无需调用this.setState和this.getList(page)
		this.props.history.push('/movie/' + this.state.type + '/' + page);
		// this.getList(page);
	}
	// 加载动画控制函数，状态量isLoading:true;是默认值，表示正在加载动画
	animationHandle = () => {
		if (this.state.isLoading) {
			return (
				<Spin tip="加载中..." className={Sub.myspin}>
					<Alert
						message="正在加载电影列表"
						description="精彩内容，马上呈现……"
						type="info"
					/>
				</Spin>
			);
		} else {
			return (
				<div>
					<div className={Sub.parent}>
						{/* 循环渲染每个电影信息展示块,要将history作为属性绑定给PerMv，那么PerMv就有了history属性 */}
						{this.state.list.map((item, index) => {
							return <PerMv {...item} key={index} {...this.props}></PerMv>;
						})}
					</div>
					{/* 分页,注意：this.state.curPage只接收number类型，所有改变curPage的地方，都应该保证其数据类型还是number*/}
					<Pagination
						defaultCurrent={this.state.curPage}
						total={this.state.total}
						pageSize={this.state.pageSize}
						onChange={this.changeHandle.bind(this)}
						className={Sub.my_pagination}
					/>
				</div>
			);
		}
	};
	// 将请求数据单独封装成一个函数getList
	getList = (page, type, lang) => {
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
			`https://api.wmdb.tv/api/v1/top?type=${type}&skip=${page}&limit=${this.state.pageSize}&lang=${lang}`
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
					// 从动画切换到电影列表，肯定需要更新页面
					this.setState({
						isLoading: false
					});
				}
			});
		/**
		 * @ 默认的window.fetch可能弹出跨域限制的错误，此时可以使用安装fetch-jsonp的方法来解决。
		 * fetch-jsonp需要安装包，而默认的fetch则不需要装包。但是，使用fetch-jsonp一直提示请求数据超时。
		 * 遂卸载fetch-jsonp包，仍然使用fetch
		 *
		 *
		 */
		// fetchJsonp(
		// 	`https://api.wmdb.tv/api/v1/top?type=Imdb&skip=${page}&limit=${this.state.pageSize}&lang=Cn`
		// )
		// 	.then((response) => {
		// 		console.log(response);
		// 		// 响应数据流，使用json处理
		// 		if (response.status === 200) {
		// 			return response.json();
		// 		}
		// 	})
		// 	.then((data) => {
		// 		console.log(data);
		// 		this.state.list = data;
		// 		// data是一个数组，如果长度为0，就是空数组data.length===0
		// 		if (data.length) {
		// 			this.setState({
		// 				isLoading: false
		// 			});
		// 		}
		// 	});
	};
	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		// this.setState({
		// 	// url路由地址变化，type(电影类型)和page(当前所在有页)变化,isLoading也要重新置位到true,加载一段动画，待数据请求完成，显示当前
		// 	// 路由对应的列表
		// 	type: nextProps.match.params.type,
		// 	curPage: parseInt(nextProps.match.params.page) || 1,
		// 	isLoading: true
		// });
		// 数据改变完成后，再从后台请求数据，使用this.setState(参数一，参数2 callback)
		this.setState(
			{
				// url路由地址变化，type(电影类型)和page(当前所在有页)变化,isLoading也要重新置位到true,加载一段动画，待数据请求完成，显示当前
				// 路由对应的列表
				type: nextProps.match.params.type,
				curPage: parseInt(nextProps.match.params.page) || 1,
				isLoading: true
			},
			() => {
				switch (true) {
					case this.state.type === 'in_theaters':
						this.getList(this.state.curPage, 'Imdb', 'Cn');
						break;
					case this.state.type === 'coming_soon':
						this.getList(this.state.curPage, 'Douban', 'En');
						break;
					case this.state.type === 'top250':
						this.getList(this.state.curPage, 'Imdb', 'En');
				}
			}
		);
		// 向后台请求一次数据，因为组件没有重新创建，数据变化，将进入组件重新渲染的阶段，不会再走componentWillMount钩子了
		// this.getList(this.state.curPage);
		/**
		 *
		 * @ 由于目前只有top250这一个接口能够正常请求数据
		 * 结合接口说明文档：D:\Web前端学习\20200618【Web前端】WEB前端全栈工程师开发基础班+就业班完整版 附完整视频+源码+工具\【27】源码+课件+软件\22-26 拓展课程\23React资料\混合app资料\douban-imdb-api
		 * 为了让切换【正在热映】、【即将上映】、【top25】的界面有所区别：
		 * 制定以下规则：
		 * type===in_theaters,getList中，type传入Imdb,lang传入Cn
		 * type===coming_soon,getList中，type传入Douban,lang传入En
		 * type===top250,getList中，type传入Imdb,lang传入En
		 *
		 *
		 */
	}
	// vue项目的一个接口，根路径是：http://www.liulongbin.top:3005
	// 使用fetch来请求后台数据
	UNSAFE_componentWillMount() {
		// 需求：在App.jsx中配置的带参数的路由/movie/top250/10，参数要获取到，根据这些参数，去后台请求数据，这在项目中非常普遍
		// vue中 this.$route.params获取带参数的路由的参数值
		// React中使用this.props.match.params获取参数数据,关联到当前组件SubMovie的state私有数据上
		console.log(this.state.type + '--------------' + this.state.curPage);
		console.log(this.props);
		// a.模拟数据加载的过程，数据请求完成后，isLoading，通过state来改名，必定触发页面更新，页面更新，必然重新渲染render函数，
		// 进而调用this.animationHandle()
		//b.假设2s后数据回来
		// setTimeout(() => {
		// 	this.setState({
		// 		isLoading: false
		// 	});
		// }, 2000);
		// c.项目中做法，在请求数据中判断
		// 这是初次进入路由的时候，调用的数据请求
		this.getList(this.state.curPage, 'Imdb', 'Cn');
		// this.setState = () => false;
	}
	// 控制台报错：Can't perform a React state update on an unmounted component，解决方案：在组件销毁钩子中添加this.setState语句
	// 组件已经销毁，却还有未结束的异步任务。下列语句，在组件销毁钩子中取消异步任务
	UNSAFE_componentWillUnmount() {
		this.setState = () => false;
	}
}

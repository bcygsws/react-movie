import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route } from 'react-router-dom';
const { Content, Sider } = Layout;
// 导入电影展示的内容页面
import SubMovie from './SubMovie.jsx';

export default class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 路由参数对象
			rParams: props.match.params,
			// 存储返回的电影信息列表,
			list: [],
			cur: 0, // 当前是第1页，索引为0
			pageSize: 50 // 每页容量是50
		};
	}
	render() {
		return (
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						style={{ height: '100%', borderRight: 0 }}
					>
						<Menu.Item key="1">
							<Link to="/movie/in_theaters/1">正在热映</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to="/movie/coming_soon/1">即将上映</Link>
						</Menu.Item>
						<Menu.Item key="3">
							<Link to="/movie/top250/1">Top250</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ paddingLeft: '1px' }}>
					<Content
						style={{
							background: '#fff',
							padding: 24,
							margin: 0,
							height: '100%'
						}}
					>
						<Route
							path="/movie/:type/:page"
							component={SubMovie}
							exact
						></Route>
					</Content>
				</Layout>
			</Layout>
		);
	}
	// vue项目的一个接口，根路径是：http://www.liulongbin.top:3005
	// 使用fetch来请求后台数据
	UNSAFE_componentWillMount() {
		// 需求：在App.jsx中配置的带参数的路由/movie/top250/10，参数要获取到，根据这些参数，去后台请求数据，这在项目中非常普遍
		// vue中 this.$route.params获取带参数的路由的参数值
		// React中使用this.props.match.params获取参数数据
		// console.log(this.props.match.params);
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
			'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn'
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
			});
	}
}

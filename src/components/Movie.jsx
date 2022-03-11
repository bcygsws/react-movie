import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import SubMovie from './SubMovie.jsx';
import Detail from './Detail.jsx';
const { Content, Sider } = Layout;
// 导入电影展示的内容页面
export default class Movie extends React.Component {
	constructor(props) {
		super(props);
		// 重点-编程式重定向推荐使用,区别于声明式重定向
		// 在构造函数中，直接使用this.props.history.push()比在App.jsx 中使用<Redirect from="" to=""/>
		// 这种方法的优点是，地址栏也立即变化。而在Switch标签中嵌入Redirect（单标签），初次时，地址栏是不变化的。只有点击到它的子路由后，
		// 地址栏才变成"/movie/in_theaters/1"
		// 写法1：联想this.state
		// this.props.history.push('/movie/in_theaters/1');
		// 写法2：props是在构造函数中的参数，this可以省略
		props.history.push('/movie/in_theaters/1');
	}
	render() {
		return (
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={window.location.hash.slice(2)}
						style={{ height: '100%', borderRight: 0 }}
					>
						<Menu.Item key="movie/in_theaters/1">
							<Link to="/movie/in_theaters/1">正在热映</Link>
						</Menu.Item>
						<Menu.Item key="movie/coming_soon/1">
							<Link to="/movie/coming_soon/1">即将上映</Link>
						</Menu.Item>
						<Menu.Item key="movie/top250/1">
							<Link to="/movie/top250/1">Top250</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ paddingLeft: '1px' }}>
					<Content
						style={{
							padding: 12,
							margin: 0
						}}
					>
						<Switch>
							{/* 1.在React中，可以使用Switch来设定其标签内指定的路由多选其一，可以在匹配到的组件的如：SubMovie中使用this.props.match.params来
						获取路由参数；2.Route中加入exact表示精确匹配，前一个匹配到了，后面的路由将放弃。因为PerMv中编程式导航，去到的路由/movie/detail/id能
						匹配到/movie/:type/:page 。竟然将其真正要匹配的Detail组件忽略，这显示是错误的。因此，需要将params参数少的Route放在上面
						两者顺序是不能交换的*/}
							<Route
								path="/movie/details/:id"
								component={Detail}
								exact
							></Route>
							<Route
								path="/movie/:type/:page"
								component={SubMovie}
								exact
							></Route>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		);
	}
	UNSAFE_componentWillMount() {
		console.log(window.location.hash);
	}
}

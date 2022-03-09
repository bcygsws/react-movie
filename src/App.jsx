import React from 'react';
// 导入react-router相关的包，web中使用react-router-dom,可以根据是开发web还是App，选择安装不同的包
// 按需导出常用的三个
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
// import loadable from './utils/loadable.js';
// 导入views中的三个子组件
import Home from './components/Home.jsx';
// Home是主页一开始默认显示，Movie和About组件，使用react-loadable包动态导入。代码优化时，再动态导入组件
// const Movie = loadable(() => import('./components/Movie.jsx'));
// const About = loadable(() => import('./components/About.jsx'));
import Movie from './components/Movie.jsx';
import About from './components/About.jsx';
// 引入DatePicker依赖的样式,在App.jsx文件中引入，安装并配置插件babel-plugin-import按需导入antd组件库
// import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
// 导入样式
import './css/base.less';
import './css/ant.css';
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// defaultKey: 'home'
		};
	}
	render() {
		return (
			<HashRouter>
				<Layout className="layout">
					<Header>
						<div className="logo" />
						{/* bug1：路由切换时，深蓝色背景随之切换。但是，当页面路由在/about时，刷新页面一下。结果【关于】上的路由不变，
						但是，【关于】字样上的深蓝色背景消失了，转而第一个【首页】上却添加了一个深蓝色背景；
						bug解决：*/}
						{/* <Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={this.state.defaultKey}
							style={{ lineHeight: '64px' }}
						> */}
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={window.location.hash.slice(2)}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="home">
								<Link to="/home">首页</Link>
							</Menu.Item>
							<Menu.Item key="movie">
								<Link to="/movie">电影</Link>
							</Menu.Item>
							<Menu.Item key="about">
								<Link to="/about">关于</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Layout>
						<Content>
							<div
								style={{
									background: '#fff',
									height: '100%'
								}}
							>
								<Switch>
									<Route
										path="/home"
										component={Home}
									></Route>
									<Route
										path="/movie"
										component={Movie}
									></Route>
									<Route
										path="/about"
										component={About}
									></Route>
									{/* /movie直接重定向/movie/in_theaters/1 ,注意：Redirect必须放在Switch标签的最后一行*/}
									{/* 这种方式有一个问题 */}
									{/* <Redirect
										from="/movie"
										to="/movie/in_theaters/1"
									/> */}
								</Switch>
							</div>
						</Content>
					</Layout>
					<Footer style={{ textAlign: 'center' }}>
						电影点播平台 ©2018 Created by 江湖夜雨
					</Footer>
				</Layout>
			</HashRouter>
		);
	}
	// 生命周期钩子
	UNSAFE_componentWillMount() {
		// bug1解决1：App.jsx中没有按照预期打印路由地址，走不通
		// console.log(this.props);// {}
		// bug1解决2：Home About Movie子组件中this.props.match.url/path都能拿到路径。需要在路由切换前的刹那，将defaultSelectedKeys
		// 的值动态更改，操作繁琐

		// bug1解决3：解决了问题。使用BOM中window.location来获取当前所在路径。每次手动刷新页面，App组件必将重新创建，重新创建就有生命
		// 周期钩子。
		// 或者直接将window.location.hash.slice(2)放在defaultSelectedKeys={window.location.hash.slice(2)}
		console.log(window.location.hash); // #/home
		// string的slice方法，功能类似substring，两个索引都是前闭后开
		console.log(window.location.hash.slice(2));
		// this.setState({
		// 	defaultKey: window.location.hash.slice(2)
		// });
	}
}
/**
 * @ HashRouter表示一个路由根容器，将来所有路由相关的东西都要包裹在里面，一个网站中HashRouter只出现一次
 * Route 路由规则
 * 两个参数：
 * path="/"
 * component={组件名称}
 *
 * Link表示一个路由链接，类似Vue router-link
 * 1.在src中创建一个根组件App，并导入到main.js中，与此同时App当做ReactDom.render(<App</App>)
 * 2.在App.jsx中按需导入,$ import {HashRouter,Route,Link} from 'react-router-dom';
 * 3.将App.jsx中的顶层div上加上一对HashRouter标签,HashRouter中只能出现一个根元素，上面组件中的div。HashRouter本身不会解析成
 * 任何元素标签,Link默认解析成了a，to="/home",默认解析成了href="#/home"
 * 4.Route除了是一个规则匹配，还时组件填充的占位符
 *
 *
 *
 *
 *
 *
 */

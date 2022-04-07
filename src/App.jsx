import React from 'react';
// 导入react-router相关的包，web中使用react-router-dom,可以根据是开发web还是App，选择安装不同的包
// 按需导出常用的三个
// import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
// import loadable from './utils/loadable.js';
// 导入views中的三个子组件
import Home from './components/Home.jsx';
// Home是主页一开始默认显示，Movie和About组件，使用react-loadable包动态导入。代码优化时，再动态导入组件
// const Movie = loadable(() => import('./components/Movie.jsx'));
// const About = loadable(() => import('./components/About.jsx'));
import Movie from './components/Movie.jsx';
import About from './components/About.jsx';
// 404页面中，不指定路由地址，只指定一个component属性，来显示匹配不到其他路由返回的内容
// import NotFind from './components/NotFind.jsx';
// 引入DatePicker依赖的样式,在App.jsx文件中引入，安装并配置插件babel-plugin-import按需导入antd组件库
// import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
// 导入样式
import './css/base.less';
import './css/ant.css';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// defaultKey: 'home'
		};
		// 监听路由，为路由切换时，指定相对应的标题
		// props.history.listen((location) => {
		// 	console.log(location.pathname);
		// 	this.addTitle(location.pathname);
		// });
	}
	// 封装一个函数，在props.history.listen和componentWillMount两个位置调用，前者负责页面正常切换下，后者负责页面被手动刷新的情况下
	// addTitle = (cur_path) => {
	// 	let routePath = cur_path;
	// 	routePath =
	// 		routePath.split('/') === 2
	// 			? routePath
	// 			: routePath.split('/').slice(0, 3).join('/');
	// 	switch (routePath) {
	// 		case '/home':
	// 			document.title = '主页';
	// 			break;
	// 		case '/about':
	// 			document.title = '关于';
	// 			break;
	// 		case '/movie/details':
	// 			document.title = '电影详情';
	// 			break;
	// 		default:
	// 			document.title = '电影列表';
	// 	}
	// };
	render() {
		console.log(this.props);
		return (
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
						defaultSelectedKeys={[
							window.location.hash.split('/')[1]
						]}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="home">
							<Link to="/home">首页</Link>
						</Menu.Item>
						<Menu.Item key="movie">
							<Link to="/movie/in_theaters/1">电影</Link>
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
								<Route path="/home" component={Home}></Route>
								{/* 省去做/movie自动跳转到/movie/in_theaters/1的过程，Link的to属性：直接设定为/movie/in_theaters/1。但是在
								Route中还是要写/movie,模糊模式下，/movie是可以匹配所有的/movie系列路由,/movie是可以匹配到/movie/in_theaters/1的，
							此处path不能写成/movie/in_theaters/1
							结论：如果某个路由还有有多个子路由，那么在Route中path不能写成子路由其中一个，而应该
							尽可能模糊，让它能匹配到所有的子路由 */}
								<Route path="/movie" component={Movie}></Route>
								<Route path="/about" component={About}></Route>
								{/* /movie直接重定向/movie/in_theaters/1 ,注意：Redirect必须放在Switch标签的最后一行*/}
								{/* 这种方式有一个问题 */}
								{/* <Redirect
										from="/movie"
										to="/movie/in_theaters/1"
									/> */}
								<Redirect from="/" to="/home" exact />
							</Switch>
							{/* <Redirect from="/" to="/home" /> */}
							{/* 无任何匹配跳转至404组件 */}
							{/* 	<Route path="*" component={NotFind}></Route> */}
						</div>
					</Content>
				</Layout>
				<Footer style={{ textAlign: 'center' }}>
					电影点播平台 ©2018 Created by 江湖夜雨
				</Footer>
			</Layout>
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
		console.log(window.location);
		console.log(window.location.hash); // #/home
		// 页面手动刷新，这个生命周期钩子执行
		// this.addTitle(window.location.hash.slice(1));
		// string的slice方法，功能类似substring，两个索引都是前闭后开
		// console.log(window.location.hash.slice(2));
		/**
		 *
		 * @ 问题?为什么App.jsx首次通过window.location.hash能够打印/home?而切换至电影和关于却无法打印相关路由
		 * 1.页面路由从/重定向到/home,此时也是App.jsx组件首次创建，App组件经历创建阶段，当前钩子componentWillMount自然会执行，于是
		 * window.location.hash按照预期打印出来
		 * 2.选择路由按钮，切换【电影】和【关于】的路由，此时会切换至App的子组件Movie或者About组件，但是App组件并没有重新渲染，因此
		 * componentWillMount没有执行，所有正常切换至其他路由不会在当前钩子中打印出hash值
		 * 3.比如：切换至movie的路由，/movie/in_theaters/1,手动刷新一次页面，此时App组件就开始重新基于当前路由(/movie/in_theaters/1)开始
		 * 渲染新的App组件，当前生命周期钩子componentWillMount中能打印出此时的路由
		 * 4.第二级别的路由也是同样地情况，手动刷新/movie/in_theaters/1和/movie/coming_soon/1、/movie/top250/1都会基于当前地址重新创建
		 * Movie组件。也是同样的结果，最初Movie.jsx中componentWillMount只能拿到最开始这个路由，正常切换当前钩子不会打印即时的路由。手动刷新
		 * 触发Movie组件重新创建了，才会打印即时的路由
		 *
		 * 总之，深入理解虚拟dom的diff算法，总会智能地计算出更新dom的最小代价。手动刷新将触发当前组件路由Route所在组件从0开始的创建
		 *
		 */
	}
}
export default App;
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
 * 5.特别注意：withRouter不能传入这种组件：里面有<HashRouter</HashRouter>这对标签的组件，因此，我们将HashRouter移除，放在了
 * main.js文件夹下引入；这种方式改造后，能够保证withRouter传入的组件都在HashRouter的里面，这样就可以使用withRouter这个高阶组件，
 * 为当前组件的props属性添加三个对象history、location、match三个对象了
 *
 *
 *
 *
 *
 *
 *
 */

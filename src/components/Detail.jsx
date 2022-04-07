/**
 *
 * @ 点击某一个展示块，进入详情页
 * 定义一个状态量isLoading控制动画加载和请求完成后的详情页的切换
 *
 *
 */
import React from 'react';
// import fetchJsonp from 'fetch-jsonp';
// import { withRouter } from 'react-router-dom';
// 导入Detail组件样式
import Det from '../css/detail.less';
// 从src/data文件夹下导入模拟数据
import data1 from '../data/detail-1291841.js';
// import data2 from '../data/detail-1851857.js';
// 导入挂载到prototype上时间格式化方法
import dateFormat from '../main.js';
// 动态修改title
import DocumentTitle from 'react-document-title';
import { Spin, Alert, Button, Icon, Rate } from 'antd';
// 导入使用axios封装的get请求方法和拦截器配置恩建
// import { get } from '../utils/index.js';
const ButtonGroup = Button.Group;
// 布局需要的测试图片
// import URLImg from '../images/model.jpg';
export default class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 点击的那个电影信息块的唯一id
			id: props.match.params.id,
			// 默认显示的是加载动画
			isLoading: true,
			// 详情数据data数组
			detail: {}
		};
	}
	render() {
		return (
			<DocumentTitle title="电影详情">
				<div className={Det.box}>
					{/* 	{this.state.id} */}
					{this.controlShow()}
				</div>
			</DocumentTitle>
		);
	}
	// 1.控制显示加载前动画和加载后详情页
	controlShow = () => {
		if (this.state.isLoading) {
			return (
				<Spin tip="加载中...">
					<Alert
						message="详情"
						description="当前电影详情加载中，马上呈现……"
						type="info"
					/>
				</Spin>
			);
		} else {
			// 先让isLoading为true,便于测试详情页界面
			return (
				<dl className={Det.parent}>
					<dt className={Det.content}>
						<ul className={Det.son}>
							{/* className模块化，多个类名可以使用模板字符串处理 */}
							<li className={`${Det.mv_name} ${Det.pub}`}>
								{this.state.detail.data[0].name}
							</li>
							<li className={`${Det.pub} ${Det.rating}`}>
								评分：
								<Rate
									allowHalf
									disabled
									defaultValue={this.showStar(
										this.state.detail.imdbRating
									)}
								/>
								<sup className={Det.up}>
									{this.state.detail.imdbRating}
								</sup>
								推荐
							</li>
							<li className={`${Det.pub}`}>
								别名：{this.state.detail.alias}
							</li>
							<li className={`${Det.pub}`}>
								类型：{this.state.detail.data[0].genre}
							</li>
							<li className={`${Det.pub}`}>
								国家/地区：{this.state.detail.data[0].country}
							</li>
							<li className={`${Det.pub}`}>
								语言：{this.state.detail.data[0].language}
							</li>
							<li className={`${Det.pub}`}>
								上传日期：
								{dateFormat(this.state.detail.createdAt)}
							</li>
							<li className={`${Det.mv_dir} ${Det.pub}`}>
								导演：
								{this.state.detail.director[0].data[0].name}
							</li>
							<li className={`${Det.pub}`}>
								主演：{this.getActors(this.state.detail.actor)}
							</li>

							<li className={`${Det.mv_des} ${Det.pub}`}>
								故事梗概：
								{this.state.detail.data[0].description}
							</li>
							<li>
								<ButtonGroup onClick={this.backList.bind(this)}>
									<Button type="primary">
										<Icon type="left" />
										返回列表
									</Button>
								</ButtonGroup>
							</li>
						</ul>
					</dt>
					<dd className={Det.dd}>
						<img
							src={this.state.detail.data[0].poster}
							title="电影海报"
							alt=""
							height="80%"
						/>
						<p className={Det.p}>
							<span>Pic:《教父2》</span>
						</p>
					</dd>
				</dl>
			);
		}
	};
	// 2.详情返回到列表,go：-1表示后退一个页面，还有goBack()和goForward()函数
	backList() {
		// this.props.history.go(-1);
		this.props.history.goBack(1);
	}
	// 3.评分中，根据评分展示星级
	showStar = (rating) => {
		let val;
		switch (true) {
			// case和switch表达式类型一致，都是布尔型
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
	// 4.返回演员数组
	getActors = (arr) => {
		let str = '';
		arr.forEach((item, index) => {
			// 取前10个演员名字
			if (index <= 9) {
				str = str + '\t' + item.data[0].name;
			}
		});
		return str;
	};
	// 从PerMv中编程式导航，重新匹配了组件，组件Detail是开始重建，则componentWillMount钩子肯定执行
	// 加载中页面默认开始渲染，但是从后台请求数据是个异步操作，所以【加载中……】界面渲染完成后，componentWillMount中请求后台数据异步任务
	// 还在进行。数据请求回来了，使用this.setState()更新虚拟DOM:componentWillUpdate->render->componentDidUpdate
	UNSAFE_componentWillMount() {
		console.log('观察：从动画切换到详情Detail组件我执行几次');
		console.log(this.props);
		// 根据id请求数据
		// 1.可用的数据接口，使用  https://movie.querydata.org/api?id=1302425,从路由属性中获取这个参数，已经绑定到当前组件的state
		// 2.使用fetch请求数据,有时候报错如下：可以转换思路，改用fetch-jsonp尝试
		/* 
		ccess to fetch at 'https://movie.querydata.org/api?id={this.state.id}' from origin 'http://localhost:3002' 
		has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
		 If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS
		  disabled.
		*/
		// get(`https://movie.querydata.org/api?id={this.state.id}`).then(
		// 	(res) => {
		// 		console.log(res);
		// 	}
		// );
		this.getDetail(this.state.id);
	}
	// 封装根据id请求详情数据的方法
	getDetail = (id) => {
		/**
		 *
		 * @ 根据id(PerMv组件编程式导航到本页面，可以使用this.props.match.params.id拿到这个值)
		 * 1.由于请求电影详情的接口，有次数限制
		 * 2.现将id为1291841和1851857的数据放在data/json文件中，然后导入当前模块，使用演示器来模拟异步数据的请求过程
		 *
		 *
		 */
		/* ---------------------分割线1-开始------------------------ */
		// fetch(`https://movie.querydata.org/api?id=${id}`)
		// 	.then((response) => {
		// 		// console.log(response);
		// 		if (response.status === 200) {
		// 			return response.json();
		// 		}
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 		// 		// 参考文档：E:\web-prj\7.javascriptTest\22-Object.keys和Object.getOwnPropertyNames的区别和联系.html
		// 		// 		// 参考文档1：https://www.cnblogs.com/sefaultment/p/9444345.html
		// 		// 		// 1. Object.keys(对象)  返回该对象自身的可枚举属性组成的数组
		// 		// 		// 2. Object.getOwnPropertyNames(对象)  返回该对象自身上的可枚举属性和不可枚举属性组成的数组
		// 		// 		// 3. 对象.hasProperty(key) 对象是否具有某个属性？返回布尔值，不会检查原型上的属性
		// 		// 		// 4. 判断对象是否可以枚举，不能检查原型上的属性，因此即时原型上的属性是可枚举的，也会返回false
		// 		// 		// 5. 唯一涉及原型的，使用for---in循环，它可以遍历对象自身极其原型上的可枚举属性
		// 		if (Object.keys(res).length) {
		// 			// res是一个对象
		// 			// this.state.detail = res;
		// 			console.log(this.state.detail);
		// 			console.log(typeof res);
		// 			// 数据加载完成，从动画切换到详情界面;并且更新数detail数据
		// 			this.setState({
		// 				isLoading: false,
		// 				detail: res
		// 			});
		// 		}
		// 	});
		/* -------------------分割线1-结束------------------------ */
		/* ---------------------分割线2-开始：本地数据模拟。如果想正常从后台请求数据，请注释分割线2之间的代码块------------------------ */
		setTimeout(() => {
			this.setState({
				isLoading: false,
				detail: data1
			});
		}, 2000);

		/* ---------------------分割线2-结束------------------------ */
	};
	UNSAFE_componentWillUnmount() {
		this.setState = () => false;
	}
}
// export default withRouter(Detail);

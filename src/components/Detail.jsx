/**
 *
 * @ 点击某一个展示块，进入详情页
 * 定义一个状态量isLoading控制动画加载和请求完成后的详情页的切换
 *
 *
 */
import React from 'react';
import { Spin, Alert, Button, Icon } from 'antd';
const ButtonGroup = Button.Group;
import fetchJsonp from 'fetch-jsonp';
// import { withRouter } from 'react-router-dom';
// 导入Detail组件样式
import Det from '../css/detail.less';
// 布局需要的测试图片
import URLImg from '../images/model.jpg';
export default class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 点击的那个电影信息块的唯一id
			id: props.match.params.id,
			// 默认显示的是加载动画
			isLoading: true,
			// 详情数据对象
			detail: {}
		};
	}
	render() {
		return (
			<div className={Det.box}>
				{/* 	{this.state.id} */}
				{this.controlShow()}
			</div>
		);
	}
	// 1.控制显示加载前动画和加载后详情页
	controlShow = () => {
		if (false) {
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
								电影名称：教父2
							</li>
							<li className={`${Det.mv_dir} ${Det.pub}`}>
								导演：张艺谋
							</li>
							<li className={`${Det.mv_book} ${Det.pub}`}>
								编剧：王立群
							</li>
							<li className={`${Det.mv_act} ${Det.pub}`}>
								主演：陈凯歌、李行、沈保平、李一桐、李晨、汤敏、吴希泽、赵文卓
							</li>
							<li className={`${Det.mv_des} ${Det.pub}`}>
								剧情梗概：法法果然果然果宝特攻隔热服鼓捣鼓捣奉公守法GV阿股份被更让人尬歌非凡哥如果如果热法非法人味儿共同体通过发打发打发打发打发打发的范德萨打发顺丰方法的撒的份上
							</li>
						</ul>
					</dt>
					<dd className={Det.dd}>
						<img
							src={URLImg}
							title="电影海报"
							alt=""
							height="80%"
						/>
						<p className={Det.p}>
							<span>Pic:《教父2》</span>
						</p>
						<ButtonGroup onClick={this.backList.bind(this)}>
							<Button type="primary">
								<Icon type="left" />
								返回列表
							</Button>
						</ButtonGroup>
					</dd>
				</dl>
			);
		}
	};
	// 详情返回到列表,go：-1表示后退一个页面，还有goBack()和goForward()函数
	backList() {
		// this.props.history.go(-1);
		this.props.history.goBack(1);
	}
	// 从PerMv中编程式导航，重新匹配了组件，组件Detail是开始重建，则componentWillMount钩子肯定执行
	UNSAFE_componentWillMount() {
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
		fetchJsonp(`https://movie.querydata.org/api?id=${this.state.id}`)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((res) => {
				console.log(res);
				if (res != {}) {
					// res是一个对象
					// 数据拿到后,更改isLoading的值为false,触发页面更新
					this.setState({
						isLoading: false,
						detail: res
					});
				}
			});
	}
	// 封装根据id请求详情数据的方法
	// 	getDetail = () => {
	// 		fetch('https://movie.querydata.org/api?id=1291841')
	// 			.then((response) => {
	// 				console.log(response);
	// 				return response.json();
	// 			})
	// 			.then((res) => {
	// 				console.log(res);
	// 			});
	// 	};
}
// export default withRouter(Detail);

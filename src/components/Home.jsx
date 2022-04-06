import React from 'react';
// 动态设置页面的标题插件
import DocumentTitle from 'react-document-title';
// 导入Hello2组件
/**
 *
 * @antd ui库的使用：
 * 参考文档：https://3x.ant.design/docs/react/introduce-cn
 * 第一步：import { DatePicker } from 'antd';
 *	ReactDOM.render(<DatePicker />, mountNode);
 *
 * 第二步：导入antd（@4.16.13）。所依赖的样式：import 'antd/dist/antd.css';
 *
 * 按需加载也有两种方式
 * 1.安装插件，babel-plugin-import。版本（@1.13.3）然后在.babelrc文件中配置，此种方法无需再引入样式文件，也可以按需加载
 * {
 *		"plugins": [
 *    		["import", {
 *      "libraryName": "antd",
 *      "libraryDirectory": "es",
 *      "style": "css" // `style: true` 会加载 less 文件
 *   			 }]
 *  		]
 *		}
 *
 * 2.只导入datapick文件的js和css样式，也是按需导入
 *
 * 在About.jsx组件中验证
 *
 * 牢记：
 * 1.在我们书写第三方样式时，适宜使用less或者scss,这两种文件书写样式也更简洁，然后专门为less和scss样式开启模块化
 * 2.而对于css文件，一般第三方库，比如antd导入库依赖的样式时，样式文件一般是css文件，如果开启模块化，将影响库中的组件渲染
 * 的效果。因此，样式文件，使用的大致方针是：
 * a.自定义文件，使用less或者scss,并开启模块化
 * b.第三方库依赖的样式文件，一般是css文件，在webpack配置文件中不要为css文件开启模块化
 *
 *
 *
 *
 */
// 优化
// 1.按需导入组件
//  让我们看看现在流行的动态导入工具库：react-loadable。它基础封装了未来JS的新语法import()。
// const GenerateTags = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "generateTags" */ "./GenerateTags"),
//     loading: LoadingSpinner
// });
// 2.@babel/runtime-corejs2,按需引入，即需要使用新特性，打包什么新特性，减小打包的体积
// 参考文档1：
// 参考文档2；https://lequ7.com/guan-yu-javascript-qian-duan-ye-mian-liu-lan-qi-jian-rong-wen-ti-de-jie-jue.html
// useBuildIns，蕴含三个取值entry、usage、false。
// entry，在入口文件引入全副的polyfill。长处是彻底解决兼容问题，毛病是导致最终代码体积比拟大。
// usage，依据代码的应用状况引入polyfill。长处是按需引入代码体积减小很多，毛病是node_modules中的高版本javascript检测不进去，引入不了polyfill。
// false，不增加polyfill也不解决兼容问题。
// 能够看到三个值都有一些毛病，须要一种既能按需引入又能解决node_modules中兼容问题的计划
// @babel/runtime只能处理关键字，然而@babel/runtime-corejs2在此基础上还能处理Promise以及新的
// 原生方法（比如：string.padStart）。因此，我们使用@babel/runtime-corejs2就无需使用@babel/runtime了

// 导入Context组件
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<DocumentTitle title="主页">
				<div>
					<h3>这是home组件</h3>
				</div>
			</DocumentTitle>
		);
	}
	// 生命周期钩子
	// UNSAFE_componentWillMount() {
	// 	console.log(this.props);
	// }
}

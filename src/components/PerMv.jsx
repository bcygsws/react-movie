/* SubMovie组件中填充的每一部电影布局 */
import React from 'react';
// import imgURL from '../images/model.jpg';
import Per from '../css/permv.less';
// 导入挂载到prototype上时间格式化方法
import dateFormat from '../main.js';
function PerMv(props) {
	// 整个组件所有box响应式布局，在SubMovie里设置相应样式
	/* jsx中不能这样写图片路径，有两种方式，实现1.import URL或者2.使用require()*;.box盒子响应式布局 */
	const imgURL = props.poster;
	return (
		<div className={Per.box}>
			<img
				src={imgURL}
				width="135"
				height="200"
				alt=""
				className={Per.img}
			/>
			<h2 className={Per._name}>{props.name}</h2>
			<h4 className={Per.time}>
				上映时间：{dateFormat(props.createdAt)}
			</h4>
			<h4 className={Per.type}>电影类型：{props.genre}</h4>
			<h4>语言：{props.language}</h4>
			<h4 className={Per.update}>
				更新时间：{dateFormat(props.updatedAt)}
			</h4>
		</div>
	);
}
export default PerMv;

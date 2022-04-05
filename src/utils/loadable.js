/**
 * @ 电影列表组件懒加载，生产环境中实现
 * 暂未作处理
 *
 *
 */
import React from 'react';
import Loadable from 'react-loadable';

export default (loader) => {
	return Loadable({
		loader,
		loading() {
			return <div>加载中……</div>;
		}
	});
};

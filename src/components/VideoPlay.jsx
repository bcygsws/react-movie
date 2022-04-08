/**
 *
 * @ 电影详情页中的视频播放插件，react-player
 *
 *
 */
import React from 'react';
import ReactPlayer from 'react-player';
// 导入播放器样式
import PlayerStyle from '../css/player.less';

const VideoPlay = (props) => {
	return (
		<div className={PlayerStyle.player_wrapper}>
			<ReactPlayer
				className={PlayerStyle.react_player}
				// 测试：youtube地址的视频，访问时没有跨域限制
				url={props.url} // 网络资源url地址
				// url={['video/fans.mp4']} // 网络资源url地址
				width="100%"
				height="100%"
				playing={false} // 进入页面是否立即播放
				controls // 是否显示播放器底部控制按钮显示出来
			/>
		</div>
	);
};

export default VideoPlay;

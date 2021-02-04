import {useGlobalIconFont} from './iconfont/helper';

export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/center/index',
    'pages/authorize/index',
    'pages/rental/index',
    'pages/contract/index',
    'pages/player/index',
    'pages/playList/index',
    'pages/PlayListClass/index',
    'pages/PlayListConnect/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom:true,
    color: '#7F8389',
    list: [{
      pagePath: 'pages/index/index',
    },
      {
        pagePath: 'pages/center/index'
      }]
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}

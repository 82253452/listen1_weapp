import {useGlobalIconFont} from './iconfont/helper';

export default {
  pages: [
    'pages/index/index',
    'pages/test/index',
    'pages/player/index',
    'pages/playList/index',
    'pages/PlayListClass/index',
    'pages/PlayListConnect/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    color: '#7F8389',
    list: [{
      pagePath: 'pages/index/index',
    },
      {
        pagePath: 'pages/test/index'
      }]
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}

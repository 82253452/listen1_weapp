import {useGlobalIconFont} from './iconfont/helper';

export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/center/index',
    'pages/authorize/index',
    'pages/rental/index',
    'pages/contract/index',
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
    borderStyle: 'white',
    selectedColor: '#CE0801',
    color: '#7F8389',
    list: [{
      text: '',
      iconPath: 'img/shouyeb.png',
      selectedIconPath: 'img/shouye.png',
      pagePath: 'pages/index/index',
    },
      {
        text: '',
        iconPath: 'img/gerenzhongxin.png',
        selectedIconPath: 'img/agerenzhongxin.png',
        pagePath: 'pages/center/index'
      }]
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}

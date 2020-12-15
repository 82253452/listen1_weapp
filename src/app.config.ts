export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/center/index',
    'pages/authorize/index',
    'pages/rental/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    borderStyle: 'white',
    selectedColor: '#CE0801',
    color: '#7F8389',
    list: [{
      text: '首页',
      iconPath: 'img/shouyeb.png',
      selectedIconPath: 'img/shouye.png',
      pagePath: 'pages/index/index',
    },
      {
        text: '个人中心',
        iconPath: 'img/gerenzhongxin.png',
        selectedIconPath: 'img/agerenzhongxin.png',
        pagePath: 'pages/center/index'
      }]
  }
}

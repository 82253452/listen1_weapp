# Listen1 Weapp V1.0.0

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

## 简介

一款支持多平台音乐播放和搜索的移动音乐 App。现有版本已支持网易云音乐，待支持QQ 音乐，虾米音乐等。还有丰富的歌单管理功能。使用 Taro 开发，基于 MIT 协议开源免费。


<img src="https://github.com/82253452/listen1_weapp/blob/master/src/img/8902a75b8640200478c76c4df632e3d.jpg" width="30%">
<img src="https://github.com/82253452/listen1_weapp/blob/master/src/img/de88d052834d68a9f9721798c47567d.jpg" width="30%">
<img src="https://github.com/82253452/listen1_weapp/blob/master/src/img/e97376f4ae7eb3afd2b4825e6c77f17.jpg" width="30%">

## 特性

- 一个 App 播放多平台的音乐
- 搜索多平台音乐
- 浏览，播放多平台歌单
- 收藏音乐到自建歌单
- 夜间模式
- 备份，恢复

## 安装

## 编译

- clone 或下载本项目代码
- `yarn` 安装依赖
- `npm run dev:weapp` 运行项目
- `微信开发者工具` 打开项目


##安装IconFont

- 修改`iconfont.json`文件中的symbol_url地址
- `npx iconfont-taro` 安装icon

## 代码基本结构

- api: 音乐平台相关资源 API
- img: 图片资源
- iconfont: 阿里巴巴矢量图标
- components: 可复用的组件
- pages: 业务相关的 page 组件
- store-actions-reducers: redux组件

## 鸣谢

- [NervJS/taro](https://github.com/NervJS/taro): 小程序多端支持框架。
- [reduxjs/redux](https://github.com/reduxjs/redux): react状态管理框架。
- [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi): 网易音乐API文档。

开发过程还有很多开源软件提供了各种问题的解决方案，详见代码注释，篇幅原因不一一列出，感谢开源社区的各位开发者。

## 更新日志


`2021-02-04`

- 首次发布

## 法律相关

This software is distributed under the MIT license

In particular, please be aware that

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

Translated to human words:

_In case your use of the software forms the basis of copyright infringement, or you use the software for any other illegal purposes, the authors cannot take any responsibility for you._

We only ship the code here, and how you are going to use it is left to your own discretion.

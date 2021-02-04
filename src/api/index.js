/*
* 接口api
*
* {url} {method} {auth}
* default
* /test/api GET FALSE
* */
export const COMMON_TOKEN = "/common/ypQiniuToken"
export const LOGIN = "/api/mini/login POST"
export const PHONE_INFO = "/api/mini/getPhoneNoInfo POST"
export const USER_INFO = "/api/mini/user"

export const CAR_RENTAL_LIST = "/api/carRental/list"
export const CAR_RENTAL_SUBMIT = "/api/carRental POST"
export const CAR_RENTAL_GET = id => `/api/carRental/get/${id}`

//精品歌单
export const PLAY_LIST = "/top/playlist/highquality"
//网友精选碟歌单
export const PLAY_LIST_HOT = "/top/playlist"
//歌单详情
export const PLAY_LIST_DETAIL = "/playlist/detail"
//歌曲详情
export const PLAY_LIST_SONG_DETAIL = "/song/detail"
//播放地址
export const PLAY_SONG_URL = "/song/url"
//热门歌单分类
export const PLAY_CLASS = "/playlist/hot"
//推荐
export const PLAY_RECOMMEND = "/personalized"
//登录
export const PLAY_LOGIN = "/login/cellphone"



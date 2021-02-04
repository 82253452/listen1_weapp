import {LOGIN, PHONE_INFO, USER_INFO} from "@/api";
import Taro from '@tarojs/taro'
import {APP_ID} from "./Const";

export async function request(url, data, auth = true) {
  if (!url) {
    return;
  }
  const urlArray = url.split(" ");
  url = urlArray[0]
  const method = urlArray[1] || 'GET'
  return requestBase({url, method, data}, auth)
}

export async function requestBase(data, auth = true) {
  if (!data.url.startsWith('http')) {
    data.url = process.env.BASE_API + data.url
  }
  data.header = {
    'X-Token': Taro.getStorageSync('X-Token')
  }
  return new Promise((resolve, reject) => {
    Taro.request(data).then(async res => {
      if (res.statusCode !== 200) {
        await Taro.showToast({
          title: '网络异常',
          icon: 'none'
        })
        reject(res)
        return
      }
      resolve(res.data)
    })
  })
}


const gotoAuthrize = debounce(() => {
  Taro.navigateTo({
    url: '/pages/authorize/index',
  })
}, 1500, true)

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 * @param func2 如果是立即执行 到时间后的清理函数
 */
export function debounce(func, wait, immediate, func2) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        func2 && func2.apply(context, args)
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

/**
 * 节流函数
 * @param  {[type]} func    [description]
 * @param  {[type]} wait    [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function throttle(func, wait, options) {
  let time, context, args;
  let previous = 0;
  if (!options) options = {};
  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    time = null;
    func.apply(context, args);
    if (!time) context = args = null;
  };

  let throttled = function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (time) {
        clearTimeout(time);
        time = null;
      }
      previous = now;
      func.apply(context, args);
      if (!time) context = args = null;
    } else if (!time && options.trailing !== false) {
      time = setTimeout(later, remaining);
    }
  };
  return throttled;
}

/**
 * 获取微信code 返回Promise可以转同步
 * @return {[type]} [description]
 */
export async function wxLogin() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          Taro.showToast({
            title: '登录失败，请重启应用',
            icon: 'none'
          })
          reject(res)
        }
      }
    })
  })
}

export async function getLoginCodeSession() {
  let {code} = await Taro.login()
  await Taro.checkSession().catch(async () => code = await Taro.login().then(res => code = res.code))
  return code
}


/**
 * 重新登录 系统没有该用户的时候抛出异常
 * @param  {[type]}     [description]
 * @return {[type]}     [description]
 */
export async function getUserInfo() {
  try {
    const code = await getLoginCodeSession()
    const data = await request(USER_INFO, {code, appId: APP_ID}, false);
    if (!data || !data.token) {
      throw new Error('该用户未注册')
      return
    }
    Taro.setStorageSync('X-Token', data.token)
    return data
  } catch (e) {
    console.error(e)
    throw new Error('重新登录失败')
  }
}


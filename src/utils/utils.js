import Taro from "@tarojs/taro";

export function wxuuid() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  const uuid = s.join("");
  return uuid
}

export function dateFormat(fmt, date) {
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

export function validated(rules, param) {
  return Object.keys(rules).every(e => {
    if (!param[e]) {
      Taro.showToast({
        title: rules[e].message,
        icon: 'none'
      })
      return false
    }
    if (typeof param[e] === 'object') {
      if (param[e] instanceof Array) {
        if (!param[e].length) {
          Taro.showToast({
            title: rules[e].message,
            icon: 'none'
          })
          return false
        }
      } else if (param[e] instanceof Object) {
        if (!Object.keys(param[e]).length) {
          Taro.showToast({
            title: rules[e].message,
            icon: 'none'
          })
          return false
        }
      }
    }


    return true
  })
}

/**
 * 根据经纬度计算距离
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @returns {number}
 */
export function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s.toFixed(2);
}

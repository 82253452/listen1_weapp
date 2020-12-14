import {setPhone, setUser} from "@/actions/user";
import {LOGIN, PHONE_INFO} from "@/api";
import {APP_ID} from "@/utils/Const";
import {request} from "@/utils/request";
import Taro from "@tarojs/taro";
import {useDispatch} from "react-redux";


export async function getLoginCodeSession() {
  let {code} = await Taro.login()
  await Taro.checkSession().catch(async () => code = await Taro.login().then(res => res.code))
  return code
}

export function useGetUserInfo() {


  const dispatch = useDispatch()

  async function authorize(e) {
    const code = await getLoginCodeSession()
    const data = await request(LOGIN, {
      code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      signature: e.detail.signature,
      rawData: e.detail.rawData,
      appId: APP_ID
    })
    if (!data || !data.token) {
      throw new Error('登录失败！请联系管理员')
      return
    }
    Taro.setStorageSync('X-Token', data.token)
    dispatch(setUser(data))
    Taro.navigateBack()
    return data
  }

  return authorize

}

export function usePhoneNumber() {

  const dispatch = useDispatch()

  async function getPhoneNumber(e) {
    const {iv, encryptedData} = e.detail
    if (!iv || !encryptedData) {
      throw new Error('用户拒绝')
    }
    const res = await request(PHONE_INFO, {
      iv,
      code: await getLoginCodeSession(),
      encryptedData,
      signature: 'signature',
      rawData: 'rawData',
      appId: APP_ID
    })
    if (!res) {
      await Taro.showToast({title: '获取手机号失败 请再次获取', icon: 'none'})
      return
    }
    dispatch(setPhone(res))
    return res
  }


  return getPhoneNumber

}

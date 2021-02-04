import {request} from "@/utils/request";
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";

export default function (url, params = {},auth=true) {
  const [data, setData] = useState([])
  const [param, setParam] = useState(params)
  const [before, setBefore] = useState('')
  const [canFetchMore, setCanFetchMore] = useState(true)

  useEffect(() => {
    request(url, {...param,limit:20},auth).then(res => {
      setCanFetchMore(res.more)
      setBefore(res.lasttime)
      param.page===1?setData(res.playlists):setData(d => [...d, ...res.playlists])
      Taro.stopPullDownRefresh()
    })
  }, [auth, before, param, url])


  function fetchMore() {
    console.log('fetchMore')
    setParam({...param, page: param.page?param.page+1:2,before})
  }

  function refetch(p) {
    console.log('refetch')
    setParam({...param,...p,before:'', page: 1})
  }

  useReachBottom(() => {
    canFetchMore && fetchMore()
  })
  usePullDownRefresh(() => {
    refetch()
  })

  return {data, canFetchMore, refetch, fetchMore}
}

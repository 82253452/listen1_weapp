import {request} from "@/utils/request";
import {useDidShow, usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import {useEffect, useRef, useState} from "react";

export default function (url, params = {},auth=true) {
  const [data, setData] = useState([])
  const [param, setParam] = useState(params)
  const [canFetchMore, setCanFetchMore] = useState(true)
  const loadedRef = useRef()

  useEffect(() => {
    request(url, param,auth).then(res => {
      setCanFetchMore(res.hasNextPage)
      param.page===1?setData(res.list):setData(d => [...d, ...res.list])
      Taro.stopPullDownRefresh()
      loadedRef.current=true
    })
  }, [auth, param, url])

  useDidShow(()=>{
    loadedRef.current && refetch()
  })


  function fetchMore() {
    setParam({...param, page: param.page?param.page+1:2})
  }

  function refetch() {
    setParam({...param, page: 1})
  }

  useReachBottom(() => {
    canFetchMore && fetchMore()
  })
  usePullDownRefresh(() => {
    refetch()
  })

  return {data, canFetchMore, refetch, fetchMore}
}

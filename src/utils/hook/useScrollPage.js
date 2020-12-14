import {request} from "@/utils/request";
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";

export default function (url, params = {}) {
  const [data, setData] = useState([])
  const [param, setParam] = useState(params)
  const [canFetchMore, setCanFetchMore] = useState(true)

  useEffect(() => {
    request(url, param).then(res => {
      setCanFetchMore(res.hasNextPage)
      param.page===1?setData(res.list):setData(d => [...d, ...res.list])
      Taro.stopPullDownRefresh()
    })
  }, [param, url])


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

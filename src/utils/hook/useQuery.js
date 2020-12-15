import useEffectOnece from "@/utils/hook/useEffectOnece";
import {request} from "@/utils/request";
import {useState} from "react";

export default function (url, params = {},auth=true) {
  const [data, setData] = useState()
  useEffectOnece(async () => {
    const res = await request(url, params,auth)
    setData(res)
  })
  return {data}
}

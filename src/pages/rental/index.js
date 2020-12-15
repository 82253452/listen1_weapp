import {CAR_RENTAL_SUBMIT} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItemImage from '@/components/PanelItemImage'
import PanelItemInputNew from '@/components/PanelItemInputNew'
import PanelItemSelect from '@/components/PanelItemSelect'
import {request} from "@/utils/request";
import {View} from "@tarojs/components";
import React, {useState} from "react";
import './index.less'

export default function () {

  const [data = {}, setData] = useState()

  async function handleSubmit() {
    await request(CAR_RENTAL_SUBMIT, data)
  }

  return <NavBar title='租赁申请' back home viewBackGround='#fff'>
      <View className='container'>
        <Panel padding={0} space={0} borderRadius={0} style={{paddingBottom:'30rpx'}}>
          <PanelItemInputNew title='姓名' value={data.personName} placeholder='请输入姓名' onChange={e=>setData({...data,personName:e})} />
          <PanelItemInputNew title='手机号' type='number' value={data.personPhone} placeholder='请输入手机号' onChange={e=>setData({...data,personPhone:e})} />
          <PanelItemInputNew title='租赁时长' type='number' value={data.leaseDuration} placeholder='请输入租赁时长' onChange={e=>setData({...data,leaseDuration:e})} />
          <PanelItemInputNew title='详细住址' value={data.personAddress} placeholder='请输入详细住址' onChange={e=>setData({...data,personAddress:e})} />
          <PanelItemSelect title='租赁开始日期' value={data.effectiveDate} placeHolder='请选择时间' mode='date' onChange={e => {setData({...data,effectiveDate:e})}} />
        </Panel>

        <Panel padding={0} space={0} borderRadius={0}>
          <PanelItemImage title='本人照片' desc='正面照清晰无遮挡' value={data.personImg} onChange={e=>setData({...data,personImg:e})} />
          <PanelItemImage title='身份证正反面照片' desc='正面照清晰无遮挡' value={data.personCardImg} onChange={e=>setData({...data,personCardImg:e})} />
          <PanelItemImage title='驾驶本照片' desc='正面照清晰无遮挡' value={data.driversLicenseImg} onChange={e=>setData({...data,driversLicenseImg:e})} />
        </Panel>
        <View className='button' onClick={handleSubmit}>
          提交
        </View>
      </View>
  </NavBar>
}




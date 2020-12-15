import {View} from "@tarojs/components";
import React, {forwardRef} from "react";
import './index.less'

export default forwardRef(({children, style, space = 30}, ref) => {

    return <View className='panel-container' style={{
      width: `calc(100% - ${space * 2}rpx)`,
      ...style
    }}
    >
      {children}
    </View>
  }
)


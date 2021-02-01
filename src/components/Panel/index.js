import {View} from "@tarojs/components";
import React, {forwardRef} from "react";
import './index.less'

export default forwardRef(({children, style, space = 30}, ref) => {

    return <View className='panel-container card' style={{
      ...style
    }}
    >
      {children}
    </View>
  }
)


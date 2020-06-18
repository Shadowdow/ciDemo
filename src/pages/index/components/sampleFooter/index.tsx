import Taro from '@tarojs/taro';
import { CoverView, View } from '@tarojs/components';

import './index.scss';

const SampleFooter = () => {
  return (
    <View>
      <CoverView
        className='footer'
        style={{ position: 'fixed', height: '140rpx', lineHeight: '140rpx', textAlign: 'center' }}
      >
        FOOTER
      </CoverView>
      <View className='placeholder' style={{ height: '160rpx' }} />
    </View>
  );
};

export default SampleFooter;

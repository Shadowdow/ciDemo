import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';
import ZTextarea from './components/zTextarea';
import SampleFooter from './components/sampleFooter';

const InputDemo = () => {

  return (
    <View className='index'>
      <View className='content'>
        <View className='text'>CONTENT</View>
        <ZTextarea autoHeight={true} />
      </View>
      <SampleFooter />
    </View>
  );
};

InputDemo.config = {
  navigationBarTitleText: 'HEADER',
};

export default InputDemo;

import Taro from '@tarojs/taro';
import { Button } from '@tarojs/components';

import './index.scss';

const ZButton = (props) => {
  const { children, onGetUserInfo } = props;

  const handleGetUserInfo = (info) => {
    onGetUserInfo && onGetUserInfo(info);
  };

  return (
    <Button
      className='custom-class'
      openType='getUserInfo'
      lang='zh_CN'
      onGetUserInfo={handleGetUserInfo}
    >
      {children}
    </Button>
  );
};

ZButton.externalClasses = ['custom-class'];
export default ZButton;

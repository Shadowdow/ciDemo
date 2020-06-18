import Taro, { PropsWithChildren } from '@tarojs/taro';
import { CoverView, View } from '@tarojs/components';

import './index.scss';

interface FooterProps extends PropsWithChildren<any> {
  actions: Array<{
    text: string;
    action?: () => void;
  }>
  coverView?: boolean;
}

const Footer = (props: FooterProps) => {
  const { actions = [], children, coverView = false } = props;

  return (
    <View>
      {
        coverView ? (
          <CoverView className='footer'>
            {
              actions.map((item) =>
                <CoverView
                  key={item.text}
                  className='btn'
                  onClick={() => {
                    item.action && item.action();
                  }}>
                  {item.text}
                </CoverView>
              )
            }
            {children}
          </CoverView>
        ) : (
          <View className='footer'>
            {
              actions.map((item) =>
                <View
                  key={item.text}
                  className='btn'
                  onClick={() => {
                    item.action && item.action();
                  }}>
                  {item.text}
                </View>
              )
            }
            {children}
          </View>
        )
      }
      <View className='placeholder' />
    </View>
  );
};

export default Footer;

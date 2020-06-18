import Taro from '@tarojs/taro';
import { Textarea, View } from '@tarojs/components';

import './index.scss';
import useState = Taro.useState;

interface ZInputProps {
  onInput?: (value) => void;
  onBlur?: () => void;
  width?: number;
  height?: number;
  autoHeight?: boolean;
  alwaysTextarea?: boolean;
}

const ZTextarea = (props: ZInputProps) => {
  const { onInput, onBlur, width = 200, height = 40, autoHeight = false, alwaysTextarea = false } = props;
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    setValue(value);
    onInput && onInput(value);
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  return (
    <View className='container'>
      {
        alwaysTextarea || focus ? (
          <Textarea
            style={{ width: width * 2 + 'rpx', height: height * 2 + 'rpx' }}
            value={value} className='input'
            focus={focus} onBlur={handleBlur}
            onInput={handleInput}
            autoHeight={autoHeight}
            cursorSpacing={40}
          />
        ) : (
          <View
            style={{ width: width * 2 + 'rpx', height: autoHeight ? 'auto' : height * 2 + 'rpx' }}
            className='input-view'
            onClick={() => setFocus(true)}
          >
            {value}
          </View>
        )
      }
    </View>
  );
};

export default ZTextarea;

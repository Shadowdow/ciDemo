import Taro from '@tarojs/taro';
import { Input, View } from '@tarojs/components';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import './index.scss';
import useState = Taro.useState;

interface ZInputProps {
  onInput?: (value) => void;
  onBlur?: () => void;
  placeholder?: string;
  width?: number;
  password?: boolean;
}

const ZInput = (props: ZInputProps) => {
  const { onInput, onBlur, placeholder, width = 120, password = false } = props;
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
    <View>
      {
        focus ? (
          <Input
            value={value}
            className='input'
            focus={focus}
            onBlur={handleBlur}
            onInput={handleInput}
            placeholder={placeholder}
            style={{ width: width * 2 + 'rpx' }}
            password={password}
          />
        ) : (
          <View
            hidden={false}
            className={classnames('input-view', { placeholder: isEmpty(value) })}
            onClick={() => setFocus(true)}
            style={{ width: width * 2 + 'rpx' }}
          >
            {isEmpty(value) ? placeholder : value}
          </View>
        )
      }
    </View>
  );
};

export default ZInput;

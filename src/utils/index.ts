import {message} from 'antd';

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text)
    .then(() => message.success('复制成功！'))
    .catch((error) => message.error('Could not copy text: ', error));
};
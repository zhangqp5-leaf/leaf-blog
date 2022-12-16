import React from 'react';
import styles from './index.module.less';

interface TitleProps {
  titleName?: String,
  fontStyle?: any,
  id: string,
}

export const Title = (props: TitleProps) => {
  const {titleName, fontStyle} = props;
  return (
    <div className={styles.title} style={{fontSize: fontStyle}} id={props.id}>
      &nbsp;&nbsp;{titleName}
    </div>
  )
};
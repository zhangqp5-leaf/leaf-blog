import React from 'react';
import {Typography} from 'antd';
import {demoList} from '../../utils/constant';

import styles from './index.module.less';

const {Text} = Typography;

const Demos = () => {
  const goDetail = (url: string | URL | undefined) => {
    window.open(url);
  }
  return (
    <Text>
      <div className={styles.demoContainer}>
        {
          demoList.map((item) => {
            return (
              <section
                className={styles.demoItem}
                key={item.title}
                onClick={() => goDetail(item.url)}
              >
                {item.title}
              </section>
            )
          })
        }
      </div>
    </Text>
  )
}

export default Demos;
import React from 'react';
import styles from './index.module.less';

interface NavCardProps {
  value: any,
}

export const NavCard: React.FC<NavCardProps> = (props) => {
  const {value} = props;
  const goDetail = (url: any) => {
    window.open(url);
  }
  return (
    <section className={styles.item} onClick={() => goDetail(value.url)}>
      <img src={value.imgUrl} alt="loading..." />
      <div className={styles.item__article}>
        <section className={styles.item__article__title}>
          {value.title}
        </section>
        <section className={styles.item__article__des}>
          {value.des}
        </section>
      </div>
    </section>
  )
}
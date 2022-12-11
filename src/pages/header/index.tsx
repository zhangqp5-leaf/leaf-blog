import React, {useState} from "react";
import { Link } from 'react-router-dom';
import sunImg from '@/assets/svg/sun.svg';
import moonImg from '@/assets/svg/moon.svg';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux'
import { changeLightDark } from '../../store/lightDarkSlice';
import styles from './index.module.less';

const Home = () => {
  const isSun = useSelector((state: RootState) => state.lightDark.value)
  const dispatch = useDispatch()
  return (
    <div className={styles.header}>
      <section>
        <Link to="/home">leaf</Link>
      </section>
      <section className={styles.right}>
        <Link to="/blog/list">blog</Link>
        <Link to="/nav">nav</Link>
        <section>
          <img
            src={isSun ? sunImg : moonImg}
            style={{width: '24px', cursor: 'pointer'}}
            alt=''
            onClick={() => dispatch(changeLightDark())}
          />
        </section>
      </section>
    </div>
  )
};

export default Home;
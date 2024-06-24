import React, {useState} from "react";
import { Link } from 'react-router-dom';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux'
import { createFromIconfontCN } from '@ant-design/icons';
import { changeLightDark } from '../../store/lightDarkSlice';
import classNames from "classnames";
import styles from './index.module.less';

const Header = () => {
  const isSun = useSelector((state: RootState) => state.lightDark.value)
  const dispatch = useDispatch()
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3770106_re8mh5ft01i.js',
  });
  return (
    <div className={classNames({
      [styles.header]: true,
      [styles.header__sun]: !!isSun,
      [styles.header__moon]: !isSun,
    })} style={isSun ? {} : {color: '#fff'}}>
      <section>
        <Link to="/home">leaf</Link>
      </section>
      <section className={styles.right}>
        <Link to="/blog/list">blog</Link>
        <Link to="/nav">nav</Link>
        <Link to="/demos">demos</Link>
        <Link to="/realHome">home</Link>
        <section>
          <IconFont
            type={isSun ? "icon-sun" : "icon-moon"}
            style={{cursor: 'pointer', fontSize: '24px'}}
            onClick={() => dispatch(changeLightDark())}
          />
        </section>
      </section>
    </div>
  )
};

export default Header;
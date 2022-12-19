import React, { useEffect, useState } from "react";
import {Typography} from 'antd';
import {Title, NavCard} from '../../components';
import {codeNavData, codeNavTypeMap} from '../../utils/constant';
import classnames from 'classnames'
import styles from './index.module.less';

const {Text} = Typography;

const Nav = () => {

  const [activeKey, setActiveKey] = useState<String>('frontEndCommon');

  const scrollStart = (val: String) => {
    if (!!document.querySelector(`#${val}`)) {
      document.querySelector(`#${val}`)!.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveKey(val);
  };
  // useEffect(() => {
  //   const imgs = document.querySelectorAll('div[data-src');
  //   const config = {
  //     rootMargin: '0px',
  //     threshold: 0,
  //   };
  //   const observer = new IntersectionObserver((entries, self) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         if (entry.boundingClientRect.top < 100) {
  //           const _key = entry.target.children[0].id;
  //           if (_key === 'frontEndCommon') {
  //             setActiveKey(_key)
  //             return;
  //           }
  //           const _arr = Object.keys(codeNavData);
  //           const _index = _arr.findIndex((item) => item === _key);
  //           setActiveKey(_arr[_index - 1]);
  //         }
  //       } else {
  //         if (entry.boundingClientRect.top < 100) {
  //           setActiveKey(entry.target.children[0].id);
  //         }
  //       }
  //     });
  //   }, config);
  //   imgs.forEach(image => {
  //     observer.observe(image);
  //   });
  // });
  return (
    <Text>
      <div className={styles.nav} id="nav-container">
        <div></div>
        <div className={styles.nav__right} id="nav-left">
          {
            Object.entries(codeNavData).map((item) => {
              return (
                <div key={item[0]}>
                  <div data-src="1">
                    <Title
                      titleName={codeNavTypeMap.get(item[0])}
                      fontStyle='18px'
                      id={item[0]}
                    />
                  </div>
                  <div className={styles.nav__right__list}>
                    {
                      item[1].map((cell, index) => (
                        <NavCard
                          value={cell}
                          key={index}
                        />
                      ))
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.nav__left}>
          <div className={styles.nav__left__list}>
            {
              Object.entries(codeNavData).map(sideItem => {
                return (
                  <section
                    key={sideItem[0]}
                    onClick={() => {scrollStart(sideItem[0])}}
                    className={classnames({
                      [styles.nav__left__list__item]: true,
                      [styles.active]: activeKey === sideItem[0],
                    })}
                  >
                    {codeNavTypeMap.get(sideItem[0])}
                  </section>
                )
              })
            }
          </div>
        </div>
      </div>
    </Text>
  )
};

export default Nav;
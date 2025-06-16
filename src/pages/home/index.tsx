import React from "react";
import { Link } from 'react-router-dom';
import {Typography} from 'antd';
import styles from './index.module.less';

const resumeUrl = 'http://117.72.173.5/leaf_resume.pdf';

const Home = () => {
  return (
    <Typography className={styles.container}>
      <h1>张启鹏</h1>
      <pre>Frontend Developer</pre>
      <section className={styles.footer}>
        <a href={resumeUrl} target="_blank">简历</a>
        <Link to="/blog/list">博客</Link>
      </section>
    </Typography>
  )
};

export default Home;
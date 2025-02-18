import React, {useState, useEffect} from "react";
import {Typography} from 'antd';
import {blogList} from '../../../utils/constant';
import {useParams} from 'react-router-dom';
import { MdRender } from '../../../components';

import styles from './index.module.less';

const {Text} = Typography;

const Blog = () => {
  const params =useParams()

  const [content, setContent] = useState('');

  const loadContent = async () => {
    let loadedContent = '';
    const resolvedContent = await blogList.find(i => i.title === params.title).value();
    loadedContent = resolvedContent.default;
    fetch(loadedContent)
        .then(res => res.text())
        .then(text => setContent(text));
  };

  useEffect(() => {
    loadContent();
  }, []);
  
  return (
    <Text>
      <div className={styles.markdownContainer}>
        <MdRender content={content} />
      </div>
    </Text>
  )
};

export default Blog;

import React, {useState, useEffect} from "react";
import {Typography} from 'antd';
import {blogData} from '../../../utils/constant';
import styles from './index.module.less';
import {
  useNavigate,
} from "react-router-dom";

const {Text, Title, Paragraph} = Typography;

const Blog = () => {

  let navigate = useNavigate();
  
  const goBlogDetail = (id: string) => {
    navigate(`/blog/${id}`)
  }
  return (
    <Text>
      <div className={styles.blog}>
        {
          Object.entries(blogData).map(blogYear => {
            console.log(blogData);
            
            return (
              <div className={styles.blog__year}>
                {blogYear[0]}
                {
                  blogYear[1].map(blog => {
                    return (
                      <div className={styles.blog__item} onClick={() => goBlogDetail(blog.id)}>
                        <Title level={3}>{blog.title}</Title>
                        <Paragraph>{blog.date}</Paragraph>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </Text>
  )
};

export default Blog;
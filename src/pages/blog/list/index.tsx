import React from "react";
import {Typography} from 'antd';
import {blogData} from '../../../utils/constant';
import styles from './index.module.less';
import {
  useNavigate,
} from "react-router-dom";

const {Text} = Typography;

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
            return (
              <div className={styles.blog__year}>
                <section className={styles.blog__title}>{blogYear[0].substring(1)}</section>
                {
                  blogYear[1].map(blog => {
                    return (
                      <div className={styles.blog__item} onClick={() => goBlogDetail(blog.id)}>
                        <section className={styles.blog__item__title}>{blog.title}</section>
                        <section>{blog.date}</section>
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
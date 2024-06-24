import React from "react";
import {Typography} from 'antd';
import {blogList} from '../../../utils/constant';
import styles from './index.module.less';
import {
  useNavigate,
} from "react-router-dom";

const {Text} = Typography;
const yearList = [...new Set(blogList.map(blogItem => blogItem.date.split('-')[0]))];

const Blog = () => {

  let navigate = useNavigate();
  
  const goBlogDetail = (id: string) => {
    navigate(`/blog/${id}`)
  }
  return (
    <Text>
      <div className={styles.blog}>
        {
          yearList.map(blogYear => {
            return (
              <div className={styles.blog__year} key={blogYear}>
                <section className={styles.blog__title}>{blogYear}</section>
                {
                  blogList.filter(i => i.date.split('-')[0] === blogYear).map(blog => {
                    return (
                      <div className={styles.blog__item} key={blog.id} onClick={() => goBlogDetail(blog.id)}>
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
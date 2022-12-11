import React, {useState, useEffect} from "react";
import {Typography} from 'antd';
import ReactMarkdown from 'react-markdown';
import {blogMap} from '../../../utils/constant';
import {useParams} from 'react-router-dom';

const {Text} = Typography;

const Blog = () => {
  const [md, setMd] = useState('');
  const params =useParams()
  useEffect(() => {
    if (params.id) {
      fetch(blogMap[params.id])
        .then(res => res.text())
        .then(text => setMd(text));
    }
  })
  console.log(params.id);
  
  return (
    <Text>
      <section style={{margin: '0 auto', width: '50%'}}>
        <ReactMarkdown children={md} />
      </section>
    </Text>
  )
};

export default Blog;
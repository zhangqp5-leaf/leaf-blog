import React, {useState, useEffect} from "react";
import {Typography} from 'antd';
import ReactMarkdown from 'react-markdown';
import {blogMap} from '../../../utils/constant';
import {useParams} from 'react-router-dom';
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {solarizedlight, vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useSelector } from 'react-redux'

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
  const isSun = useSelector((state) => state.lightDark.value)
  
  return (
    <Text>
      <section style={{margin: '0 auto', width: '50%'}}>
        <ReactMarkdown
          children={md}
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={isSun ? solarizedlight: vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children} 
                </code>
              )
            }
          }}
        />
      </section>
    </Text>
  )
};

export default Blog;
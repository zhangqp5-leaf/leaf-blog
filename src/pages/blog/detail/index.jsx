import React, {useState, useEffect} from "react";
import {Typography} from 'antd';
import ReactMarkdown from 'react-markdown';
import {blogList} from '../../../utils/constant';
import {useParams} from 'react-router-dom';
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight, darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useSelector } from 'react-redux';
import {copyToClipboard} from '@/utils';

import styles from './index.module.less';

const {Text} = Typography;

const CodeTitleBar = (props) => {
  const copyCode = () => {
    if (typeof props.codes === 'string') {
      copyToClipboard(props.codes);
    } else if (Array.isArray(props.codes)) {
      copyToClipboard(props.codes[0]);
    }
  };
  return (
    <div className={styles.titlebar}>
      <span>{props.language}</span>
      <span className={styles.tablerCopy} onClick={copyCode}></span>
    </div>
  );
};

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

  const isSun = useSelector((state) => state.lightDark.value)
  
  return (
    <Text>
      <section className={styles.markdownViewer}>
        <ReactMarkdown
          children={content || 'Loading...'}
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <div className={styles.codes}>
                  <CodeTitleBar codes={children} language={match?.[1] || ''} />
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={isSun ? oneLight : darcula}
                    language={match[1]}
                    showLineNumbers
                    PreTag="div"
                    {...props}
                  />
                </div>
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

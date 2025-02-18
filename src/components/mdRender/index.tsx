import React, {useState, useEffect} from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight, darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useSelector } from 'react-redux';
import {copyToClipboard} from '../../utils';

import styles from './index.module.less';

const CodeTitleBar = (props: any) => {
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

interface MdRenderProps {
  content: string,
}

export const MdRender: React.FC<MdRenderProps> = (props) => {

  const {content} = props;

  const isSun = useSelector((state: any) => state.lightDark.value)
  
  return (
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
                  // @ts-ignore
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
  )
};


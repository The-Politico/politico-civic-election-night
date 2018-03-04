import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownText = (props) => {
  const content = props.content.page['pre-results'];
  console.log(content);
  return (
    <section className='introduction'>
      <ReactMarkdown
        source={content || ''}
      />
    </section>
  );
};

export default MarkdownText;

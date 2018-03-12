import React from 'react';
import ReactMarkdown from 'react-markdown';
import {textTypes} from 'StateApp/constants/text';

const MarkdownText = (props) => {
  let status;
  if (props.results[0]) {
    status = props.results[0].precinctsReportingPct;
  } else {
    status = 0;
  }
  let content = '';
  if (status === 0) {
    content = props.content.page[textTypes.pre] || '';
  } else if (status < 1) {
    content = props.content.page[textTypes.live] || '';
  } else {
    content = props.content.page[textTypes.post] || '';
  }
  return (
    <section className='introduction'>
      <ReactMarkdown
        source={content || ''}
      />
    </section>
  );
};

export default MarkdownText;

// Dependencies
import React from 'react';
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'

const Article = (props, context) => {
  const {title, summary, _id, file_name, state} = props.article;
  return (
      <Row as={Col} xs={12}>
        <Col xs={10} md={4} lg={3}>
          <p>{title}</p>
        </Col>
        <Col className='d-none d-lg-block' lg={4}>
          <p>{summary}</p>
        </Col>
        <Col className='d-none d-md-block' md={2}>
          <img src={file_name} alt={title}/>
        </Col>
        <Col className='d-none d-md-block' md={1}>
          <p>{state ? context.t('Published') : context.t('Draft')}</p>
        </Col>
      </Row>
  );
};

Article.contextTypes = {
  article: PropTypes.object,
  t: PropTypes.func
};

export default Article;
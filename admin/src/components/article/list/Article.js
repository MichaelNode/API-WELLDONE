// Dependencies
import React from 'react';
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'
import DeleteArticle from '../deleteArticle/deleteArticle';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Article = (props, context) => {
  const {title, shortDescription, _id, file_name, state} = props.article;
  return (
      <Row className="align-items-center mt-2" as={Col} xs={12}>
        <Col xs={6} md={6} lg={3}>
          <Paragraph>{title}</Paragraph>
        </Col>
        <Col className='d-none d-lg-block' lg={4} xl={5}>
          <Paragraph>{shortDescription}</Paragraph>
        </Col>
        <Col xs={3} md={2} lg={1}>
          <Paragraph>{state ? context.t('Published') : context.t('Draft')}</Paragraph>
        </Col>
        <Col className='d-none d-md-block' md={2} xl={1}>
          <Image src={`/images/uploads/${file_name}`} alt={title}/>
        </Col>
        <Col xs={3} md={2}>
          <Button className='icon-button'><Link to={`/admin/edit_article/${_id}`}><i className="text-white fa fa-fw fa-pencil"/></Link></Button>
          <DeleteArticle id={_id}/>
        </Col>
      </Row>
  );
};

const Paragraph = styled.p`
  margin-bottom: 0;
`;

const Image = styled.img`
  max-width: 100%;
`;

Article.contextTypes = {
  article: PropTypes.object,
  t: PropTypes.func
};

export default Article;
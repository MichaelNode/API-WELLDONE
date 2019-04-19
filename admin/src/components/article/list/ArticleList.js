// Dependencies
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {articleUtils} from "../../../store/article";
import Article from './Article';
import {Col, Row} from 'react-bootstrap';
import * as types from '../../../store/article/types';
import PropTypes from 'prop-types';
import styled from "styled-components";

const ArticleList = (props, context) => {
  const [error, setError] = useState('');
  const [articles, setArticles] = useState(null);

  const fetchArticles = async () => {
    try {
      // add my articles to the state
      const data = await articleUtils.getMyArticles(props.token);
      setArticles(data.articles);
    } catch (err) {
      setError(context.t('There was an error in the connection to the server'))
    }
    props.articlesLoaded()
  };

  useEffect(() => {
    fetchArticles();
  }, [props.getArticles]);

  return (
      <Row className='mx-0 mx-lg-3'>
        {
          error &&
          <p>{error}</p>
        }
        {!error &&
        <Row className='pb-2 border-bottom px-0' as={Col} xs={12}>
          <Col xs={6} md={6} lg={3}>
            <Paragraph>{context.t('Title')}</Paragraph>
          </Col>
          <Col className='d-none d-lg-block' lg={4} xl={5}>
            <Paragraph>{context.t('Summary')}</Paragraph>
          </Col>
          <Col xs={3} md={2} lg={1}>
            <Paragraph>{context.t('Published')}</Paragraph>
          </Col>
          <Col className='d-none d-md-block' md={2} xl={1}>
            <Paragraph>{context.t('Image')}</Paragraph>
          </Col>
          <Col xs={3} md={2}>
            <Paragraph>{context.t('Action')}</Paragraph>
          </Col>
        </Row>
        }
        {!error && articles && articles.map(article => {
          return (
              <Article key={article._id} article={article}/>
          )
        })}
      </Row>
  );
};

const Paragraph = styled.p`
  margin-bottom: 0;
  font-weight: bold
`;

ArticleList.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({
  articles: state.article.userArticles,
  token: state.user.token,
  getArticles: state.article.getArticles
});

const mapDispatchToProps = dispatch => {
  return {
    articlesLoaded: () => {
      dispatch({
        type: types.ARTICLES_LOADED
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
// Dependencies
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {articleUtils} from "../../../store/article";
import Article from './Article';
import {Col, Row} from 'react-bootstrap';
import * as types from '../../../store/article/types';
import PropTypes from 'prop-types';
import styled from "styled-components";
var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


const Status = {
  true: 'yes',
  false: 'no'
};

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

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
        <BootstrapTable data={articles} pagination search>
        <TableHeaderColumn isKey dataField='title'  dataSort={ true }>{context.t('Title')}</TableHeaderColumn>
        <TableHeaderColumn dataField='summary' tdStyle={ { whiteSpace: 'normal' } } dataSort={ true }>{context.t('Summary')}</TableHeaderColumn>
        <TableHeaderColumn dataField='state' dataSort={ true }  dataFormat={ enumFormatter } formatExtraData={ Status }>{context.t('Published')}</TableHeaderColumn>
        <TableHeaderColumn>{context.t('Action')}</TableHeaderColumn>
        </BootstrapTable>,

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
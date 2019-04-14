// Dependencies
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {articleUtils} from "../../../store/article";
import Article from './Article';
import {Row} from 'react-bootstrap';

const ArticleList = (props) => {
  const [error, setError] = useState('');
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // add my articles to the state
      const data = await articleUtils.getMyArticles(props.token);
      setArticles(data.articles);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, articles);

  return(
      <Row>
        {articles && articles.map(article => {
          return (
              <Article key={article._id} article={article} />
          )})}
      </Row>
  );
};

const mapStateToProps = state => ({
  articles: state.article.userArticles,
  token: state.user.token,
});

export default connect(mapStateToProps)(ArticleList)
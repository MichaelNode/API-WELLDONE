import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userOperations } from "../../store/user";
import apiRoutes from "../../config/apiRoutes";
import styled from 'styled-components';

function FavArticles(props, context) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(apiRoutes.favourites)
    .then(res => res.json())
    .catch(error => console.error("Error: ", error))
    .then(response => setArticles(response.articles));
  }, [])


  return (

      <ul>
        {articles && articles.map(item => (
            <ArticleList>
                <li key={item._id}>{item.title} -
                    <a href={`${apiRoutes.articles}/${item.author.nick_name}/${item.title}-${item._id}`}>
                        {context.t("Read Article")}
                    </a>
                </li>
            </ArticleList>
        ))}
      </ul>

  );
}

FavArticles.contextTypes = {
  t: PropTypes.func
};

const ArticleList = styled.li`
    list-style-type: none;
`;



export default FavArticles;

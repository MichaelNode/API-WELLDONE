import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userOperations } from "../../store/user";
import apiRoutes from "../../config/apiRoutes";
import styled from 'styled-components';

function UnderlinedContents(props, context) {
  const [underlined, setUnderlined] = useState([]);

  useEffect(() => {
    fetch(apiRoutes.underlined)
    .then(res => res.json())
    .catch(error => console.error("Error: ", error))
    .then(response => setUnderlined(response.contents));
  }, [])


  return (

      <ul>
        {underlined && underlined.map(item => (
        <>
            <h2>{item.article.title}</h2>
            <p>"<b>{item.content}" - </b>
                <a href={`${apiRoutes.articles}/${item.user.nick_name}/${item.article.title}-${item.article._id}`}>
                    {context.t("Read Article")}
                </a>
            </p>
        </>
        ))}
      </ul>

  );
}

UnderlinedContents.contextTypes = {
  t: PropTypes.func
};

const ArticleList = styled.li`
    list-style-type: none;
`;



export default UnderlinedContents;

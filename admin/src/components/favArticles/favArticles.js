import React, { Component, useState, useEffect } from "react";
import {Card, Alert, Form,  Button, Col } from 'react-bootstrap'
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
    <Form.Row> 
        {articles && articles.map(item => (
          <Form.Group as={Col}  md="3">
            <Card>
              { item.file_name && (
                <Card.Img variant="top" src={`/images/uploads/${item.file_name}`} />
              )}
              { item.url && item.url_type == 'youtube' && (
                <iframe frameborder="0" allowFullScreen  width="100%" height="100%"
                          src={item.url.replace('watch?v=', 'embed/')}>
                </iframe>
              )}
              {item.url && item.url_type == 'mp4' && (
                <video width="100%" height="100%" controls>
                          <source  src={item.url} type="video/mp4" />
                </video>
              )}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.summary}
                  </Card.Text>
                  <Card.Link href={`${apiRoutes.articles}/${item.author.nick_name}/${item.title}-${item._id}`} > 
                    {context.t("Read Article")} 
                  </Card.Link>
              </Card.Body>
            </Card>   
          </Form.Group>
        ))}
    </Form.Row>
   );
}

FavArticles.contextTypes = {
  t: PropTypes.func
};

const ArticleList = styled.li`
    list-style-type: none;
`;



export default FavArticles;

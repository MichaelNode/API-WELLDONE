import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userOperations } from "../../store/user";
import apiRoutes from "../../config/apiRoutes";
import styled from 'styled-components';
import {Card, Alert, Form,  Button, Col } from 'react-bootstrap'
import './style.css'


function UnderlinedContents(props, context) {
  const [underlined, setUnderlined] = useState([]);

  useEffect(() => {
    fetch(apiRoutes.underlined)
    .then(res => res.json())
    .catch(error => console.error("Error: ", error))
    .then(response => setUnderlined(response.contents));
  }, [])


  return (

      <Form.Row>
        {underlined && underlined.map(item => (
         <Form.Group as={Col}  md="6">
           <Card className="text-center">
              <Card.Body>
                <Card.Title> <h2>{item.article.title}</h2></Card.Title>
                <Card.Text dangerouslySetInnerHTML={{__html: item.content}}>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Card.Link href={`${apiRoutes.articles}/${item.user.nick_name}/${item.article.title}-${item.article._id}`} >
                  <p className="read">{context.t("Read Article")}</p>
                </Card.Link>
              </Card.Footer>
            </Card>
          </Form.Group>
        ))}
      </Form.Row>


  );
}

UnderlinedContents.contextTypes = {
  t: PropTypes.func
};

const ArticleList = styled.li`
    list-style-type: none;
`;



export default UnderlinedContents;

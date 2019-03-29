import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import { articleOperations } from '../../../store/article';


class AddArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      file: "",
      summary:"",
      content: "",
      state:"",
      category: ""
    };
  }

  handleChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState({ state });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addArticle (
      this.state.title,
      this.state.file, 
      this.state.summary, 
      this.state.content,
      this.state.state, 
      this.state.category
    )
  };
    
      render() {
        return (
          <>
            <Card className="text-center">
            <Card.Header>New Article</Card.Header>
            <Card.Body>
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>{this.context.t("Title")}</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={this.handleChange} value={this.state.title} />
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                    <Form.Label>{this.context.t("file")}</Form.Label>
                    <Form.Control type="text" placeholder="file" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>{this.context.t("Summary")}</Form.Label>
                    <Form.Control placeholder="Summary" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>{this.context.t("Content")}</Form.Label>
                    <Form.Control placeholder="Content" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>{this.context.t("State")}</Form.Label>
                    <Form.Control />
                    </Form.Group>

                {/*     <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>{this.context.t("Category")}</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  {this.context.t("Submit")}
                   
                </Button>
            </Form>
            </Card.Body>
           
          </Card>
          </>
        );
      }
    }

    AddArticleForm.contextTypes = {
      t: PropTypes.func
    };

    const mapStateToProps = state => ({
      userNickName: state.user.nickName
   });


  const mapDispatchToProps = dispatch => {
    return {
      addArticle: (title,file,summary,content,state,category) => {
          dispatch(articleOperations.addArticle(title,file,summary,content,state,category));
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddArticleForm);


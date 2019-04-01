import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import { articleOperations } from '../../../store/article';
import {handleInputChange} from '../../../utils/utils';
import Category from '../../category/category'
import EditorComponent from '../editor/editorComponent'
import { EditorState , convertFromHTML,CompositeDecorator, convertToRaw, } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';

import DatePicker from 'react-date-picker';


class AddArticleForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      title: 'dfg',
      summary: '',
      content: '',
      state: false,
      category: '',
      file: [],
      publi_date: new Date(),
      editorState: EditorState.createEmpty(),
      comment: "<p>dfgf<strong>dfgdfg </strong><em><strong>dfg </strong></em><u><em><strong>dfg</strong></em></u></p>\n<p><u><em><strong>dfgdf&nbsp;</strong></em></u></p>\n<p><u><em><strong>dfgfdgdfg&nbsp;</strong></em></u></p>\n<p>&lt;script&gt;console.log('hello world from text"     
    };
  }

   /**
     * Change inputs value on change
     * @param evt
     */



/*   handleChange = event =>ummary: '',
      content: '',
      state: false,
      category: '',
      file: [],
      editorState: EditorState.createEmpty(),
      comment: "{\"blocks\":[{\"key\":\"fdin3\",\"text\":\"<script>console.log('hello world from text rich')</script>\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":58,\"style\":\"color-rgb(33,37,41)\"},{\"offset\":0,\"length\":58,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":58,\"style\":\"fontsize-16\"},{\"offset\":0,\"length\":58,\"style\":\"fontfamily--apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Roboto, Oxygen, Ubuntu, Cantarell, \\\"Fira Sans\\\", \\\"Droid Sans\\\", \\\"Helvetica Neue\\\", sans-serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"     
    };
  }

   /**
     * Change inputs value on change
     * @param evt
     */



/*   handleChange = event => {
     //(event) => this.setState({title: event.target.value })
     console.log(event.target.type)
     this.setS {
     //(event) => this.setState({title: event.target.value })
     console.log(event.target.type)
     this.setState({
       [event.target.id]: event.target.type === 'checkbox'  ? event.target.checked : event.target.value
     });
   } */


  handleInputChange = (evt) => {
    this.setState(handleInputChange(evt));
  };

  convertCommentFromJSONToHTML = (text) => { 
    //console.log( stateToHTML(convertFromRaw(JSON.parse(text))))
    return stateToHTML(convertFromRaw(JSON.parse(text))) 
  };

 

 /*  onEditorStateChange = (editorState) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    console.log(blocks)
    console.log('entro a block', value)
    this.setState({
      editorState:value,
    });
  }; */

  onEditorStateChange = (editorState) => this.setState({editorState});
  onChangeDate = date => this.setState({  publi_date:date })

  onChange = (event) => {
    this.setState({file:event.target.files[0]});
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
      }.bind(this);
  };


  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state.publi_date)
    const convertedData = convertToRaw(this.state.editorState.getCurrentContent())
    const content = stateToHTML(convertFromRaw(convertedData))
    this.props.addArticle (
      this.state.title,
      this.state.file,
      this.state.summary, 
      content,
      this.state.state, 
      this.state.category,
      this.state.publi_date
    )   
  };

    
  render() {
    return (
      <>
        <Card className="text-center">
          <Card.Header>New Article</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit } encType="multipart/form-data"  >
              <Form.Row>
                <Form.Group as={Col}  md="4" controlId="title">
                  <Form.Label>{this.context.t("Title")}</Form.Label>
                  <Form.Control
                    name="title"
                    onChange={this.handleInputChange}   
                    value={this.state.title} 
                  />
                </Form.Group>
                <Form.Group controlId="file" md="4">
                  <Form.Label>{this.context.t("File")}</Form.Label>
                  <Form.Control
                    name="file" 
                    type="file" 
                    onChange= {this.onChange}   
                  />
                  
                </Form.Group>
                <Form.Group as={Col}  md="4">
                <Card style={{ width: '18rem' }}>
                  <Card.Img  src={this.state.imgSrc} />
                 
                </Card>
                </Form.Group>

              <Form.Group as={Col}  md="2">
              <Form.Label>{this.context.t("Date public")}</Form.Label>
                <DatePicker
                  name="publi_date"
                  onChange={this.onChangeDate}
                  value={this.state.publi_date}
                />
     
              </Form.Group>
             
              </Form.Row>
                <Form.Group controlId="summary">
                  <Form.Label>{this.context.t("Summary")}</Form.Label>
                  <Form.Control
                    name="summary"
                    as="textarea" 
                    rows="3"  
                    placeholder="Summary" 
                    onChange={this.handleInputChange}  
                    value={this.state.summary} 
                  />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>{this.context.t("Content")}</Form.Label>
                  
                  <EditorComponent
                    handleChange={this.onEditorStateChange}  
                    editorState={this.state.editorState} 
                  />  
                </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="state">
                  <Form.Label>{this.context.t("State")}</Form.Label>
                  <Form.Control
                    name="state" 
                    as="select"
                    onChange={this.handleInputChange}  
                    value={this.state.state} 
                  >
                    <option value={true} >Choose...</option>
                    <option value={false} >...</option>
                  </Form.Control>

                           
                </Form.Group>

                <Category
                  handleChange={this.handleInputChange}  
                  value={this.state.category}
                />
                <div 
                dangerouslySetInnerHTML={{ __html: this.state.comment}}>  
                </div>
              </Form.Row>
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
      addArticle: (title,file,summary,content,state,category,publi_date) => {
          dispatch(articleOperations.addArticle(title,file,summary,content,state,category,publi_date));
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddArticleForm);


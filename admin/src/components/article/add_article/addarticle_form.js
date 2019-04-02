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

import '../style/input-file.css'




import DatePicker from 'react-date-picker';


class AddArticleForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      title: '',
      summary: '',
      content: '',
      state: null,
      category: '',
      file: [],
      publi_date: new Date(),
      editorState: EditorState.createEmpty(),
      url: '',
      ask_file: ''
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
    console.log(this.state.state)

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
  
  onChangeDate = date => this.setState({ publi_date:date })

  onChange = (event) => {
    console.log(event.target.files[0])
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
      this.state.publi_date,
      this.state.url
    )   
  };

    
  render() {
    return (
      <>
        <Card className="text-center">
          <Card.Header>{this.context.t("New Article")}</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit } encType="multipart/form-data"  >
              <Form.Row>
                <Form.Group as={Col}  md="6" controlId="title">
                  <Form.Label>{this.context.t("Title")}</Form.Label>
                  <Form.Control
                    name="title"
                    onChange={this.handleInputChange}   
                    value={this.state.title} 
                  />
                </Form.Group>

                <Category
                  handleChange={this.handleInputChange}  
                  value={this.state.category}
                />
               
              
                <Form.Group as={Col}  md="4" controlId="url">
                  <Form.Label>{this.context.t("Imagen o video?")}</Form.Label>
                
                  <Form.Control
                    name="ask_file" 
                    as="select"
                    onChange={this.handleInputChange}  
                    value={this.state.ask_file} 
                  >
                    <option>{this.context.t("Choose")}</option>
                    <option value="video" >{this.context.t("Video")}</option>
                    <option value="imagen">{this.context.t("Image")}</option>
                  </Form.Control>
                </Form.Group>

    
                { this.state.ask_file === 'imagen' && ( 
               
               <Form.Group  md="4" >
                 
                  <Form.Control
                    name="file" 
                    type="file"
                    onChange= {this.onChange}   
                  />
               
                  <Card style={{ width: '18rem' }}>
                  <Card.Img  src={this.state.imgSrc} />
                  <Card.Body>
                    <Card.Title>{this.state.file.name}</Card.Title>
                    <Card.Text>
                      <p>{this.context.t("Type")} {this.state.file.type}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
                  
                </Form.Group>
            ) }
            { this.state.ask_file === 'video' && ( 
              <Form.Group as={Col}  md="4" controlId="url">
                  <Form.Label>{this.context.t("URL")}</Form.Label>
                  <Form.Control
                    type="url"
                    name="url"
                    onChange={this.handleInputChange}   
                    value={this.state.url} 
                  />
                </Form.Group>
            ) }

             
              </Form.Row>
                
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="state">
                    <Form.Label>{this.context.t("State")}</Form.Label>
                    <Form.Control
                      name="state" 
                      as="select"
                      onChange={this.handleInputChange}  
                      value={this.state.state} 
                    >
                      <option>{this.context.t("Choose")}</option>
                      <option value={true} >{this.context.t("Published")}</option>
                      <option value={false}>{this.context.t("Draft")}</option>
                    </Form.Control>     
                </Form.Group>

              { this.state.state == false && ( 

                <Form.Group as={Col}  md="2">
                <Form.Label>{this.context.t("Publication date")}</Form.Label>
                  <DatePicker
                    name="publi_date"
                    onChange={this.onChangeDate}
                    value={this.state.publi_date}
                  />
      
                </Form.Group>
              
              )}

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
      addArticle: (title,file,summary,content,state,category,publi_date,url) => {
          dispatch(articleOperations.addArticle(title,file,summary,content,state,category,publi_date,url));
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddArticleForm);


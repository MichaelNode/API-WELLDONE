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
import { EditorState , convertFromHTML,ContentState , convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';
import '../style/input-file.css'
import '../style/inputDate.css'
import DatePicker from 'react-date-picker';
import '../style/validation.css'
import moment from 'moment';
import '../style/main.css'


class AddArticleForm extends Component {
  constructor(props) {
   
    const html = '<div><p><h1>hello</h1></p></div>'
    const blocksFromHTML = convertFromHTML(html)
    const content = ContentState.createFromBlockArray(blocksFromHTML)
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      title: '',
      summary: '',
      content: '',
      state: '',
      category: null,
      file: [],
      publi_date: new Date(),
      editorState: EditorState.createEmpty(),  // EditorState.createWithContent(content),
      url: '',
      ask_file: null,
      titleError: '',
      summaryError: '',
      contentError: '',
      stateError: '',
      categoryError: '',
      fileError: '',
      publi_dateError: '',
      editorStateError: '',
      showCard: false,
      showCardtube: false,
      showCardMP4: false
    };
  }

  validate = () => {
    let titleError = ''
    let summaryError =  ''
    let contentError =  ''
    let stateError =  ''
    let categoryError =  ''
    let fileError =  ''
    let publi_dateError = ''
    let urlError = ''
    let ask_fileError = ''
    let editorStateError= ''
    let datenow = null
    let datepubli = null
    const fileMaxSize = 15 * 1000 * 1000; // 15MB

    console.log(this.state.file, this.state.url )

    if(this.state.title == '') {
      titleError = 'Title required'
    }
    if(this.state.ask_file == null ) {
      ask_fileError = 'required'
    }
    if(this.state.ask_file == 'imagen' && !this.state.file) {
      fileError = 'Image is required'
    }
    if(this.state.file && this.state.file.name !== undefined && this.state.ask_file == 'imagen' && !(
        this.state.file.name.includes('.jpg') ||
        this.state.file.name.includes('.jpg') || 
        this.state.file.name.includes('.png')))
    {
      fileError = 'Invalid image'
    }

    if(this.state.file && this.state.file.size > fileMaxSize && this.state.ask_file == 'imagen')
    {
        fileError = 'The image must be less than 15 mb'
    }
    
    if(this.state.ask_file == 'video' && !this.state.url) {
      urlError = 'URL is required'
    }

    // validate video youtebe or mp4

    if(this.state.ask_file == 'video' 
      && this.state.url 
      && !(this.state.url.includes('.mp4') 
        || this.state.url.includes('https://www.youtube.com/'))) {
        urlError = 'URL is not valid'
    }
  
    
    if(this.state.publi_date) {
      datepubli = moment(this.state.publi_date).format('DD-MM-YYYY');
      datenow = moment(Date.now()).format('DD-MM-YYYY');
     
      if(this.state.state == 'true' && datepubli < datenow) {
        publi_dateError = "the publication date cannot be less than today's"
      }
    }
    
    if(this.state.state == 'true' && this.state.publi_date === null) {
      publi_dateError = "the publication date is required"
    }
    if(this.state.state == '') {
      stateError = 'State required'
    }
    if(this.state.summary == '') {
      summaryError = 'Summary required'
    }
    if(this.state.category == null) {
      categoryError = 'Category required'
    }
    if(!convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text)
    {
      editorStateError = "Content required"
    }
    if(summaryError || categoryError || 
        editorStateError || titleError ||
        ask_fileError || stateError || 
        publi_dateError || 
        fileError|| urlError) {
          this.setState({
            summaryError,
            categoryError, 
            editorStateError,
            titleError,
            ask_fileError,
            stateError,
            publi_dateError,
            fileError,
            urlError,
          
          })
          return false;
    }
    return true;
  } 

  handleInputChange = (evt) => {

   
    if(this.state.ask_file === "imagen"){
       this.setState({url: null})
       console.log('zxczx',this.state.url)
    }
    if(this.state.ask_file === "video"){
      this.setState({ file: null})
    }
    if(this.state.state === "false"){
      this.setState({ publi_date: null})
    }
  
   if(evt.target.name == 'url'){
      if(evt.target.value.includes('.mp4')){
        this.setState({
          showCardMP4: true, 
          showCardtube: false})
      }
      if (evt.target.value.includes('https://www.youtube.com/')){
        this.setState({
          showCardtube:true, 
          showCardMP4: false,  
        })
      }
      if(!(evt.target.value.includes('https://www.youtube.com/') ||
          evt.target.value.includes('.mp4'))){
            this.setState({
              showCardtube:false, 
              showCardMP4: false,  
            })
          }
    }

    this.setState(handleInputChange(evt));
  };

  convertCommentFromJSONToHTML = (text) => { 
    return stateToHTML(convertFromRaw(JSON.parse(text))) 
  };

  onEditorStateChange = (editorState) => this.setState({editorState});
  
  onChangeDate = date => this.setState({ publi_date:date })

  onChange = (event) => {
    if(event.target.files[0])
    {
      if( event.target.files[0].name.includes('.jpg') ||
          event.target.files[0].name.includes('.jpg') || 
          event.target.files[0].name.includes('.png'))
          {
            this.setState({showCard: true})
          } else {
            this.setState({showCard: false})
          }
      this.setState({file:event.target.files[0]});
      var reader = new FileReader();
      var url = reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
      }.bind(this);
    }
  };


  handleSubmit = event => {
    event.preventDefault()
    let nick =  this.props.userData.nickName
    let token = this.props.token
    const isValid = this.validate();
    if (isValid) {
      const convertedData = convertToRaw(
          this.state.editorState.getCurrentContent())
      const content = stateToHTML(convertFromRaw(convertedData))
      this.props.addArticle (
        this.state.title,
        this.state.file,
        this.state.summary, 
        content,
        this.state.state, 
        this.state.category,
        this.state.publi_date,
        this.state.url,
        token,
        nick
      )  
    } 
  };

  render() {
    return (
      <>
        <Card className="text-center card-main">
          <Card.Header>{this.context.t("New Article")}</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit } noValidate encType="multipart/form-data"  >
              <Form.Row>
                <Form.Group as={Col}  md="6" controlId="title">
                  <Form.Label className="label"  ><span>{this.context.t("Title")}</span></Form.Label>
                  { this.state.titleError ?(
                       <div className="errorValidation">{this.state.titleError}</div>
                  ): null}
                  <Form.Control
                    className="inp"
                    name="title"
                    onChange={this.handleInputChange}   
                    value={this.state.title} 
                    required
                  />
                </Form.Group>
                <Category
                  handleChange={this.handleInputChange}  
                  value={this.state.category}
                  categoryError={this.state.categoryError}
                />
                <Form.Group as={Col}  md="12" controlId="summary">
                  <Form.Label>{this.context.t("Summary")}</Form.Label>
                  { this.state.summaryError ?(
                       <div className="errorValidation">{this.state.summaryError}</div>
                  ): null}
                  <Form.Control
                    name="summary"
                    as="textarea" 
                    rows="3"  
                    placeholder="Summary" 
                    onChange={this.handleInputChange}  
                    value={this.state.summary}                  
                  />
                </Form.Group>
                <EditorComponent
                  handleChange={this.onEditorStateChange}  
                  editorState={this.state.editorState}
                  editorStateError={this.state.editorStateError} 
                /> 
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="state">
                    <Form.Label>{this.context.t("State")}</Form.Label>
                    { this.state.stateError ?(
                       <div className="errorValidation">{this.state.stateError}</div>
                    ): null}
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
              { this.state.state === "true" && ( 
                <Form.Group as={Col}  md="6">
                <Form.Label>{this.context.t("Publication date")}</Form.Label>
                { this.state.publi_dateError ?(
                       <div className="errorValidation">{this.state.publi_dateError}</div>
                  ): null}
                  <DatePicker
                    className="form-control"
                    name="publi_date"
                    onChange={this.onChangeDate}
                    value={this.state.publi_date}
                    required
                  />
                </Form.Group>
              )}
             
                <Form.Group as={Col}  md="12" controlId="url">
                  <Form.Label>{this.context.t("Upload file")}</Form.Label>
                  { this.state.ask_fileError ?(
                       <div className="errorValidation">{this.state.ask_fileError}</div>
                  ): null}
                  <Form.Control
                    name="ask_file" 
                    as="select"
                    onChange={this.handleInputChange}  
                    value={this.state.ask_file} 
                    required
                  >
                    <option >{this.context.t("Choose")}</option>
                    <option value="video" >Video</option>
                    <option value="imagen">Imagen</option>
                  </Form.Control>
                </Form.Group>

                { this.state.ask_file === 'imagen'  && ( 
                <Form.Group as={Col} md="12" >
                <Form.Label>{this.context.t("Upload image")}</Form.Label>
                { this.state.fileError  ?(
                       <div className="errorValidation">{this.state.fileError}</div>
                    ): null}
                  <Form.Control
                    name="file" 
                    type="file"
                    onChange= {this.onChange}  
                    accept=".jpg,.jpge,.png"  
                  />
                  { this.state.file !== null && this.state.showCard == true   && ( 
                  <Card className="preview" style={{ width: '18rem' }}>
                   <Card.Header>{this.context.t("Preview")}</Card.Header>
                    <Card.Img  src={this.state.imgSrc} />
                    <Card.Body>
                      <Card.Title>{this.state.file.name}</Card.Title>
                      <Card.Text>
                        {this.context.t("Type")} {this.state.file.type}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
                </Form.Group>
            ) }
            { this.state.ask_file === 'video' && ( 
              <Form.Group as={Col}  md="12" controlId="url">
                  <Form.Label>{this.context.t("Video URL")}</Form.Label>
                  { this.state.urlError ?(
                       <div className="errorValidation">{this.state.urlError}</div>
                  ): null}
                  <Form.Control
                    type="url"
                    name="url"
                    onChange={this.handleInputChange}   
                    value={this.state.url} 
                  />
                  <br/>
                  { this.state.url && this.state.showCardtube  && ( 
                    <Card className="preview" style={{ width: '18rem', }}>
                    <Card.Header>{this.context.t("Preview")}</Card.Header>
                    <Card.Body>    
                    <iframe frameborder="0" allowFullScreen  width="100%" height="100%"
                      src={this.state.url.replace('watch?v=', 'embed/')}>
                    </iframe>
                    </Card.Body>
                  </Card> 
                  )}
                  <br/>
                  { this.state.url && this.state.showCardMP4  && ( 
                  <Card className="preview" style={{ width: '18rem', }}>
                    <Card.Header>{this.context.t("Preview")}</Card.Header>
                    <Card.Body>    
                    <video width="100%" height="100%" controls>
                      <source  src={this.state.url} type="video/mp4" />
                      </video>
                    </Card.Body>
                  </Card>
                  )}
                </Form.Group>
            ) }
              <Button className="button-send" variant="primary" type="submit">
                  {this.context.t("Submit")}  
              </Button>
              </Form.Row> 
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
    userData: state.user.userData,
    token: state.user.token
 });

  const mapDispatchToProps = dispatch => {
    return {
      addArticle: (title,file,summary,content,state,category,publi_date,url,token, nickName) => {
          dispatch(articleOperations.addArticle(
            title,
            file,
            summary,
            content,
            state,
            category,
            publi_date,
            url,
            token,
            nickName
          ));
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddArticleForm);


import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Card, Alert} from 'react-bootstrap'
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
import apiRoutes from '../../../config/apiRoutes';

class EditArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        article: {},
        title: '',
        summary: '',
        content: '',
        state: false,
        category: null,
        publi_date:null,
        file_name: '',
        file_type: '',
        url: '',
        id: '',
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
    }
}


handleInputChange = (evt) => {
 
  if(this.state.state === false){
    this.setState({ publi_date: null})
  }

  if(( this.state.url.length > 0)  ){
      this.setState({ file: null})
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


onEditorStateChange = (editorState) => this.setState({editorState});
onChangeDate = date => this.setState({ publi_date:date })

onChange = (event) => {
  if(event.target.files[0])
  {
    this.setState({url:''})
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

async  componentDidMount() {
  let id = this.props.match.params.id;
  const data = await fetch(apiRoutes.article_edit + id)
      .then(result => {
         return result.json();
      }).then(data => {
        const article = data.result
        const blocksFromHTML = convertFromHTML(article.content)
        const content = ContentState.createFromBlockArray(blocksFromHTML)
        var datePublic = null
  
          if(article.publi_date){
            datePublic = new Date(article.publi_date) 
            } else {
              datePublic = null
               }
               if (article) {
  
       this.setState({
            title:   article.title,
            summary: article.summary,
            content: article.content,
            state: article.state,
            category: article.category,
            publi_date: datePublic ,
            url: article.url,
            file_name: article.file_name,
            file_type: article.file_type,
            id: article._id,
            editorState :  EditorState.createWithContent(content),
            file: article.file_name
        }) 
      }

      })
    
  
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
  let editorStateError= ''
  let datenow = null
  let datepubli = null
  const fileMaxSize = 15 * 1000 * 1000; // 15MB

  if(this.state.title == '') {
    titleError = 'Title required'
  } else if (!this.state.title == ''){ 
    this.setState({ titleError: ''})
  }

  
  if(!this.state.file &&  this.state.url == 'undefined') {
    fileError = 'Image is required'
  } else if (this.state.file){ 
    this.setState({ fileError: ''})
  }

  if(this.state.file && 
    this.state.file.name !== undefined && !(
      this.state.file.name.includes('.jpg') ||
      this.state.file.name.includes('.jpg') || 
      this.state.file.name.includes('.png'))){
        fileError = 'Invalid image'

  } else if (this.state.file && 
      this.state.file.name !== undefined &&  (
        this.state.file.name.includes('.jpg') ||
        this.state.file.name.includes('.jpg') || 
        this.state.file.name.includes('.png'))){ 
          this.setState({ fileError: ''})
  }

  if(this.state.file && 
    this.state.file.size > fileMaxSize){
    fileError = 'The image must be less than 15 mb'

  } else if (this.state.file && 
    this.state.file.size < fileMaxSize ){ 
      this.setState({ fileError: ''})
  }
  
  if(this.state.publi_date) {
    datepubli = moment(this.state.publi_date).format('DD-MM-YYYY');
    datenow = moment(Date.now()).format('DD-MM-YYYY');
    if(this.state.state == 'true' && datepubli < datenow) {
      publi_dateError = "the publication date cannot be less than today's"

    } else { 
      this.setState({ publi_dateError: ''})
    }
  }


  if(this.state.url 
  && !(this.state.url.includes('.mp4') 
    || this.state.url.includes('https://www.youtube.com/'))) {
      urlError = 'URL is not valid'

  }  else if (  this.state.url 
      &&  (this.state.url.includes('.mp4') 
        || this.state.url.includes('https://www.youtube.com/'))){ 
          this.setState({ urlError: ''})
  }
  
  if(this.state.state == 'true' && this.state.publi_date === null) {
    publi_dateError = "the publication date is required"

  } else if (this.state.state == 'true' && !this.state.publi_date === null){ 
    this.setState({ publi_dateError: ''})
  }

  if(this.state.state == 'false' || this.state.state == null ) {
    stateError = 'State required'
  } else if (!this.state.state == ''){ 
    this.setState({ stateError: ''})
  }

  if(this.state.summary == '') {
    summaryError = 'Summary required'
  } else if (!this.state.summary == ''){ 
    this.setState({ summaryError: ''})
  }
   
  if(this.state.category == '' ||  this.state.category == 'Escoge...') {
    categoryError = 'Category required'
  } else if (!this.state.category == ''){ 
    this.setState({ categoryError: ''})
  }
 
  
  if(!convertToRaw(
      this.state.editorState.getCurrentContent()).blocks[0].text){
        editorStateError = "Content required"

  } else if (convertToRaw(
      this.state.editorState.getCurrentContent()).blocks[0].text){ 
        this.setState({ editorStateError: ''})
  }

  if(summaryError || categoryError || 
        editorStateError || titleError ||
        stateError || 
        publi_dateError || 
        fileError|| urlError) {
         
          this.setState({
          
            titleError: titleError,
            summaryError: summaryError,
            stateError: stateError,
            categoryError: categoryError,
            fileError: fileError,
            publi_dateError:  publi_dateError,
            editorStateError: editorStateError,
            urlError: urlError
          
          })
          return false;
  }
  return true;
} 


handleSubmit = (e) => {
  e.preventDefault();
  let idUser =  this.props.userData._id
  let token = this.props.token
  const isValid = this.validate();
  if (isValid) {
    const convertedData = convertToRaw(
    this.state.editorState.getCurrentContent())
    const content = stateToHTML(convertFromRaw(convertedData))
      this.props.EditArticle (
      this.state.title,
      this.state.file,
      this.state.summary, 
      content,
      this.state.state, 
      this.state.category,
      this.state.publi_date,
      this.state.url,
      token,
      idUser,
      this.state.id
    )  
  }
}


render() {
  return (
    <>
      <Card className="text-center card-main">
        <Card.Header>{this.context.t("Edit Article")} : {this.state.title}</Card.Header>
        <Card.Body>
          <Form method="PUT" onSubmit={this.handleSubmit } noValidate encType="multipart/form-data">
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
                    <option key={true} value={true} >{this.context.t("Published")}</option>
                    <option key={false} value={false}>{this.context.t("Draft")}</option>
                  </Form.Control>     
              </Form.Group>
            { (this.state.publi_date )  && ( 
              <Form.Group as={Col}  md="6">
              <Form.Label>{this.context.t("Publication date")}</Form.Label>
              {  this.state.publi_dateError  ?(
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

              <Form.Group as={Col} md="6" >
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
                { this.state.file    && ( 
                <Card className="preview" style={{ width: '18rem' }}>
                 <Card.Header>{this.context.t("Preview")}</Card.Header>
                  <Card.Img  src={this.state.imgSrc || `/images/uploads/${this.state.file_name}`} />
                  <Card.Body>
                    <Card.Title>{this.state.file.name || this.state.file_name }</Card.Title>
                   
                  </Card.Body>
                </Card>
              )}
              </Form.Group>
       
            <Form.Group as={Col}  md="6" controlId="url">
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
                { this.state.url &&
                  !this.state.file_name &&
                   this.state.url.includes('www.youtube.com') && ( 
                  <Card className="preview" style={{ width: '18rem', }}>
                  <Card.Header>{this.context.t("Preview")}</Card.Header>
                  <Card.Body>    
                  <iframe frameBorder="0" allowFullScreen  width="100%" height="100%"
                    src={this.state.url.replace('watch?v=', 'embed/')}>
                  </iframe>
                  </Card.Body>
                </Card> 
                )}
                <br/>
                { this.state.url && 
                  this.state.url.includes('.mp4') && ( 
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
           
            { this.props.message && ( 
              <Form.Group as={Col}  md="12" >
                <Alert   md="12" variant= 'success'>
                  {this.context.t(this.props.message)} 
                </Alert> 
              </Form.Group>
            )}  
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

EditArticleForm.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  token: state.user.token,
  message: state.article.message
});

const mapDispatchToProps = dispatch => {
  return {
    EditArticle: (title,file,summary,content,state,category,publi_date,url,token, userId, id) => {
        dispatch(articleOperations.EditArticle(
          title,
          file,
          summary,
          content,
          state,
          category,
          publi_date,
          url,
          token,
          userId,
          id
        ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticleForm);
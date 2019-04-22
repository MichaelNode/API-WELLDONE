import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import {Card, Alert, Form,  Button, Col } from 'react-bootstrap'
import { articleOperations } from '../../../store/article';
import { handleInputChange} from '../../../utils/utils';
import Category from '../../category/category'
import EditorComponent from '../editor/editorComponent'
import { EditorState , convertFromHTML, ContentState , convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import '../style/input-file.css'
import '../style/inputDate.css'
import DatePicker from 'react-date-picker';
import '../style/validation.css'
import moment from 'moment';
import '../style/main.css'
import apiRoutes from '../../../config/apiRoutes';
import FileComponent from '../fileUpload/file'
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { Redirect } from 'react-router-dom'





class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      title: '',
      summary: '',
      content: '',
      state: '',
      category: '',
      file: null,
      publi_date: new Date(),
      editorState: EditorState.createEmpty(),
      url: '',
      id: '',
      ask_file: null,
      titleError: '',
      summaryError: '',
      stateError: '',
      categoryError: '',
      fileError: '',
      publi_dateError: '',
      editorStateError: '',
      urlError: '',
      ask_fileError: '',
      showCard: false,
      showCardtube: false,
      showCardMP4: false,
      fireRedirect: false

    };
  }

  async  componentDidMount() {
    if(this.props.type=='EDIT'){
      let id = this.props.id;
      const data = await fetch(apiRoutes.article_edit + id)
        .then(result => {
           return result.json();
        }).then(data => {
            if(data.result){
              const article = data.result
              const blocksFromHTML = convertFromHTML(article.content)
              const content = ContentState.createFromBlockArray(blocksFromHTML)
              var datePublic = null
              if(article.publi_date){
                datePublic = new Date(article.publi_date)
              }else {
                datePublic = null
              }
              if(article) {
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
            }
        })
    }
  }

  validate = () => {
    let titleError = ''
    let summaryError =  ''
    let stateError =  ''
    let categoryError =  ''
    let fileError =  ''
    let publi_dateError = ''
    let urlError = ''
    let ask_fileError = ''
    let editorStateError= ''
    let datenow = null
    let datepubli = null
    let date_fin = null
    const fileMaxSize = 15 * 1000 * 1000; // 15MB

    if(this.state.title == '') {
      titleError = this.context.t('Title required')
    } else if (!this.state.title == ''){
      this.setState({ titleError: ''})
    }

    if(this.props.type=='ADD'){
        if(this.state.ask_file == null ) {
        ask_fileError = this.context.t('required')
        } else if (!this.state.ask_file == ''){
        this.setState({ ask_fileError: ''})
        }

        if(this.state.ask_file == 'imagen' && !this.state.file) {
            fileError = this.context.t('Image is required')
        } else if (!this.state.ask_file == 'imagen' && this.state.file){
            this.setState({ fileError: ''})
        }

        if(this.state.ask_file == 'video' && !this.state.url) {
            urlError = this.context.t('URL is required')
        } else if (this.state.ask_file == 'video' && this.state.url){
            this.setState({ urlError: ''})
        }

          // validate video youtebe or mp4

        if(this.state.ask_file == 'video'
              && this.state.url
              && !(this.state.url.includes('.mp4')
                || this.state.url.includes('https://www.youtube.com/'))) {
                  urlError = this.context.t('URL is not valid')

        }  else if (this.state.ask_file == 'video'
              && this.state.url
              &&  (this.state.url.includes('.mp4')
                || this.state.url.includes('https://www.youtube.com/'))){
                  this.setState({ urlError: ''})
        }
    }

    if(this.props.type=='EDIT'){
        if(!this.state.file &&  this.state.url == 'undefined') {
            fileError = this.context.t('Image is required')
        } else if (this.state.file){
            this.setState({ fileError: ''})
        }

        if(this.state.url
            && !(this.state.url.includes('.mp4')
              || this.state.url.includes('https://www.youtube.com/'))) {
                urlError = this.context.t('URL is not valid')

        }  else if (  this.state.url
                &&  (this.state.url.includes('.mp4')
                  || this.state.url.includes('https://www.youtube.com/'))){
                    this.setState({ urlError: ''})
        }
    }


    if(this.state.file &&
        this.state.file.name !== undefined &&
        this.state.ask_file == 'imagen' && !(
          this.state.file.name.includes('.jpg') ||
          this.state.file.name.includes('.jpg') ||
          this.state.file.name.includes('.png'))){
            fileError = this.context.t('Invalid image')

    } else if (this.state.file &&
        this.state.file.name !== undefined &&
        this.state.ask_file == 'imagen' && (
          this.state.file.name.includes('.jpg') ||
          this.state.file.name.includes('.jpg') ||
          this.state.file.name.includes('.png'))){
            this.setState({ fileError: ''})
    }

    if(this.state.file &&
        this.state.file.size > fileMaxSize &&
        this.state.ask_file == 'imagen'){
        fileError = this.context.t('The image must be less than 15 mb')

    } else if (this.state.file &&
        this.state.file.size < fileMaxSize &&
        this.state.ask_file == 'imagen'){
          this.setState({ fileError: ''})
    }

    if(this.state.publi_date) {
      datepubli = new Date( this.state.publi_date )
      datenow = moment(Date()).format('YYYY-MM-DD');
      date_fin = new Date(datenow + ' 00:00:00')
      if(( this.state.state == 'true'|| this.state.state == true) &&
        datepubli <= (new Date(date_fin.setDate(date_fin.getDate()-1)))) {
          publi_dateError = this.context.t("the publication date cannot be less than today's")
      } else {
        this.setState({ publi_dateError: ''})
      }
    }

    if(( this.state.state == 'true'|| this.state.state == true) &&
      this.state.publi_date === null) {
        publi_dateError = this.context.t("the publication date is required")

    } else if (( this.state.state == 'true'|| this.state.state == true) &&
      !this.state.publi_date === null){
        this.setState({ publi_dateError: ''})
    }

    if( this.state.state == null ||
        this.state.state == 'Escoge...' ||
        this.state.state == 'Choose..' ) {
        stateError = this.context.t('State required')
      } else if (!this.state.state == ''){
        this.setState({ stateError: ''})
      }

    if(this.state.summary == '') {
      summaryError = this.context.t('Summary required')
    } else if (!this.state.summary == ''){
      this.setState({ summaryError: ''})
    }

    if(this.state.category == '' ||
        this.state.category == 'Escoge...' ||
        this.state.category == 'Choose..') {
      categoryError = this.context.t('Category required')
    } else if (!this.state.category == ''){
      this.setState({ categoryError: ''})
    }

    if(!convertToRaw(
        this.state.editorState.getCurrentContent()).blocks[0].text){
          editorStateError = this.context.t("Content required")

    } else if (convertToRaw(
        this.state.editorState.getCurrentContent()).blocks[0].text){
          this.setState({ editorStateError: ''})
    }

    if(summaryError || categoryError ||
        editorStateError || titleError ||
        ask_fileError || stateError ||
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
            urlError: urlError,
            ask_fileError:  ask_fileError
          })
          return false;
    }
    return true;
  }

  handleInputChange = (evt) => {

    if(this.props.type=='ADD'){
        if(this.state.ask_file === "imagen"){
        this.setState({url: null})
        }
        if(this.state.ask_file === "video"){
        this.setState({ file: null})
        }
    }
    if(this.state.state === "false"){
      this.setState({ publi_date: null})
    }

    if(this.props.type=='EDIT'){
        if(( this.state.url && this.state.url.length > 0)  ){
            this.setState({ file: null})
        }
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
      if( event.target.files[0].name.includes('.jpg') ||
          event.target.files[0].name.includes('.jpeg') ||
          event.target.files[0].name.includes('.png'))
          {
            this.setState({showCard: true})
          } else {
            this.setState({showCard: false})
          }
      this.setState({url:''});
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
    let id = this.props.article_response
    let idUser =  this.props.userData._id
    let token = this.props.token
    const isValid = this.validate();
    if (isValid) {
        const convertedData = convertToRaw(
          this.state.editorState.getCurrentContent())
        const content = stateToHTML(convertFromRaw(convertedData))
        if(this.props.type=='ADD'){
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
                idUser,
                id,
            )}
        if(this.props.type=='EDIT'){
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
          
          this.setState({ fireRedirect: true })
        }
    };

  render() {
    return (
      <>
      <OCAlertsProvider />
   
      <Form.Row>
        <Card as={Col}  md="4"  className="text-center card-main">
          { this.props.type == 'ADD' && (
            <Card.Header>{this.props.title}</Card.Header>
          )}
          { this.props.type == 'EDIT' && (
            <Card.Header>{this.props.title} : {this.state.title}</Card.Header>
          )}
          <Card.Body>
         
            <Form onSubmit={this.handleSubmit } noValidate encType="multipart/form-data"  >
              <Form.Row>
                <Form.Group as={Col}  md="6" controlId="title">
                  <Form.Label className="label"><span>{this.context.t("Title")}</span></Form.Label>
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
                 <Form.Group as={Col} md="12" controlId="state">
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
                {((this.props.type == 'ADD' && this.state.state === "true") ||
                  (this.props.type == 'EDIT')) && (
                    <Form.Group as={Col}  md="12">
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

              </Form.Row>
              <Form.Row>
                <FileComponent
                  ask_fileError={this.state.ask_fileError}
                  fileError={this.state.fileError}
                  urlError={this.state.urlError}
                  ask_file={this.state.ask_file}
                  file={this.state.file}
                  file_name = {this.state.file_name}
                  showCard={this.state.showCard}
                  imgSrc={this.state.imgSrc}
                  url={this.state.url}
                  showCardtube={this.state.showCardtube}
                  showCardMP4={this.state.showCardMP4}
                  onChange={this.onChange}
                  handleInputChange={this.handleInputChange}
                  type={this.props.type}
               />
          
              <Button className="button-send" variant="primary" type="submit">
                  {this.context.t("Save")}
              </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
        <Card as={Col}  md="8"  className="text-center card-main">
          <Card.Header>{this.context.t("Content")}</Card.Header>
          <Card.Body className='editor-wrapper'>
            <Form.Row className="formeditor">
                    <EditorComponent
                    handleChange={this.onEditorStateChange}
                    editorState={this.state.editorState}
                    editorStateError={this.state.editorStateError}
                    />
            </Form.Row>
          </Card.Body>
        </Card>
        </Form.Row>
      </>
        );
      }
  }

  ArticleForm.contextTypes = {
    t: PropTypes.func
  };

  const mapStateToProps = state => ({
    userData: state.user.userData,
    token: state.user.token,
    message: state.article.message
 });

  const mapDispatchToProps = dispatch => {
    return {
      addArticle: (
        title,
        file,
        summary,
        content,
        state,
        category,
        publi_date,
        url,token,
        userId,
        id) => {
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
            userId,
            id
          ));
      },
      EditArticle: (
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
        id) => {
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
  )(ArticleForm);


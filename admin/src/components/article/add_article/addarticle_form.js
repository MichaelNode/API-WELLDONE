import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import {Card, Alert, Form,  Button, Col } from 'react-bootstrap'
import { articleOperations } from '../../../store/article';
import { handleInputChange} from '../../../utils/utils';
import Category from '../../category/category'
import EditorComponent from '../editor/editorComponent'
import { EditorState , convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';
import '../style/input-file.css'
import '../style/inputDate.css'
import DatePicker from 'react-date-picker';
import '../style/validation.css'
import moment from 'moment';
import '../style/main.css'
import FileComponent from '../fileUpload/file'
import ArticleForm from '../form_article/form_article'


class AddArticleForm extends Component {

  render() {
    return (
      <>
        <ArticleForm
          article_response={this.props.match.params.id}
          type='ADD'
         />
      </>
        );
    }
  }

  AddArticleForm.contextTypes = {
    t: PropTypes.func
  };

  const mapStateToProps = state => ({
    userData: state.user.userData,
    token: state.user.token,
    message: state.article.message
 });

  const mapDispatchToProps = dispatch => {
    return {
      addArticle: (title,file,summary,content,state,category,publi_date,url,token, userId,id) => {
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
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddArticleForm);


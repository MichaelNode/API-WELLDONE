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
import ArticleForm from '../form_article/form_article'

class EditArticleForm extends Component {
 


render() {
  return (
    <> 
      <ArticleForm
      id={this.props.match.params.id}
      type='EDIT'
      />
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
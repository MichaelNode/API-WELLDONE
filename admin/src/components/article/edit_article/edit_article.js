import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import '../style/input-file.css'
import '../style/inputDate.css'
import '../style/validation.css'
import '../style/main.css'
import ArticleForm from '../form_article/form_article'

class EditArticleForm extends Component {
 
render() {
  return (
    <> 
      <ArticleForm
      id={this.props.match.params.id}
      type='EDIT'
      title={this.context.t("Edit Article")}
      />
    </>
      );
    }
}

EditArticleForm.contextTypes = {
  t: PropTypes.func
};


export default connect(
)(EditArticleForm);
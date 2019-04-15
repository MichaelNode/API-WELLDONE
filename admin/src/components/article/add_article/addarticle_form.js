import React, { Component } from "react";
import { connect  } from "react-redux";
import PropTypes from "prop-types";
import '../style/input-file.css'
import '../style/inputDate.css'
import '../style/validation.css'
import '../style/main.css'
import ArticleForm from '../form_article/form_article'




class AddArticleForm extends Component {

  render() {
    return (
      <>
        <ArticleForm
          article_response={this.props.match.params.id}
          type='ADD'
          title={this.context.t("New Article")}
         />
      </>
        );
    }
  }

  AddArticleForm.contextTypes = {
    t: PropTypes.func
  };

  export default connect(
  )(AddArticleForm);


import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as types from '../../../store/article';

class addArticle extends Component {
    render() {
      return <span className="nav-link" onClick={this.props.showUpdateForm}>
              {this.context.t("add_article")}
              </span>;
    }
  }

  addArticle.contextTypes = {
    t: PropTypes.func
  };
  
  
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    showUpdateForm: () => {
        dispatch({
            type: types.SHOW_FORM
          });
      }
  };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(addArticle);

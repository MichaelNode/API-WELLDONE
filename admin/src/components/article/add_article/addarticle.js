import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as types from '../../../store/article/types';

class addArticle extends Component {
    render() {
      return <span className="nav-link" onClick={this.props.showForm}>
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
    showForm: () => {
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

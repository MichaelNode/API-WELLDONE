import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { articleOperations } from '../../../store/article';


class DeleteArticle extends Component {

    deleteArticle = () => {
        this.props.deleteArticle('1')
    }

    render() {
        return (
            <Button variant="danger" onClick={this.deleteArticle}>{this.context.t("Delete_Article")}</Button>
        )
    }
}


DeleteArticle.contextTypes = {
    t: PropTypes.func
  };


  const mapStateToProps = state => ({
    
 });
 
 const mapDispatchToProps = dispatch => {
   return {
    deleteArticle: (id) => {
         dispatch(articleOperations.deleteArticle(id));
     },
   };
 };
 
 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(DeleteArticle);
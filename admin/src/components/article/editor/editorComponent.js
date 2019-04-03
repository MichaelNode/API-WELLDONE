import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import {Form, Col} from "react-bootstrap";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }
    

  render() {
    return (
      <Form.Group as={Col}  md="12" controlId="content">
         <Form.Label>{this.context.t("Content")}</Form.Label>
         { this.props.editorStateError ?(
                       <div className="errorValidation">{this.props.editorStateError}</div>
                ): null }
        <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorClassName="editorState"
            editorState = {this.props.editorState}
            onEditorStateChange={this.props.handleChange}
      
        /> 
       </Form.Group>
    );
  }
}

EditorComponent.contextTypes = {
  t: PropTypes.func
};
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import {Form, Col} from "react-bootstrap";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

export default class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }
    

  render() {
    return (
      <Form.Group className="formeditor"  controlId="content">
         { this.props.editorStateError ?(
                       <div className="errorValidation">{this.props.editorStateError}</div>
                ): null }
        <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
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
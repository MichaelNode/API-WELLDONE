import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
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
      <div>
        <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorClassName="editorState"
            editorState = {this.props.editorState}
            onEditorStateChange={this.props.handleChange}
           
        /> 
      </div>
    );
  }
}
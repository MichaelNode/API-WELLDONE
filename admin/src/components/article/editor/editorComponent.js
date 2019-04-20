import React, {Component, useState, useEffect} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {Form, Col} from "react-bootstrap";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'
import {userUtils} from "../../../store/user";
import {connect} from 'react-redux';

const EditorComponent = (props) => {

  const [suggestion, setSuggestion] = useState([]);
  const fetchUsers = async () => {
    try {
      // add my articles to the state
      const data = await userUtils.getUsers(props.token);
      const users = data.users;
      const suggestionArr = [];
      for(const user of users){
        suggestionArr.push({ text: user.nick_name, value: user.nick_name, url: `/articles/user/${user.nick_name}` });
      }
      setSuggestion(suggestionArr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <Form.Group className="formeditor" controlId="content">
        {props.editorStateError ? (
            <div className="errorValidation">{props.editorStateError}</div>
        ) : null}
        <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={props.editorState}
            onEditorStateChange={props.handleChange}
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: suggestion,
            }}

        />
      </Form.Group>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token
});

export default connect(mapStateToProps)(EditorComponent);
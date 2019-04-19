import React, {Component} from 'react';
import PropTypes from  "prop-types";
import {Card, Alert, Form,  Button, Col } from 'react-bootstrap'

export default class FileComponent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
              { this.props.type == 'ADD'  &&  (
                 <Form.Group as={Col}  md="12" controlId="ask_file">
                  <Form.Label>{this.context.t("Upload file")}</Form.Label>
                  { this.props.ask_fileError ?(
                       <div className="errorValidation">{this.props.ask_fileError}</div>
                  ): null}
                  <Form.Control
                    name="ask_file" 
                    as="select"
                    onChange={this.props.handleInputChange}  
                    value={this.props.ask_file} 
                    required
                  >
                    <option >{this.context.t("Choose")}</option>
                    <option value="video" >Video</option>
                    <option value="imagen">Imagen</option>
                  </Form.Control>
                </Form.Group>
              )}
                {((this.props.type == 'ADD' && this.props.ask_file === 'video') || (this.props.type == 'EDIT')) &&  ( 
                <Form.Group as={Col}  md="12" controlId="url">
                    <Form.Label>{this.context.t("Video URL")}</Form.Label>
                    { this.props.urlError ?(
                        <div className="errorValidation">{this.props.urlError}</div>
                    ): null}
                    <Form.Control
                        type="url"
                        name="url"
                        onChange={this.props.handleInputChange}   
                        value={this.props.url} 
                    />
                    <br/>
                    {((this.props.type == 'ADD' && this.props.url && this.props.showCardtube) || (this.props.url  &&
                        !this.props.file_name &&  this.props.url.includes('www.youtube.com') && this.props.type == 'EDIT' ))  && ( 
                        <Card className="preview" style={{ width: '18rem', }}>
                        <Card.Header>{this.context.t("Preview")}</Card.Header>
                        <Card.Body>    
                        <iframe frameborder="0" allowFullScreen  width="100%" height="100%"
                        src={this.props.url.replace('watch?v=', 'embed/')}>
                        </iframe>
                        </Card.Body>
                    </Card> 
                    )}
                    <br/>
                    {  ((this.props.type == 'ADD' && this.props.url && this.props.showCardMP4) || (this.props.url && 
                         this.props.url.includes('.mp4') && this.props.type == 'EDIT'  )) && ( 
                    <Card className="preview" style={{ width: '18rem', }}>
                        <Card.Header>{this.context.t("Preview")}</Card.Header>
                        <Card.Body>    
                        <video width="100%" height="100%" controls>
                        <source  src={this.props.url} type="video/mp4" />
                        </video>
                        </Card.Body>
                    </Card>
                    )}
                    </Form.Group>
                ) }
                {((this.props.type == 'ADD' && this.props.ask_file === 'imagen') || this.props.type == 'EDIT')  && ( 
                    <Form.Group  as={Col} md="12" >
                    { this.props.fileError  ?(
                        <div className="errorValidation">{this.props.fileError}</div>
                        ): null}
                            <div className="custom-file">
                            <input
                                name="file"  
                                type="file" 
                                className="custom-file-input" 
                                onChange= {this.props.onChange}  
                                accept=".jpg,.jpge,.png"  
                            />
                            <Form.Label className="custom-file-label">{this.context.t("Upload image")}</Form.Label>
                            </div> 
                
                        {((this.props.type == 'ADD' && this.props.file !== null && this.props.showCard == true))  && ( 
                        <Card className="preview" style={{ width: '18rem' }}>
                        <Card.Header>{this.context.t("Preview")}</Card.Header>
                            <Card.Img  src={this.props.imgSrc} />
                            <Card.Body>
                            <Card.Title>{this.props.file_name}</Card.Title>
                            <Card.Text>
                                {this.context.t("Type")} {this.props.file.type}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        )}

                        {((this.props.type == 'EDIT' && this.props.file && !this.props.url))   && ( 
                            <Card className="preview" style={{ width: '18rem' }}>
                            <Card.Header>{this.context.t("Preview")}</Card.Header>
                             <Card.Img  src={this.props.imgSrc || `/images/uploads/${this.props.file_name}`} />
                             <Card.Body>
                               <Card.Title>{this.props.file.name || this.props.file_name }</Card.Title>
                              
                             </Card.Body>
                           </Card>
                        )}          
                    </Form.Group>
                ) }
            </>
        );
    }
}

FileComponent.contextTypes = {
    t: PropTypes.func
};
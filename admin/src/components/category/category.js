// Dependencies
import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import apiRoutes from '../../config/apiRoutes';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }


    componentDidMount() {
        let initialCategory = [];
        fetch(apiRoutes.categories)
            .then(results => {
                return results.json();
            }).then(data => {
            initialCategory = data.results.map((category) => {
                return category
            });
            this.setState({
                categories: initialCategory,
            })
        });
    }

    
    render() {
        return (
       
            <Form.Group as={Col}  md="6" controlId="category">
                <Form.Label>{this.context.t("Category")}</Form.Label>
                { this.props.categoryError ?(
                       <div className="errorValidation">{this.props.categoryError}</div>
                ): null}
                <Form.Control
                    name="category" 
                    as="select"
                    onChange={this.props.handleChange}  
                    value={this.props.value}  
                >
                    <option 
                        value={null}>{this.context.t("Choose")}
                    </option>
                    {this.state.categories && this.state.categories.map((category) => 
                    <option 
                        key={category} 
                        value={category}
                    >{category}
                    </option>)}
                </Form.Control>
            </Form.Group>
           
       
        )
    }
    }

Category.contextTypes = {
    t: PropTypes.func
};
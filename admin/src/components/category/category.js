// Dependencies
import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            validationError: '',
            category: ''
        }
    }


    componentDidMount() {
        let initialCategory = [];
        fetch('http://localhost:3002/apiv1/article/categories')
            .then(results => {
                return results.json();
            }).then(data => {
            initialCategory = data.results.map((category) => {
                return category
            });
            console.log(initialCategory);
            this.setState({
                categories: initialCategory,
            });
        });
    }

    
    render() {
        return (
        <div>
            <Form.Group as={Col} controlId="category">
                <Form.Label>{this.context.t("Category")}</Form.Label>
                <Form.Control
                    name="category" 
                    as="select"
                    onChange={this.props.handleChange}  
                    value={this.props.value}  
                >
                    <option >Choose...</option>
                    {this.state.categories.map((category) => <option key={category} value={category}>{category}</option>)}
                
                </Form.Control>
            </Form.Group>
            <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationError}
            </div>
        </div>
        )
    }
    }

Category.contextTypes = {
    t: PropTypes.func
};
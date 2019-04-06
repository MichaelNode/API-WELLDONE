import React, { Component } from "react";
import PropTypes from "prop-types";


import {
  UserCard
} from './src/index';



export default class CardUSer extends Component {
    constructor(props) {
        super(props);
    }

  

    render() {
        return (
            <div className='card-container'>
                <UserCard
                cardClass='float card-user'
                header='https://i.imgur.com/w5tX1Pn.jpg'
                avatar='https://i.imgur.com/uDYejhJ.jpg'
                name={this.props.userData.name}
                positionName='Software Developer'
                stats={[
                {
                    name: 'followers',
                    value: 21
                },
                {
                    name: 'following',
                    value: 37
                },
                {
                    name: 'posts',
                    value: 117
                }
                ]}
            />
           
            </div>
        )
        }
}


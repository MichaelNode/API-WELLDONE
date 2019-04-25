import React, { Component } from "react";
import {UserCard} from './src/index';
import {connect} from 'react-redux';
import apiRoutes from "../../config/apiRoutes";
import PropTypes from "prop-types";

class CardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resp: {}
        }
    }

    async componentDidMount() {
          const data = await fetch(apiRoutes.summary)
            .then(result => {
               return result.json();
            }).then(data => {
                if(data.result){
                    console.log(data.result)
                this.setState({ resp: data.result}) 
            }
        })
    }

    render() {
        return (
            <div className='card-container'>
                <UserCard
                cardClass='float card-user'
                header='https://i.imgur.com/w5tX1Pn.jpg'
                avatar={ '/images/' + this.props.userData.image}
                name={this.props.userData.name}
                positionName='Software Developer'
                stats={[
                    {
                        name:  this.context.t('followers'),
                        value: this.state.resp.follower
                    },
                    {
                        name:  this.context.t('following'),
                        value: this.state.resp.following
                    },
                    {
                        name:  this.context.t('articles'),
                        value: this.state.resp.articles
                    }
                    ]}
            />

            </div>
        )
        }
}

const mapStateToProps = state => ({
    userData: state.user.userData,
});

CardUser.contextTypes = {
    t: PropTypes.func
  };

export default connect(mapStateToProps)(CardUser);

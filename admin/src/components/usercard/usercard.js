import React, { Component } from "react";
import {UserCard} from './src/index';
import {connect} from 'react-redux';

class CardUser extends Component {
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
                        value: 0
                    },
                    {
                        name: 'following',
                        value: 0
                    },
                    {
                        name: 'articles',
                        value: 0
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

export default connect(mapStateToProps)(CardUser);

// Header.js
import React, {Component} from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {connect} from "react-redux";
import {Icon} from 'react-fa'
import {Route, Switch} from "react-router-dom";
import socketIOClient from "socket.io-client";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import MainNavbar from '../navbar/navbar'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Login from '../login/Login'
import Loading from '../loading/Loading'
import InstantLogout from "../login/InstantLogout";
import UpdateUserForm from "../updateUser/updateUserForm";
import FavArticles from '../favArticles/favArticles';
import UnderlinedContents from '../underlined/underlined';
import ArticleList from '../article/list/ArticleList';
import AddArticleForm from '../article/add_article/addarticle_form'
import EditArticleForm from '../article/edit_article/edit_article'
import {Form, Col, Row} from "react-bootstrap";
import CardUser from '../usercard/usercard'
import './styles.css'

class sideBars extends Component {

  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3002"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
   
    socket.on('res', function(data){
      console.log('entrooo', data)
    });
  }

  toggleMain() {
    const main = document.querySelector('#div_main');
    main.classList.toggle('expanded');
  }

  render() {
    let path = this.props.location.pathname.slice(1).replace('admin/', '');
    if(path.includes('edit_article')) path = 'edit_article';

    return (

        <div className='position-relative'>
          {this.props.token && !this.props.isLoading &&
          <MainNavbar/>
          }
          {this.props.token && !this.props.isLoading && (
              <SideNav id='sidenav' className='h-100 sidenav'>
                <SideNav.Toggle onClick={this.toggleMain}/>
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <Link to='/admin'>
                        <i className="fa fa-fw fa-home" style={{fontSize: '1.75em'}}/>
                      </Link>
                    </NavIcon>
                    <NavText>
                      Home
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="charts">
                    <NavIcon>
                      <i className="fa fa-fw fa-list-alt" style={{fontSize: '1.75em'}}/>
                    </NavIcon>
                    <NavText>
                      {this.context.t("Articles")}
                    </NavText>
                    <NavItem>
                      <NavText>
                        <Link to='/admin/add_article'>
                                <span className="nav-link px-0">
                                    {this.context.t("New_Article")}
                                </span>
                        </Link>
                      </NavText>
                    </NavItem>
                    <NavItem>
                      <NavText>
                        <Link to='/admin/favorites'>
                                <span className="nav-link px-0">
                                    {this.context.t("Favourites")}
                                </span>
                        </Link>
                      </NavText>
                    </NavItem>
                    <NavItem>
                      <NavText>
                        <Link to='/admin/articles'>
                                <span className="nav-link px-0">
                                    {this.context.t("My articles")}
                                </span>
                        </Link>

                      </NavText>
                    </NavItem>

                  </NavItem>
                  <NavItem eventKey="underlined">
                    <NavIcon>
                      <Link to='/admin/underlined'>
                        <i className="fa fa-fw fa-underline" style={{fontSize: '1.75em'}}/>
                      </Link>
                    </NavIcon>
                    <NavText>
                      My Underlined
                    </NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
          )}

          {
            this.props.token && !this.props.isLoading && (
                <React.Fragment>
                  <Switch>
                    <Form.Row className="w-100 justify-content-end">
                      <Form.Group id='div_main' className="div_main">
                        {

                          // Section title
                          path !== 'admin' &&
                          <h1 className='text-capitalize mb-3 mb-lg-5 mt-2'>{this.context.t(path)}</h1>
                        }

                        {/* ROUTES */}
                        <Route exact path="/admin/logout" component={InstantLogout}/>
                        <Route exact path="/admin/update" component={UpdateUserForm}/>
                        <Route exact path="/admin/add_article/:id?" component={AddArticleForm}/>
                        <Route exact path="/admin/favorites" component={FavArticles}/>
                        <Route exact path="/admin/edit_article/:id" component={EditArticleForm}/>
                        <Route exact path="/admin/articles" component={ArticleList}/>
                        <Route exact path="/admin/underlined" component={UnderlinedContents}/>
                        <Row className="justify-content-around">
                          <Col md={9} lg={6}>
                            <Route exact path="/admin" component={CardUser}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Form.Row>
                  </Switch>
                </React.Fragment>
            )
          }
          {
            !this.props.token && !this.props.isLoading &&
            <Login/>
          }
          {
            this.props.isLoading &&
            <Loading/>
          }

        </div>
    )
  }
}

sideBars.contextTypes = {
  t: PropTypes.func
};

export default connect(state => ({
  token: state.user.token,
  isLoading: state.user.isLoading
}))(sideBars);

import React, { Component } from 'react';
import { Link, Router } from '../../routes';
import  styled, { css } from 'styled-components';
import Search from '../Header/Search';
import Mail from '../Header/Mail';
import Profile from '../Header/Profile';
import axios from 'axios';

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        modalIsOpen: false,
        user: []
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
        if (typeof window !== 'undefined') {
          let id = localStorage.getItem('userDetail');
          let url = "http://167.99.93.236:80/user/" + encodeURI(id);
          axios.get(url).then((response) => {
              console.log("response header", response.data);
              let data = response.data;
              this.setState({
                user: data
              });
            }).catch((error) => {
              console.log(error);
          });  

          window.addEventListener('storage', this.localStorageUpdated);
        }
  }

    componentWillUnmount(){
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated);
        }
    }

    localStorageUpdated = () => {}

    logOut = () => {
      localStorage.removeItem('userDetail');      
      Router.pushRoute('/');
    }
  // componentWillMount() {

  //   let userInfo = localStorage.getItem('userInfo') || [];
  //   this.setState({
  //     user: userInfo
  //   });
  // }

  render() {
    return(
      <HeaderClass>
          <HeaderNav>
            <HeaderLogo>
              <HeaderLogoSrc src="../../static/logo_grey.svg" alt="Qdemy"/>
              <HeaderText>Qdemy</HeaderText>
            </HeaderLogo>
            <HeaderUl>
              <Link route="/main">
                <HeaderHref>
                  <HeaderIcon src="../../static/menu/main.svg" alt="Qdemy"/>
                  Main</HeaderHref>
              </Link>
              <Link route="/courses">
                <HeaderHref>
                  <HeaderIcon src="../../static/menu/course.svg" alt="Qdemy"/>
                  Courses</HeaderHref>
              </Link>
              <Link route="/competation">
                <HeaderHref>
                  <HeaderIcon src="../../static/menu/competation.svg" alt="Qdemy"/>
                  Competition</HeaderHref>
              </Link>
              <Link route="/tests">
                <HeaderHref>
                  <HeaderIcon src="../../static/menu/tests.svg" alt="Qdemy"/>
                  Tests</HeaderHref>
              </Link>
              <Link route="/blogs">
                <HeaderHref>
                  <HeaderIcon src="../../static/menu/blog.svg" alt="Qdemy"/>
                    Blogs
                  </HeaderHref>
              </Link>
            </HeaderUl>
          </HeaderNav>
          <HeaderTop>
            <HeaderTopText>{this.props.route == "main" || this.props.route == "main-detail" ? "Main" :
                            this.props.route == "module" ? "Module" :
                            this.props.route === "submodule" ? "Tasks and Poblems" :
                            this.props.route === "profile" ? "Profile" :
                            this.props.route == "course" ? "Courses" : "Competition"}</HeaderTopText>
            {this.state.user != []  ?
              <HeaderTopRight>
                <SearchClassSrc onClick={this.openModal} src="../../static/menu/search.svg" alt="Qdemy"/>
                <Search 
                  modalIsOpen={this.state.modalIsOpen} 
                  onRequestClose={this.onRequestClose}
                  closeModal={this.closeModal}/>
                {/* <Mail /> */}
                <Profile name={this.state.user.name} surname={this.state.user.surname} logOut={this.logOut}/>
              </HeaderTopRight> :
             <HeaderTopRight> 
               <Link route="/">
               <HeaderHref style={{marginTop: 30, marginRight: 20}}>
                  Register</HeaderHref>
               </Link>
             </HeaderTopRight>}
          </HeaderTop> 
        </HeaderClass>
    )
  }
} 

const HeaderClass = styled.div`
  color: #50667b;
`;

const HeaderNav = styled.div`
  height: 100%;
  width: 250px; 
  position: fixed;
  background-color: #FBFBFB;
  border-right: 1px solid rgba(0, 0, 0, 0.0625);
`;

const HeaderLogo = styled.div`
  height: 70px;
  width: 100%;
  padding: 15px 0 15px 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0625);
  display: flex;
  flex-direction: row;
`;

const HeaderLogoSrc = styled.img`
  height: 40px;
  width: 40px;
`;

const HeaderText = styled.div`
  font-size: 24px;
  margin: 8px 0 8px 10px;
`;

const HeaderUl = styled.ul`
  display: flex;
  flex-direction: column;  
  width: 100%;
  margin-top: 30px;
`;

const HeaderHref = styled.a`
  text-transform: none;
  cursor: pointer;
  margin: 10px 0;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
`;

const HeaderIcon = styled.img`
  height: 13px;
  width: 13px;
  margin-right: 18px;
`;

const HeaderTop = styled.div`
  left: 250px;
  top: 0;
  right: 0;
  position: absolute;
  height: 71px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.0625);
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
`;

const HeaderTopText = styled.div`
  font-size: 20px;
  line-height: 28px;
  margin: 21px 0;
`;

const HeaderTopRight = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchClassSrc = styled.img`
    height: 20px;
    width: 20px;
    margin: 24px 40px 25px 0;
    cursor: pointer;
    opacity: 0.8;
    :hover {
        opacity: 1;
    }
`;

export default Header;
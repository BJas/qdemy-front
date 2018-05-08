import React, { Component } from 'react';
import  styled, { css } from 'styled-components';
import Layout from '../components/MyLayout';
import Data from '../meta.json';
import axios from 'axios';
import { Link, Router } from '../routes';
import { Route, Redirect } from 'react-router';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: "",  registerName: "", registerSurname: "", registerEmail: "", registerPassword: "",
      login: "",
      password: "",
      signing : true,
      openRequired : false,
      isUser: true,
      loggedIn: false,
      userInfo: []
    };
  }

  signUp = () => {
    this.setState({
      signing: true
    });
  }

  signIn = () => {
    this.setState({
      signing: false
    });
  }

  signin = () => {
    if(this.state.login.trim() == "" || this.state.password.trim() == "") {
      this.setState({ openRequired : true });
    }
    else {
     axios.get("http://167.99.93.236:80/user/all").then((response) => {
        let user = response.data.filter(u => u.email == this.state.login && u.password == this.state.password);
        console.log(user);
        if(user.length == 0) {
          localStorage.setItem('userDetail', null);
          setTimeout(() => {
            this.setState({
              openRequired : true,
              isUser: false
            });
          }, 600);
        } else {
          setTimeout(() => {
            localStorage.setItem('userDetail', user[0].user_id);
            this.setState({
              openRequired : false,
              isUser: true,
              login: "",
              password: "", 
              loggedIn: true,
              userInfo: user
            });
            Router.pushRoute('/main');
          }, 600);
        }
     }).catch((error) => {
        console.log(error);
     });  
    }
  }

  register = () => {
    let data = JSON.stringify({
      nick: this.state.nick,
      name: this.state.registerName,
      surname: this.state.registerSurname,
      email: this.state.registerEmail,
      password: this.state.registerPassword
    });

    fetch('http://167.99.93.236:80/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
    }).then((response)=>{
      console.log("response", response);
    }).catch(error => console.log(error));

    this.setState({
      nick: "",
      name: "",
      surname: "",
      email: "",
      password: ""
    });

    // axios.post('http://167.99.93.236:80/user', data, 
    // {
    //   headers: {
    //     'Access': 'application/json;charset=UTF-8',
    //     'Content-Type': 'application/json;charset=UTF-8',
    //       "Access-Control-Allow-Origin": "*",
    //   }
    // }).then((response) => {
    //   console.log(response);
    // }).catch((error) =>{
    //   console.log(error);
    // });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    })
 }


  render() {
    return(
      <Layout title={Data[0].index.title} description={Data[0].index.description} ogUrl={Data[0].index.image} route="index">
        <IndexClass>
          <IndexClassTitle> 
              <IndexClassTitleText>
                <IndexClassTitleText1 className="font-slabo">
                  <IndexClassTitleImg src="../static/logo_32.svg" alt="Qdemy"/>
                  <IndexClassTitleText1Span>Qdemy</IndexClassTitleText1Span>
                </IndexClassTitleText1>
                <IndexClassTitleText2 className="font-sans">
                  Do you want <br/> 
                  learn <br/>
                  program?
                </IndexClassTitleText2>
                <IndexClassTitleText3>
                Get access to dozens <br/> free materials
                </IndexClassTitleText3>
              </IndexClassTitleText>
          </IndexClassTitle>
          <IndexClassAuth>
            <IndexClassAuthTop>
              <IndexClassAuthSignUp style={ this.state.signing ? { color: "#03a87c" } : null } onClick={this.signUp}>Sign Up</IndexClassAuthSignUp>
              <IndexClassAuthSignIn style={ !this.state.signing ? { color: "#03a87c" } : null } onClick={this.signIn}>Log In</IndexClassAuthSignIn>
            </IndexClassAuthTop>
            { this.state.signing ? 
              <IndexClassAuthSignClass>
                {/* <IndexClassSignMessanger className="font-slabo">
                  <IndexClassSignFacebook>
                    Через Facebook
                    <MessangerSrc src="../static/facebook-logo.svg" alt="Qdemy"/>
                  </IndexClassSignFacebook>
                  <IndexClassSignGoogle>
                    Через Google
                    <MessangerSrc src="../static/google-plus-logo.svg" alt="Qdemy"/>
                  </IndexClassSignGoogle>
                </IndexClassSignMessanger>
                <IndexClassSignText>или</IndexClassSignText> */}
                <IndexClassSignInput placeholder="Nick"
                  name="nick"
                  value={this.state.nick} 
                  onChange={(e) => this.handleChange(e)} />
                {/* <IndexClassSignInput placeholder="School name"/> */}
                <IndexClassSignInput placeholder="Name"
                  name="registerName"
                  value={this.state.name} 
                  onChange={(e) => this.handleChange(e)}/>
                <IndexClassSignInput placeholder="Surname"
                  name="registerSurname"
                  value={this.state.surname} 
                  onChange={(e) => this.handleChange(e)}/>
                <IndexClassSignInput placeholder="Email"
                  name="registerEmail"
                  value={this.state.email} 
                  onChange={(e) => this.handleChange(e)}/>
                <IndexClassSignInput type="password" name="password" placeholder="Password"
                  name="registerPassword"
                  value={this.state.registerPassword} 
                  onChange={(e) => this.handleChange(e)}/>
                <IndexClassSignSubmit onClick={this.register}>Continue</IndexClassSignSubmit>
              </IndexClassAuthSignClass>
               : 
              <IndexClassAuthSignClass>
                <IndexClassSignInput 
                  name="login"
                  value={this.state.login}
                  onChange={(e) => this.handleChange(e)} 
                  type="text" placeholder="Email"/>
                <IndexClassSignInput 
                  name="password"
                  value={this.state.password} 
                  onChange={(e) => this.handleChange(e)} 
                  type="password" name="password" placeholder="Password"/>
                <IndexClassSignSubmit
                  onClick={this.signin}>Continue</IndexClassSignSubmit>
                <IndexClassSignRequired style={!this.state.openRequired ? {display: "none"} : null}>
                  {this.state.password.trim() == "" && this.state.login.trim() == "" ? <div>Required email and password</div> :
                   this.state.login.trim() == ""  ? <div>Required email</div> : 
                  this.state.password.trim() == "" ? <div>Required password</div> : 
                  !this.state.isUser ? <div>Incorrect email or password</div> : null}
                </IndexClassSignRequired>
              </IndexClassAuthSignClass>
            }
          </IndexClassAuth>
        </IndexClass>
      </Layout>
    )
  }
}

const IndexClass = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const IndexClassTitle = styled.div`
  height: 100%;
  width: calc(100% - 400px);
  background-image: url('../static/index.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

const IndexClassTitleText = styled.div`
  padding: 70px 80px 0 0;
  color: white;
  width: 100%;
  text-align: right;
`;

const IndexClassTitleText1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 32px;
`;

const IndexClassTitleText1Span = styled.div`
  margin: 16px 0;
`;

const IndexClassTitleImg = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 15px;
`;

const IndexClassTitleText2 = styled.div`
  margin-top: 50px;
  font-size: 52px;
`;

const IndexClassTitleText3 = styled.div`
  margin-top: 100px;
  font-size: 30px;
`;

const IndexClassAuth = styled.div`
  width: 400px;
  height: 100%;
`;

const IndexClassAuthTop = styled.div`
  margin: 50px 50px 120px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IndexClassAuthSignUp = styled.div`
  cursor: pointer;
  color: #50667b;
`;

const IndexClassAuthSignIn = styled.div`
  cursor: pointer;
  color: #50667b;
`;

const IndexClassAuthSignClass = styled.div`
  margin: 0 50px;
`;

const IndexClassSignMessanger = styled.div`
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  color: white;
  font-size: 12px;
`;

const MessangerButton = styled.div`
  width: 140px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  padding: 9px 0 9px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IndexClassSignFacebook = MessangerButton.extend`
  background-color: #3B5998;
  box-shadow: 0 2px 0 #2A3F6B;
`;

const IndexClassSignGoogle = MessangerButton.extend`
  background-color: #d34836;
  box-shadow: 0 2px 0 #943226;
  padding-left: 32px;
`;

const MessangerSrc = styled.img`
  width: 12px;
  height: 12px;
  margin-top: 1px;
  margin-right: 15px;
`;

const IndexClassSignText = styled.div`
  margin: 25px auto;
  width: 100%;
  text-align: center;
`;

const IndexClassSignInput = styled.input`
  width: 100%;
  height: 32px;
  font-size: 14px;
  border-radius: 6px;
  padding-left: 12px;
  color: #4A4A4A;
  border: 1px solid rgba(226, 226, 226, 1);
  outline: none;
  margin: 5px 0;
`;

const IndexClassSignSubmit = styled.div`
  margin-top: 10px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  color: white;
  text-align: center;
  padding: 9px 0;
  background-color: #03a87c;
  box-shadow: 0 2px 0 #027D5C;
  :hover {
    background-color: #039C73;
  }
`;

const IndexClassSignRequired = styled.div`
  margin-top: 15px;
  color: red;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

export default Index;
import React, { Component } from 'react';
import { Link, Router } from '../../routes';
import  styled, { css } from 'styled-components';
import axios from 'axios';
import Layout from '../../components/MyLayout';
import Data from '../../meta.json';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries} from 'react-vis';

class userInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            name: "",
            surname: "",
            cellphone: "",
            update: false,
            isSend: false
        }
      }

      componentDidMount() {
            if (typeof window !== 'undefined') {
              let id = localStorage.getItem('userDetail');
              let url = "http://167.99.93.236:80/user/" + encodeURI(id);
              axios.get(url).then((response) => {
                  let data = response.data;
                  let points = data.rating_changes.map((previousValue, index) => { 
                    return ({
                        x: index + 1,
                        y: previousValue
                    })});

                  this.setState({
                    user: data,
                    points: points,
                    name: data.name,
                    surname: data.surname,
                    cellphone: data.cellphone
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

    toggleUpdate = () => {
        this.setState({
            update: true
        });
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    saveHanlder = () => {
      let data = JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        cellphone: this.state.cellphone
      });
      let id = localStorage.getItem('userDetail');
      let url = "http://167.99.93.236:80/user/" + encodeURI(id);
      console.log("url", url);
      fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      }).catch(error => console.log(error));
      setTimeout(() => {
        this.setState({
          isSend: true
        });
      }, 200);
    }

    render() {

        return(
            <Layout title={Data[0].profile.title} description={Data[0].profile.description} ogUrl={Data[0].profile.image} route="profile">
                <UserClass>
                    <UserClassLeft>
                        <UserClassImgSrc src="../../static/example/profile.svg" alt="Qdemy"/>
                        <UserClassNick>{this.state.user.nick}</UserClassNick>
                        <UserClassUpdateButton style={this.state.update ? {display: "none"} : null } onClick={this.toggleUpdate}>Update profile</UserClassUpdateButton>
                    </UserClassLeft>
                    {this.state.update == false ?
                    <UserClassRight>
                        <UserClassUl>
                            <UserClassList>{this.state.user.name} {this.state.user.surname}</UserClassList>
                            <UserClassList>
                                <UserClassSpan>Email: </UserClassSpan>{this.state.user.email}
                            </UserClassList>
                            <UserClassList>
                                <UserClassSpan>Phone number: </UserClassSpan> {this.state.user.cellphone}
                            </UserClassList>
                            <UserClassList><UserClassSpan>Languages: </UserClassSpan> 
                                {this.state.user.languages != undefined ?
                                    this.state.user.languages.map((l,  id) => {
                                        return(
                                            <span key={id}> {l}{id != this.state.user.languages.length-1 ? <span>,</span>: null} </span>
                                        )
                                    }) : null}
                            </UserClassList>
                        </UserClassUl>
                        {this.state.user.rating_changes != undefined ? 
                            <XYPlot
                                width={800}
                                height={400}>
                                <XAxis/>
                                <YAxis/>
                                <HorizontalGridLines />
                                <LineMarkSeries color="#50667b" data={this.state.points} />
                            </XYPlot> : null}
                    </UserClassRight> :
                    <UserClassRight>
                    <UserClassUl>
                            <UserClassList>
                                <div><UserClassSpan>Name: </UserClassSpan></div>
                                <UserClassInput 
                                    name="name"
                                    value={this.state.name}
                                    onChange={(e) => this.handleChange(e)} 
                                    type="text" />
                            </UserClassList>
                            <UserClassList>
                                <div><UserClassSpan>Surname: </UserClassSpan></div>
                                <UserClassInput 
                                    name="surname"
                                    value={this.state.surname}
                                    onChange={(e) => this.handleChange(e)} 
                                    type="text" />
                            </UserClassList>
                            <UserClassList>
                                <div><UserClassSpan>Cell Phone: </UserClassSpan></div>
                                <UserClassInput 
                                    name="cellphone"
                                    value={this.state.cellphone}
                                    onChange={(e) => this.handleChange(e)} 
                                    type="text" />
                            </UserClassList>
                            { this.state.isSend ?
                            <Link route="/main"> 
                                <UserClassUpdateButton style={{width: "300px", marginTop: "25px", backgroundColor: "green"}}>Return</UserClassUpdateButton>
                            </Link>
                            :<UserClassUpdateButton onClick={this.saveHanlder} style={{width: "300px", marginTop: "25px"}}>Save</UserClassUpdateButton>
                            }
                            {this.state.isSend ? <UserClassSendSuccess>User details updated!</UserClassSendSuccess> : null}
                            <UserClassList>
                            </UserClassList>
                    </UserClassUl>
                    </UserClassRight>}
                </UserClass>
            </Layout>      
        )
    }
}

const UserClass = styled.div`
    padding: 40px;
    width: 100%;
    color: #50667b;
    display: flex;
`;

const UserClassLeft = styled.div`
    margin: 0 30px;
`;

const UserClassNick = styled.div`
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
`;

const UserClassImgSrc = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50px;
    margin: 0 0 12px 25px;
`;

const UserClassUpdateButton = styled.div`
    width: 150px;
    height: 30px;
    text-align: center;
    font-size: 14px;
    padding: 6px 0;
    color: white;
    background-color: #343E63;
    border-radius: 4px;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 2px 0 #3B4670;
`;

const UserClassRight = styled.div`
    margin-left: 20px;
`;

const UserClassUl = styled.ul`
    font-size: 18px;
`;

const UserClassList = styled.li`
    list-style-type: none;
    margin-bottom: 12px;
`;

const UserClassSpan = styled.span`
    font-weight: bold;
`;

const UserClassInput = styled.input`
  width: 300px;
  height: 32px;
  font-size: 14px;
  border-radius: 6px;
  padding-left: 12px;
  color: #4A4A4A;
  border: 1px solid rgba(226, 226, 226, 1);
  background-color: rgba(164,175,221,.2);
  outline: none;
  margin: 5px 0;
`;

const UserClassSendSuccess = styled.div`
    margin-top: 25px;
    height: 40px;
    width: 300px;
    border: 1px solid #8CAF9A;
    border-radius: 4px;
    text-align: center;
    color: green;
    font-size: 16px;
    font-weight: bold;
    padding: 9px 0;
    background-color: #BFEFD2;
`;

export default userInfo;
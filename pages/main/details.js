import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../../components/MyLayout';
import  styled, { css } from 'styled-components';
import Data from '../../meta.json';
import { HashLoader } from 'react-spinners';
import axios from 'axios';
import renderHTML from 'react-render-html';


class MainDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      article: {}
    };
  }

  componentWillMount() {
    const id = this.props.url.query.id;
    axios.get("http://167.99.93.236:80/blog/"+id).then((response)=>{
      const res = response.data;
      this.setState({article: res});
    }).catch((error)=>{
    console.log(error);
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, 2000);
  }

  render() {

    const description = this.state.article.text;

    return(
      <Layout title={this.state.article.name + Data[0].main_details.title} description={Data[0].main_details.description} ogUrl={Data[0].main_details.image} route="main-detail">
        { !this.state.isLoaded ?
          <Indicator>
            <HashLoader color={'#50667b'}/>
          </Indicator>
        :
        <MainDetailsClass>
            <MainDetailsTitle>{this.state.article.name}</MainDetailsTitle>
            <MainDetailsViews>
              <MainDetailsAuthor className="font-sans">{this.state.article.author_name}</MainDetailsAuthor>
              <MainDetailsFirstViewsImage src="../static/main/view.svg" alt="Qdemy"/>
              <MainDetailsFirstViewsText>{this.state.article.likes}</MainDetailsFirstViewsText>
              <MainDetailsFirstViewsImage style={{marginTop: "2px"}} src="../static/main/comment.svg" alt="Qdemy"/>
              <MainDetailsFirstViewsText>{this.state.article.comment_count}</MainDetailsFirstViewsText>
            </MainDetailsViews>
            <MainDetailsImgSrc src={this.state.article.front_image} alt="Qdemy"/>
            <MainDetailsDescription>{renderHTML(description)}</MainDetailsDescription>

        </MainDetailsClass>}
      </Layout>
    )
  }
}

const Indicator = styled.div`
  position: absolute;
  left: 55%;
  top: 40%;
`;

const MainDetailsClass = styled.div`
    width: 100%;
    padding: 40px;
    color: #50667b;
`;

const MainDetailsTitle = styled.div`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 12px;
    margin-left: 10px;
    text-align: left;
`;

const MainDetailsAuthor = styled.div`
    font-size: 12px;
    color: #888;
    margin: 0 10px;
    text-align: left;
`;

const MainDetailsImgSrc = styled.img`
    width: 100%;
    height: 500px;
    object-fit: cover;
    margin-bottom: 25px;
`;

const MainDetailsDescription = styled.div`
    font-size: 16px;
    margin: 0 80px;
`;

const MainDetailsViews = styled.div`
    margin-bottom: 12px;
    height: 16px;
    display: flex;
    font-size: 11px;
    color: rgba(80, 102, 123, 0.5);
`;

const MainDetailsFirstViewsImage = styled.img`
  height: 14px;
  width: 14px;
`;

const MainDetailsFirstViewsText = styled.div`
  margin: 0 16px 0 4px;
`;

export default MainDetails;
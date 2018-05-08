import React, { Component } from 'react';
import { Link } from '../../routes';
import Layout from '../../components/MyLayout';
import  styled, { css } from 'styled-components';
import Data from '../../meta.json';
import { HashLoader } from 'react-spinners';
import axios from 'axios';


class Main extends Component {

//   static async getInitialProps() {
//     const res = await 
//     return {data: res};
// }

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      articles: []
    }
  }

  componentWillMount() {
    axios.get("http://167.99.93.236:80/blog/all").then((response)=>{
      const res = response.data;
      this.setState({articles: res});
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

    const infoDiv = (article) => {
      return(
        <div>
          <MainClassFirstName>{article.author_name}</MainClassFirstName>
          <Link route="main-detail" params={{id: article.blog_id}}>
              <MainClassFirstTitle>
                {article.name} 
              </MainClassFirstTitle>
          </Link>
            <MainClassFirstViews>
              <MainClassFirstViewsImage src="../static/main/view.svg" alt="Qdemy"/>
              <MainClassFirstViewsText>{article.likes}</MainClassFirstViewsText>
              <MainClassFirstViewsImage style={{marginTop: "2px"}} src="../static/main/comment.svg" alt="Qdemy"/>
              <MainClassFirstViewsText>{article.comment_count}</MainClassFirstViewsText>
            </MainClassFirstViews>
        </div>
      )
    }
    return(
      <Layout title={Data[0].index.title} description={Data[0].index.description} ogUrl={Data[0].index.image} route="main">
        { !this.state.isLoaded ?
          <Indicator>
            <HashLoader
              color={'#50667b'}/>
          </Indicator>
        :
        <MainClass>
          <MainClassTop>
            <div>
                <MainClassFirstDiv>
                  <MainClassFirstImgSrc src={this.state.articles[0].front_image} alt="Qdemy"/>
                  {infoDiv(this.state.articles[0])}
                </MainClassFirstDiv>
              <MainClassTop>
                  <MainClassThirdDiv>
                    <MainClassSecondImgSrc src={this.state.articles[1].front_image} alt="Qdemy"/>
                    {infoDiv(this.state.articles[1])}
                  </MainClassThirdDiv> 
                  <MainClassFourthDiv>
                    <MainClassSecondImgSrc src={this.state.articles[2].front_image} alt="Qdemy"/>
                    {infoDiv(this.state.articles[2])}
                  </MainClassFourthDiv>
              </MainClassTop>
            </div>
            <div>
                <MainClassSecondDiv>
                  <MainClassSecondImgSrc src={this.state.articles[3].front_image} alt="Qdemy"/>
                  {infoDiv(this.state.articles[3])}
                </MainClassSecondDiv>
                <MainClassFifthDiv>
                  <MainClassFirstImgSrc src={this.state.articles[4].front_image} alt="Qdemy"/>
                  {infoDiv(this.state.articles[4])}
                </MainClassFifthDiv> 
            </div>
          </MainClassTop>
        </MainClass>}
      </Layout>
    )
  }
}

const Indicator = styled.div`
  position: absolute;
  left: 55%;
  top: 40%;
`;

const MainClass = styled.div`
  padding: 0 40px;
  width: 100%;
`;

const MainClassTop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 40px 0;
`;

const MainClassFirstDiv = styled.div`
  width: 620px;
  height: 440px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-weight: bold;
`;

const MainClassFirstImgSrc = styled.img`
  width: 100%;
  height: 340px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  object-fit: fill;
`;

const MainClassFirstName = styled.div`
  margin: 7px 0;
  font-size: 12px;
  color: #08d092;
`;

const MainClassFirstTitle = styled.div`
  margin: 10px 0 16px 0;
  font-size: 16px;
  height: 18px;
  line-height: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #50667b;
  cursor: pointer;
`;

const MainClassFirstViews = styled.div`
  color: rgba(80, 102, 123, 0.5);
  font-size: 11px;
  line-height: 16px;
  height: 16px;
  display: flex;
`;

const MainClassFirstViewsImage = styled.img`
  height: 14px;
  width: 14px;
`;

const MainClassFirstViewsText = styled.div`
  margin: 0 16px 0 4px;
`;

const MainClassSecondDiv = MainClassFirstDiv.extend`
  width: 400px;
  margin-left: 40px;
  height: 320px;
`;

const MainClassSecondImgSrc = MainClassFirstImgSrc.extend`
  height: 220px;
`;

const MainClassThirdDiv = MainClassFirstDiv.extend`
  margin-right: 40px;
  width: 290px;
  height: 320px;
`;

const MainClassFourthDiv = MainClassThirdDiv.extend`
  margin-right: 0;
`;

const MainClassFifthDiv = MainClassSecondDiv.extend`
  margin-top: 40px;
  height: 440px;
`;

export default Main;

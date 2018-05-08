import React, { Component } from 'react';
import { Link } from '../../routes';
import Layout from '../../components/MyLayout';
import  styled, { css } from 'styled-components';
import Data from '../../meta.json';
import { HashLoader } from 'react-spinners';
import axios from 'axios';

class Module extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      modules: []
    };
  }

  componentWillMount() {
    const id = this.props.url.query.id;
    axios.get("http://167.99.93.236:80/module/all").then((response)=>{
      const res = response.data;
      const data = res.filter(s => s.course_id == id);
      this.setState({modules: data});
    }).catch((error)=>{
    console.log(error);
    });
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, 1000);
  }

  render() {

    const moduleDiv = (module) => {
        return(
            <Link route="submodule" params={{submodule_id: module.module_id, id: module.course_id}}>
                <ModuleClassDiv>  
                    <ModuleClassText>  
                        <ModuleClassTitle>{module.name}</ModuleClassTitle>
                        <ModuleClassDesc>Difficulty: {module.difficulty}</ModuleClassDesc>
                        <ModuleClassDesc>Rating: {module.rating}</ModuleClassDesc>
                    </ModuleClassText>
                    <ModuleClassImgDiv>
                        <ModuleClassImg src={module.image_url} alt="Qdemy" />
                        <svg height="30" width="64" style={{marginTop: "-5px", marginLeft: "-2px"}}>
                            <path d="M0 0 L32 30 L64 0" fill="transparent" stroke="#50667b" strokeWidth="2px"/>
                        </svg>
                    </ModuleClassImgDiv>
                </ModuleClassDiv>
            </Link>
        )
    }
    
    return(
      <Layout title={Data[0].module.title} description={Data[0].module.description} ogUrl={Data[0].module.image} route="module">
        { !this.state.isLoaded ?
          <Indicator>
            <HashLoader color={'#50667b'}/>
          </Indicator>
        :
        <ModuleClass>
        {this.state.modules.map((module, id) => {
            if(id % 2 == 0) {
                return(
                    <ModuleClassContainer>
                        {moduleDiv(module)}
                        <svg 
                            style={this.state.modules.length - 2 == id || this.state.modules.length - 1 == id ? {display: "none"} : null} 
                            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="555px" height="255px" viewBox="0 0 400 230">
                            <path d="M200 230, 200 140  C 200 120, 210 120, 555 120" stroke="#50667b" strokeWidth="3px" fill="transparent"/>
                        </svg>
                    </ModuleClassContainer>
                )
            } else {
                return(
                    <ModuleClassContainer>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="500px" height="255px" 
                            style={this.state.modules.length - 1 == id ? {display: "none"} : {marginLeft: -55}} 
                            viewBox="0 0 500 230">
                            <path d="M320 255, 320 145  C 320 100, 310 100, 0 100" stroke="#50667b" strokeWidth="3px" fill="transparent"/>
                        </svg>
                        {moduleDiv(module)}
                    </ModuleClassContainer>
                )
            }
        })}
        </ModuleClass>}
      </Layout>
    )
  }
}

const Indicator = styled.div`
  position: absolute;
  left: 55%;
  top: 40%;
`;

const ModuleClass = styled.div`
  width: 100%;
  padding: 40px;
  color: #50667b;
`;

const ModuleClassContainer = styled.div`
    width: 50%;
    float: left;
`;

const ModuleClassDiv = styled.div`
    width: 500px;
    height: 230px;
    margin: 0;
    box-shadow: 0 4px 8px 0 rgba(115,143,147,.5);
    display: flex;
    cursor: pointer;
`;

const ModuleClassTitle = styled.div`
    margin-bottom: 40px;
    font-size: 26px;
`;

const ModuleClassDesc = styled.div`
    font-size: 14px;
    margin-bottom: 6px;
`;

const ModuleClassText = styled.div`
    width: 390px;
    padding: 40px 20px 40px 40px;
`;

const ModuleClassImgDiv = styled.div`
    border-left: 2px solid #50667b;
    border-right: 2px solid #50667b;
    height: 60px;
    width: 64px;
`;

const ModuleClassImg = styled.img`
    width: 42px;
    height: 42px;
    margin: 9px;
`;



export default Module;
import React, { Component } from 'react';
import { Link } from '../../routes';
import Layout from '../../components/MyLayout';
import  styled, { css } from 'styled-components';
import Data from '../../meta.json';
import { HashLoader } from 'react-spinners';
import axios from 'axios';
import { Player } from 'video-react';

class SubModule extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      module: {},
      isText: true
    };
  }

  componentWillMount() {
    const id = this.props.url.query.submodule_id;
    axios.get("http://167.99.93.236:80/module/"+id).then((response)=>{
      const res = response.data; 
      this.setState({module: res});
    }).then((response)=>{
        console.log("response", response);
    }).catch((error)=>{
    console.log(error);
    });
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, 1200);
  }

  toggleText = () => {
      const temp = this.state.isText;
      this.setState({
          isText: !temp
      });
  }

  render() {

    return(
      <Layout title={Data[0].submodule.title} description={Data[0].submodule.description} ogUrl={Data[0].submodule.image} route="submodule">
        { !this.state.isLoaded ?
          <Indicator>
            <HashLoader color={'#50667b'}/>
          </Indicator>
        :
        <SubModuleClass>
            <SubModuleContainer>
                {this.state.isText ?
                <SubModuleTask>
                    <SubModuleTaskTitle>{this.state.module.submodules[0].title}</SubModuleTaskTitle>
                    <SubModuleTaskDescription>{this.state.module.submodules[0].tutorial_text}</SubModuleTaskDescription>
                </SubModuleTask> : 
                <SubModuleTask>
                    <SubModuleTaskVideo>
                        <Player width="800px" height="450px">
                            <source src={this.state.module.submodules[0].video_url.toString()} />
                        </Player>
                    </SubModuleTaskVideo>
                </SubModuleTask>}
                <SubModuleToggle>
                    <SubModuleTaskText onClick={this.toggleText} style={this.state.isText ? {backgroundColor: "#63b1c6", color: "white"} : null}>Task</SubModuleTaskText>
                    <SubModuleTaskVideoText onClick={this.toggleText} style={this.state.isText == false ? {backgroundColor: "#63b1c6", color: "white"} : null}>Video</SubModuleTaskVideoText>
                </SubModuleToggle>
            </SubModuleContainer>
            <SubModuleProblemContainer>
                <SubModuleProblemContainerHeader>Problems</SubModuleProblemContainerHeader>
                {this.state.module.problems.map((problem, id) => {
                    return(
                    <Link route="problem-detail" params={{id: problem.problem_id}}>
                        <SubModuleProblemContainerText key={id}>{problem.problem_name}</SubModuleProblemContainerText>
                    </Link>
                    )
                })}
            </SubModuleProblemContainer>
        </SubModuleClass>}
      </Layout>
    )
  }
}

const Indicator = styled.div`
  position: absolute;
  left: 55%;
  top: 40%;
`;

const SubModuleClass = styled.div`
  width: 100%;
  padding: 40px;
  color: #50667b;
`;

const SubModuleContainer = styled.div`
    width: 1010px;
    margin: 0 50px;
    height: 600px;
    border: 1px solid rgba(0,0,0,0.0625);
    box-shadow: 0 4px 8px 0 rgba(115,143,147,.5);
    border-radius: 6px;
`;

const SubModuleTask = styled.div`
    width: 100%;
    height: 538px;
    padding: 50px;
`;

const SubModuleTaskTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
    margin-bottom 15px;
`;

const SubModuleTaskDescription = styled.div`
    font-size: 16px;
    line-height: 18px;
`;

const SubModuleToggle = styled.div`
    width: 100%;
    height: 48px;
    cursor: pointer;
    display: flex;
    font-size: 20px;
    margin: 13px 0;
    border-top: 2px solid rgba(0,0,0,0.0625);
`;

const SubModuleTaskText = styled.div`
    width: 504px;
    text-align: center;
    padding-top: 8px;
    border-right: 2px solid rgba(0,0,0,0.0625);
    border-bottom-left-radius: 6px;
`;

const SubModuleTaskVideoText = styled.div`
    width: 504px;
    text-align: center;
    padding-top: 8px;
    border-bottom-left-right: 6px;
`;

const SubModuleTaskVideo = styled.video`
    margin: 0 60px;
`;

const SubModuleProblemContainer = styled.div`
    margin: 50px;
    box-shadow: 0 4px 8px 0 rgba(115,143,147,.5);
    border-radius: 6px;
`;

const SubModuleProblemContainerHeader = styled.div`
    height: 50px;
    width: 100%;
    font-size: 22px;
    padding: 14px;
    font-weight: bold;
    background-color: #63b1c6;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    color: white;
`;

const SubModuleProblemContainerText = styled.div`
    height: 50px;
    padding: 14px;
    font-size: 18px;
    border-bottom: 1px solid rgba(0,0,0,0.0625);
    cursor: pointer;
`;

export default SubModule;
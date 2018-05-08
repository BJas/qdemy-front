import React, { Component } from 'react';
import { Link } from '../../routes';
import Layout from '../../components/MyLayout';
import  styled, { css } from 'styled-components';
import Data from '../../meta.json';
import axios from 'axios';

const Editor = (props) => {
    if (typeof window !== 'undefined') {
      const Ace = require('react-ace').default;
      require('brace/mode/c_cpp');
      require('brace/theme/solarized_dark');
  
      return <Ace {...props}/>
    }
  
    return null;
  }

class ProblemDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            problem: {},
            code: "// Code"
        };
    }
    updateCode = (newCode) => {
		this.setState({
			code: newCode
		});
	}

    componentWillMount() {
        const id = this.props.url.query.id;
        axios.get("http://167.99.93.236:80/problem/"+id).then((response)=>{
            const res = response.data;
            this.setState({problem: res});
        }).catch((error)=>{
            console.log(error);
        });
    }

    submitHandler = () => {
        let url = "http://a732ff9f.compilers.sphere-engine.com/api/v3/submissions?access_token=3e3ea815c4b6dfe2ee0d47d710321e9d&quot";
        let data = JSON.stringify({
            "compilerId": 1,
            "source": this.state.code
          });
          console.log("code", this.state.code);

        fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: data
        }).catch(error => console.log(error));
    }

    render() {
        let options= {
            mode: 'xml',
            theme: 'material',
            lineNumbers: true
          };
        
        return(
            <Layout title={this.state.problem.name + Data[0].main_details.title} description={Data[0].main_details.description} ogUrl={Data[0].main_details.image} route="problem-detail">
                <ProblemClass>
                    <ProblemClassContainer>
                        <ProblemClassTitle>Objective</ProblemClassTitle>
                        <ProblemClassDesc>{this.state.problem.name}</ProblemClassDesc>
                        <ProblemClassTitle>Difficulty</ProblemClassTitle>
                        <ProblemClassDesc>{this.state.problem.difficulty}</ProblemClassDesc>
                        <ProblemClassTitle>Domain</ProblemClassTitle>
                        <ProblemClassDesc>{this.state.problem.domain}</ProblemClassDesc>
                        <ProblemClassTitle>Task</ProblemClassTitle>
                        <ProblemClassDesc>{this.state.problem.text}</ProblemClassDesc>
                    </ProblemClassContainer>
                    <ProblemClassCodeEngine>
                    <Editor
                        width='800px'
                        value={this.state.code}
                        mode="c_cpp"
                        theme="solarized_dark"
                        onChange={this.updateCode}
                    />
                    <ProblemClassSubmit onClick={this.submitHandler}>Submit</ProblemClassSubmit>
                    </ProblemClassCodeEngine>
                </ProblemClass>
            </Layout>
        )   
    }
}

const ProblemClass = styled.div`
    padding: 40px;

`;

const ProblemClassContainer = styled.div`
    width: 1110px;
    margin: 0 auto;
    padding: 25px;
    height: 800px;
    background-color: #f3f7f7;
    box-shadow: 2px 2px 8px 0 gray;
    color: #50667b;
`;

const ProblemClassTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const ProblemClassDesc = styled.div`
    font-size: 16px;
    margin-bottom: 14px;
`;

const ProblemClassCodeEngine = styled.div`
    width: 1110px;
    padding: 0 155px 30px 155px;
    height: 530px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    color: white;
`;

const ProblemClassSubmit = styled.div`
    width: 100px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    padding: 8px 0;
    margin: 0 auto;
    margin-top: 25px;
    color: white;
    background-color: #1ba94c;
    border-radius: 4px;
    text-transform: uppercase;
    cursor: pointer;
`;

export default ProblemDetail;
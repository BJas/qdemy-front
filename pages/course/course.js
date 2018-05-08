import React, { Component } from 'react';
import { Link } from '../../routes';
import Layout from '../../components/MyLayout';
import  styled, { css } from 'styled-components';
import Data from '../../meta.json';
import { HashLoader } from 'react-spinners';
import axios from 'axios';

class Course extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      courses: []
    };
  }

  componentWillMount() {
    axios.get("http://167.99.93.236:80/course/all").then((response)=>{
      const res = response.data; 
      this.setState({courses: res});
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

    return(
      <Layout title={Data[0].courses.title} description={Data[0].courses.description} ogUrl={Data[0].courses.image} route="course">
        { !this.state.isLoaded ?
          <Indicator>
            <HashLoader color={'#50667b'}/>
          </Indicator>
        :
        <CourseClass>
          {this.state.courses.map((temp, id) => {
            if(id % 3 == 0) {
              return(
              <CourseClassContainer>
                {this.state.courses.slice(id, id + 3).map((course, course_id) => {
                  return(
                    <Link route="module"  params={{id: course.course_id}} key={course_id}>
                      <CourseClassDiv style={course_id != 2 ? { marginRight: 40 } : null }>
                        <CourseClassTop>
                          <CourseClassTopImg src={course.image_url} alt="Qdemy"/>
                          <CourseClassTopTextDiv>
                            <CourseClassTopTitle>{course.name}</CourseClassTopTitle>
                            <CourseClassTopText>{course.about}</CourseClassTopText>
                          </CourseClassTopTextDiv>
                        </CourseClassTop>
                        <CourseClassBottom>
                          <CourseClassBottomTextFirst>
                            <CourseClassBottomImg src="../../static/main/duration.svg" alt="Qdemy"/>
                            {course.duration} hours
                          </CourseClassBottomTextFirst>
                          <CourseClassBottomTextFirst>
                            <CourseClassBottomImg src="../../static/main/user.svg" alt="Qdemy"/>
                            {course.registered_count}
                          </CourseClassBottomTextFirst>
                        </CourseClassBottom>
                      </CourseClassDiv>
                    </Link>
                  )
                })}
              </CourseClassContainer>
              )}
          })}
        </CourseClass>}
      </Layout>
    )
  }
}

const Indicator = styled.div`
  position: absolute;
  left: 55%;
  top: 40%;
`;

const CourseClass = styled.div`
  width: 100%;
  padding: 40px;
  color: #50667b;
`;

const CourseClassContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const CourseClassDiv = styled.div`
  width: 343px;
  height: 250px;
  box-shadow: 0 4px 2px -2px gray;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    box-shadow: 2px 2px 2px 1px gray;
  }
`;

const CourseClassTop = styled.div`
  height: 200px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #FAFAFA;
  padding: 35px 25px 0 25px;
  display: flex;
`;

const CourseClassTopImg = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const CourseClassBottom = styled.div`
  height: 50px;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #D9D9D9;
`;

const CourseClassTopTextDiv = styled.div`
  width: 263px;
`;

const CourseClassTopTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  height: 64px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

`;

const CourseClassTopText = styled.div`
  font-size: 15px;
  height: 36px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CourseClassBottomTextFirst = styled.div`
  display: flex;
  font-size: 14px;
`;

const CourseClassBottomImg = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 8px;
`;

export default Course;
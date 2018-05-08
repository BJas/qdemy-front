import React, { Component } from 'react';
import  styled, { css } from 'styled-components';
import Popover from 'react-simple-popover';
import { Link } from '../../routes';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        };
    }
    
    handleClick = (e) => {
        this.setState({open: !this.state.open});
    }
    
    handleClose = (e) => {
        this.setState({open: false});
    }

    render() {
        return(
            <ProfileClass>
                <ProfileClassSrc
                    ref="target"
                    onClick={this.handleClick}
                    src="../../static/example/profile.svg" 
                    alt="Qdemy"/>
                <ProfileName onClick={this.handleClick}>{this.props.name + " " +this.props.surname}</ProfileName>
                <Popover
                    containerStyle={{ marginTop: '7px' }}
                    style={{width: '170px', padding: 0, paddingBottom: '10px'}}
                    placement='bottom'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose}>
                    <div>
                        <PopoverUl>
                            <Link route="/profile">
                                <PopoverItem className="popover-hover">Профиль</PopoverItem>
                            </Link>
                            <PopoverItem className="popover-hover">О Проекте</PopoverItem>
                        </PopoverUl>
                            <PopoverOut className="popover-hover" onClick={this.props.logOut}>Выход</PopoverOut>
                    </div>
                </Popover>
            </ProfileClass>
        )
    }
}

const ProfileClass = styled.div`
    display: flex;
    flex-direction: row;
`;

const ProfileClassSrc = styled.img`
    height: 40px;
    width: 40px;
    margin: 14px 15px 15px 0;
    border-radius: 20px;
    cursor: pointer;
`;

const ProfileName = styled.div`
    font-size: 15px;
    margin: 27px 0 27px 0;
    cursor: pointer;
`;
const PopoverUl = styled.ul`
    list-style-type: none;
    padding: 14px 0 10px 0;
    margin: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.0625);
    font-size: 14px;
    line-height: 24px;
`;

const PopoverItem = styled.li`
    margin: 4px 0;
    padding: 4px 12px;
    cursor: pointer;
    white-space: nowrap;
`;

const PopoverOut = styled.div`
    font-size: 14px;
    line-height: 24px;
    margin-top: 10px;
    padding: 4px 12px;
    cursor: pointer;
`;

export default Profile;
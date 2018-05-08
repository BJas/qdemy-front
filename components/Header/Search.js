import React, { Component } from 'react';
import  styled, { css } from 'styled-components';
import Modal from 'react-modal';
import { media, modalCustomStyles } from '../../style-utils/style-utils';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            searchResult: ""
        }
    }

    close = () => {
        this.props.closeModal()
        this.setState({
            searchValue: "",
            searchResult: "",
            searchLoading: false
        });
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    
    getResult = (event) => {
        if(event.key === 'Enter' && this.state.searchValue.trim() !== "") {
            this.setState({
                searchLoading: true
            });
            setTimeout(() => {
                this.setState({ searchResult: null });
            }, 2600);
        }
    }

    render() {
        return(
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    style={modalCustomStyles}
                    contentLabel="DAR Search">
                    <SearchCloseSrc src="../../static/menu/cancel.svg" onClick={this.close} alt="Qdemy" />
                    <SearchClass>
                        <SearchClassInputDiv>
                            <SearchClassSrc src="../../static/menu/search.svg" className="search-animation" alt="Qdemy"/>
                            <SearchInput
                                type="text" 
                                name="searchValue" 
                                className="search-animation"
                                onChange={(e) => this.handleChange(e)} 
                                value={this.state.searchValue} 
                                onKeyPress={(e) => this.getResult(e)} 
                                placeholder="Search a course" 
                                autoFocus />
                        </SearchClassInputDiv>
                        <SearchResultLine 
                            className={this.state.searchLoading ? "search-result-animation" : null}></SearchResultLine>
                        <SearchClassResult>
                            {this.state.searchResult === null ? 
                                <SearchClassResultNotFound>Не найдено</SearchClassResultNotFound>
                            : 
                                <div></div>}
                        </SearchClassResult>
                    </SearchClass>
                </Modal>
        )
    }
}

const SearchClass = styled.div``;

const SearchClassInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 250px 0 250px;
    border-bottom: 2px solid rgba(80, 102, 123, 0.0625);
`;

const SearchCloseSrc = styled.img`
    position: absolute;
    right: 30px;
    top: 30px;
    width: 12px;
    height: 12px;
    cursor: pointer;
    opacity: 0.6;
    :hover {
        opacity: 0.8;
    }
`;

const SearchInput = styled.input`
    margin-top: 17px;
    margin-bottom: 20px;
    width: 50%;
    height: 32px;
    border: none;
    background: transparent;
    color: #50667b;
    outline: none;
    font-size: 24px;
    line-height: 32px;
    ::placeholder {
        color: #50667b;
        opacity: 0.4;
    }
`;

const SearchClassSrc = styled.img`
    height: 24px;
    width: 24px;
    margin: 22px 16px 0 0;
    opacity: 0.8;
`;

const SearchClassResult = styled.div`
    margin-top: 30px;
`;

const SearchClassResultNotFound = styled.div`
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #50667b;
`;

const SearchResultLine = styled.div`
    position: absolute;
    margin-top: -2px;
    left: 250px;
    right: 250px;
    height: 2px;
    background-color: transparent;
`;


export default Search;
import React, { Component } from 'react';
import  styled, { css } from 'styled-components';

class Mail extends Component {
    render() {
        return(
            <MailClass>
                <MailClassSrc src="../../static/menu/email.svg" alt="Qdemy"/>
            </MailClass>
        )
    }
}

const MailClass = styled.div``;

const MailClassSrc = styled.img`
    height: 20px;
    width: 20px;
    margin: 24px 40px 25px 0;
    cursor: pointer;
    opacity: 0.8;
    :hover {
        opacity: 1;
    }
`;

export default Mail;
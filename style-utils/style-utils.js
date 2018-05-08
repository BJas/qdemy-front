import { css } from 'styled-components';

const size = {
    largeDesktop: 1439,
    middleDesktop: 1023,
    desktops: 991,
    tablets: 767,
    phones: 479,
    smallPhones: 319
  }
  
export const media = Object.keys(size).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${size[label]}px) {
        ${css(...args)}
      }
    `
    
    return acc
  }, {});

export const modalCustomStyles = {
    overlay: {
        backgroundColor: '#FFF',
        opacity: '0.99',
        'backgroundBlendMode' : 'normal',
        width: '100%',
        zIndex: '999'
      },
    content : {
      top                   : '0',
      left                  : '0',
      right                 : '0',
      bottom                : '0',
      border                : 'none',
      background            : 'none',
      padding               : '0'
    }
  };

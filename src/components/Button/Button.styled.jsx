import styled from '@emotion/styled';

export const StyledButton = styled.button`
margin: 0px auto;
padding: 8px 16px;
border-radius: 5px;
background-color: rgba(12, 182, 123, 0.42);
transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
text-align: center;
display: inline-block;
color: #ffffff;
border: 0px;
text-decoration: none;
cursor: pointer;
font-family: inherit;
font-size: 18px;
line-height: 24px;
font-style: normal;
font-weight: 500;
min-width: 180px;
box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  &:hover,
  &:focus {
    background-color: #f0f0ff;
    color: #535353;
  }
`; 
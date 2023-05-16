import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #575353;
  z-index: 1200;
`;

export const StyledModal = styled.div`
  position: relative;

  max-width: calc(100vw - 18px);
  max-height: calc(100vh - 10px);
`;
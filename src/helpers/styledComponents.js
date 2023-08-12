import styled from "styled-components";
import Modal, { BaseModalBackground } from "styled-react-modal";
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
  position: fixed !important;
  top: 0px !important;
  left: 0px !important;
  width: 100vw !important;
  z-index: 99999;
`;

const StyledModal = Modal.styled`
  width: 35rem;
  height: 65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  box-shadow:0px 0px 10px rgba(0,0,0,0.6);
  border-radius:10px;
  padding:20px 20px;
  z-index: 100;
  `;

export { FadingBackground, StyledModal };

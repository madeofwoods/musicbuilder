import styled, { keyframes } from "styled-components";

const noteAnimation = keyframes`
0% {
  background-color: #2b2735
}
20% {
  background-color: #2b2735
}
100% {
  background-color: none
}
`;

export const NoteContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* padding: 5px 0px; */
  height: 50px;
  background-color: ${(props) =>
    props.beat % 4 == 0 ? "rgb(89, 64, 128, 0.65)" : "none"};
  animation-name: ${(props) => props.newRowAdded === props.id && noteAnimation};
  animation-duration: 0.8s;
`;

export const Margin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  opacity: ${(props) => (props.isShowing ? 1 : 0)};
`;

export const AddRemoveContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px;
  /* padding: 5px 0px; */
  height: 50px;
  background-color: ${(props) =>
    props.beat % 4 == 0 ? "rgb(89, 64, 128, 0.65)" : "none"};
`;

export const Note = styled.input`
  background-color: ${(props) =>
    props.color == "" ? "gray" : props.isCorrect ? "#fffcfc" : "#f78989"};
  width: 70px;
  height: 40px;
  color: black;
  border: ${(props) => (props.beat % 4 == 0 ? "4px solid #b1b1f9" : "none")};
  border: none;
  /* box-sizing: ${(props) =>
    props.beat % 4 == 0 ? "content-box" : "border-box"}; */
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  font-size: 1.5rem;

  &&:focus {
    background-color: ${(props) => (props.isCorrect ? "white" : "#f78989")};
  }
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.current == props.number ? "#9f9d9d" : "black"};
  width: 75px;
  height: 40px;
  text-align: center;
  border: none;
  outline: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  justify-content: center;
  color: white;

  &&:focus {
    border: none;
    outline: none;
  }
`;

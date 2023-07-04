import styled, { keyframes } from "styled-components";

const noteAnimation = keyframes`
0% {
  background-color: #868688
}
/* 20% {
  background-color: #60557d
} */
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
  animation-name: ${(props) =>
    props.newRowAdded === props.id + 1 && noteAnimation};
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

export const BarCount = styled(AddRemoveContainer)`
  opacity: ${(props) => (props.beat % 4 == 0 ? 1 : 0)};
`;

export const Beat = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const FileUploadContainer = styled.div`
  position: absolute;
  background-color: #201f24;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
`;

export const FileUpload = styled.div`
  position: relative;
  /* width: 500px;
  height: 700px; */
  /* background-color: #201f24;
  border: 1px solid #b2b2b2;
  border-radius: 5px; */
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 20px;
`;

export const UploadInputWindow = styled.textarea`
  width: 400px;
  height: 500px;
  background-color: gray;
  border: 1px solid white;
  overflow: scroll;
  padding: 15px 5px;
  color: white;
  text-align: center;
  /* display: flex;
  flex-direction: column;
  justify-content: start; */
`;

export const SubmitButton = styled.button`
  padding: 5px 10px;
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
  background-color: #555353;
  color: white;

  &&:hover {
    background-color: #8b8989;
  }
`;

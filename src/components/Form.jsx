import { useRef, useState, useEffect } from "react";
import {
  AddRemoveContainer,
  Button,
  Margin,
  Note,
  NoteContainer,
} from "../styles/Form.styled";
import JSON5 from "json5";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import image from "../assets/businessman.png";

const Form = () => {
  const [isShowing, setIsShowing] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  // const [incorrect, setIncorrect] = useState(false);
  const [beats, setBeats] = useState(1);
  // const [numberOfNotes, setNumberOfNotes] = useState(200);
  const numberOfNotes = 200;
  const [outputData, setOutputData] = useState([]);
  const ref = useRef();
  const [highestNoteID, setHighestNoteID] = useState(numberOfNotes);

  const collectData = (sData, dData, fData) => {
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    return [
      ...sClone
        .filter((el) => el.value != "")
        .map((el) => ({
          delay: beats * el.beat + 8,
          no: Number(el.value),
          letter: "s",
          isCorrect: el.isCorrect,
        })),
      ...dClone
        .filter((el) => el.value != "")
        .map((el) => ({
          delay: beats * el.beat + 8,
          no: Number(el.value),
          letter: "d",
          isCorrect: el.isCorrect,
        })),
      ...fClone
        .filter((el) => el.value != "")
        .map((el) => ({
          delay: beats * el.beat + 8,
          no: Number(el.value),
          letter: "f",
          isCorrect: el.isCorrect,
        })),
    ].sort((a, b) => a.delay - b.delay);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth", block: "end" });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const loadNotes = () => {
    const output = [];
    for (let i = 0; i < numberOfNotes; i++) {
      output.unshift({ id: i, isCorrect: true, beat: beats * i, value: "" });
    }
    return output;
  };

  const [sData, setSData] = useState(loadNotes());
  const [dData, setDData] = useState(loadNotes());
  const [fData, setFData] = useState(loadNotes());

  useEffect(() => {
    setOutputData(collectData(sData, dData, fData));
  }, [sData, dData, fData, beats]);

  const handleChange = (e, id, data, setData) => {
    const clone = [...data];

    let text = e.target.value;

    clone.forEach((el) => (el.value = el.id == id ? text : el.value));
    setData(clone);
  };

  const handleClick = (e, id, data, setData) => {
    const clone = [...data];

    clone.forEach(
      (el) => (el.isCorrect = el.id == id ? !el.isCorrect : el.isCorrect)
    );
    setData(clone);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const handleAddRow = (beat) => {
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    sClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    dClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    fClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    setSData(
      [
        ...sClone,
        {
          id: highestNoteID,
          isCorrect: true,
          beat: beat + 1,
          value: "",
        },
      ].sort((a, b) => b.beat - a.beat)
    );
    setDData(
      [
        ...dClone,
        {
          id: highestNoteID,
          isCorrect: true,
          beat: beat + 1,
          value: "",
        },
      ].sort((a, b) => b.beat - a.beat)
    );
    setFData(
      [
        ...fClone,
        {
          id: highestNoteID,
          isCorrect: true,
          beat: beat + 1,
          value: "",
        },
      ].sort((a, b) => b.beat - a.beat)
    );
    setHighestNoteID((prev) => prev + 1);
    console.log(sData);
    console.log(highestNoteID);
  };

  const handleRemoveRow = (beat) => {
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    sClone.splice(sClone.length - 1 - beat, 1);
    sClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    dClone.splice(dClone.length - 1 - beat, 1);
    dClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    fClone.splice(fClone.length - 1 - beat, 1);
    fClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    setSData([...sClone]);
    setDData(dClone);
    setFData(fClone);
    console.log(sClone);
  };

  return (
    <div className="Form">
      <div className="box--container">
        <div className="box">
          <div className="form--container">
            {/* <Margin isShowing={isShowing}></Margin> */}
            <div className="row--one">
              {sData.map((el) => (
                <NoteContainer
                  beat={el.beat}
                  key={el.id}
                  id={el.id}
                  newRowAdded={highestNoteID}
                >
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    type="number"
                    min={0}
                    beat={el.beat}
                    className="input"
                    value={el.value}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(e) => handleChange(e, el.id, sData, setSData)}
                  />
                  {!isShowing ? null : el.isCorrect ? (
                    <ToggleOffIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, sData, setSData)}
                    />
                  ) : (
                    <ToggleOnIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, sData, setSData)}
                    />
                  )}
                </NoteContainer>
              ))}
            </div>
            <div className="row--two">
              {dData.map((el) => (
                <NoteContainer
                  beat={el.beat}
                  key={el.id}
                  id={el.id}
                  newRowAdded={highestNoteID}
                >
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    type="number"
                    min={0}
                    beat={el.beat}
                    className="input"
                    value={el.value}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(e) => handleChange(e, el.id, dData, setDData)}
                  />
                  {!isShowing ? null : el.isCorrect ? (
                    <ToggleOffIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, dData, setDData)}
                    />
                  ) : (
                    <ToggleOnIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, dData, setDData)}
                    />
                  )}
                </NoteContainer>
              ))}
            </div>
            <div className="row--three">
              {fData.map((el) => (
                <NoteContainer
                  beat={el.beat}
                  key={el.id}
                  id={el.id}
                  newRowAdded={highestNoteID}
                >
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    type="number"
                    min={0}
                    beat={el.beat}
                    className="input"
                    value={el.value}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(e) => handleChange(e, el.id, fData, setFData)}
                  />
                  {!isShowing ? null : el.isCorrect ? (
                    <ToggleOffIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, fData, setFData)}
                    />
                  ) : (
                    <ToggleOnIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, fData, setFData)}
                    />
                  )}
                </NoteContainer>
              ))}
            </div>
            <Margin isShowing={isShowing}>
              {fData.map((el) => (
                <AddRemoveContainer beat={el.beat} key={el.id}>
                  <div className="add--remove">
                    <AddCircleOutlineIcon
                      className="add--remove--icon"
                      onClick={() => handleAddRow(el.beat)}
                    />
                    <RemoveCircleOutlineIcon
                      className="add--remove--icon"
                      onClick={() => handleRemoveRow(el.beat)}
                    />
                  </div>
                </AddRemoveContainer>
              ))}
            </Margin>
          </div>
          <div ref={ref} className="ref">
            START
          </div>
        </div>
      </div>
      <div className="output--container">
        <div className="buttons">
          {/* <Button
            number={0.25}
            current={beats}
            className="button"
            onClick={() => setBeats(0.25)}
          >
            0.25
          </Button> */}
          <Button
            number={0.5}
            current={beats}
            className="button"
            onClick={() => setBeats(0.5)}
          >
            0.5
          </Button>
          <Button
            number={1}
            current={beats}
            className="button"
            onClick={() => setBeats(1)}
          >
            1
          </Button>
          <Button
            number={2}
            current={beats}
            className="button"
            onClick={() => setBeats(2)}
          >
            2
          </Button>
          <Button
            number={4}
            current={beats}
            className="button"
            onClick={() => setBeats(4)}
          >
            4
          </Button>
        </div>
        <div className="commands">
          <div className="toggle--text">HIDE</div>
          {isShowing ? (
            <ToggleOnIcon
              className="icon"
              onClick={() => setIsShowing(!isShowing)}
            />
          ) : (
            <ToggleOffIcon
              className="icon"
              onClick={() => setIsShowing(!isShowing)}
            />
          )}
          <div className="toggle--text">SHOW</div>
        </div>
        <div className="output">
          {outputData.length == 0 ? "" : JSON5.stringify(outputData, null, 0)}
          {isCopied ? (
            <div className="copied--contianer">
              <img src={image} className="copied--image" />
              <div className="copied--text">
                <p>copied to clipboard</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="download--icons">
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON5.stringify(outputData, null, 1)
            )}`}
            download="rhythm-game-level.json"
          >
            <DownloadIcon className="download--icon" />
          </a>
          <CopyToClipboard text={JSON5.stringify(outputData, null, 0)}>
            <ContentCopyIcon
              className="download--icon"
              onClick={() => setIsCopied(true)}
            />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default Form;

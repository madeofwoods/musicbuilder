import { useRef, useState, useEffect } from "react";
import {
  AddRemoveContainer,
  BarCount,
  Beat,
  BeatInput,
  Button,
  FileUpload,
  FileUploadContainer,
  Margin,
  Note,
  NoteContainer,
  StartingNoteContainer,
  SubmitButton,
  Tooltip,
  UploadInputWindow,
  Wrapper,
} from "../styles/Form.styled";
import JSON5 from "json5";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import image from "../assets/businessman.png";

const green = "rgb(140, 255, 128)";
const green2 = "rgb(175, 255, 166)";
const green3 = "rgb(216, 255, 212)";
const red = "#de5959";

const Form = () => {
  const [isShowing, setIsShowing] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  // const [incorrect, setIncorrect] = useState(false);
  const [beats, setBeats] = useState(1);
  // const [numberOfNotes, setNumberOfNotes] = useState(200);
  const numberOfNotes = 400;
  const [outputData, setOutputData] = useState([]);
  const ref = useRef();
  const [highestNoteID, setHighestNoteID] = useState(numberOfNotes);
  const [formInput, setFormInput] = useState("");
  const [startingBeat, setStartingBeat] = useState(8);

  const collectData = (sData, dData, fData) => {
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    return [
      ...sClone
        .filter((el) => el.value != "")
        .map((el) =>
          el.color
            ? {
                delay: beats * el.beat + Number(startingBeat),
                no: Number(el.value),
                letter: "s",
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                delay: beats * el.beat + Number(startingBeat),
                no: Number(el.value),
                letter: "s",
                isCorrect: el.isCorrect,
              }
        ),
      ...dClone
        .filter((el) => el.value != "")
        .map((el) =>
          el.color
            ? {
                delay: beats * el.beat + Number(startingBeat),
                no: Number(el.value),
                letter: "d",
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                delay: beats * el.beat + Number(startingBeat),
                no: Number(el.value),
                letter: "d",
                isCorrect: el.isCorrect,
              }
        ),
      ...fClone
        .filter((el) => el.value != "")
        .map((el) =>
          el.color
            ? {
                delay: beats * el.beat + Number(startingBeat),
                no: Number(el.value),
                letter: "f",
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                delay: beats * el.beat + Number(startingBeat),
                no: Number(el.value),
                letter: "f",
                isCorrect: el.isCorrect,
              }
        ),
    ].sort((a, b) => a.delay - b.delay);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth", block: "end" });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // loadnotes -- function to populate the empty notes to map to

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
  }, [sData, dData, fData, beats, startingBeat]);

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

  useEffect(() => {
    console.log("true", outputData.filter((el) => el.isCorrect).length);
    console.log("false", outputData.filter((el) => !el.isCorrect).length);
  }, [outputData]);

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

  const handleSubmit = () => {
    setPopupActive(false);
    setBeats(1);
    let sNew = loadNotes();
    let dNew = loadNotes();
    let fNew = loadNotes();
    let formData = JSON5.parse(formInput);

    console.log("formData", formData);

    let sFormData = formData
      .filter((el) => el.letter == "s")
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.delay - startingBeat]: {
            value: item.no,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );
    let dFormData = formData
      .filter((el) => el.letter == "d")
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.delay - startingBeat]: {
            value: item.no,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );
    let fFormData = formData
      .filter((el) => el.letter == "f")
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.delay - startingBeat]: {
            value: item.no,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );

    console.log("dformdata", dFormData);

    sNew = sNew.map((el) =>
      sFormData.hasOwnProperty(el.beat)
        ? {
            id: el.id,
            isCorrect: sFormData[el.beat].isCorrect,
            beat: el.beat,
            value: sFormData[el.beat].value,
            color:
              sFormData[el.beat].color != null
                ? sFormData[el.beat].color
                : null,
          }
        : el
    );
    dNew = dNew.map((el) =>
      dFormData.hasOwnProperty(el.beat)
        ? {
            id: el.id,
            isCorrect: dFormData[el.beat].isCorrect,
            beat: el.beat,
            value: dFormData[el.beat].value,
            color:
              dFormData[el.beat].color != null
                ? dFormData[el.beat].color
                : null,
          }
        : el
    );
    fNew = fNew.map((el) =>
      fFormData.hasOwnProperty(el.beat)
        ? {
            id: el.id,
            isCorrect: fFormData[el.beat].isCorrect,
            beat: el.beat,
            value: fFormData[el.beat].value,
            color:
              fFormData[el.beat].color != null
                ? fFormData[el.beat].color
                : null,
          }
        : el
    );

    console.log(dNew);
    setSData([...sNew]);
    setDData([...dNew]);
    setFData([...fNew]);
  };

  const handleInput = (e) => {
    setFormInput(e.target.value);
    setBeats(1);
  };

  const handlePopup = () => {
    setPopupActive(true);
    setBeats(1);
  };

  return (
    <div className="Form">
      <div className="box--container">
        <div className="box">
          <div className="form--container">
            {/* <Margin isShowing={isShowing}></Margin> */}
            <Margin isShowing={isShowing}>
              {sData.map((el) => (
                <BarCount beat={el.beat} key={el.id}>
                  <Beat className="dbeat">{el.beat / 4 + 1}</Beat>
                </BarCount>
              ))}
            </Margin>
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
                      up
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
        <div className="count">
          <div className="count--element">
            <div>Correct:</div>
            <div>{outputData.filter((el) => el.isCorrect).length}</div>
          </div>
          <div className="count--element">
            <div>Incorrect:</div>
            <div>{outputData.filter((el) => !el.isCorrect).length}</div>
          </div>
          <div className="count--element">
            <div>Proportion:</div>
            {outputData.length > 0 ? (
              <div>
                {(
                  (outputData.filter((el) => !el.isCorrect).length * 100) /
                  (outputData.filter((el) => el.isCorrect).length +
                    outputData.filter((el) => !el.isCorrect).length)
                ).toFixed(0)}{" "}
                %
              </div>
            ) : (
              <div>0 %</div>
            )}
          </div>
        </div>
        <StartingNoteContainer>
          <div>Start Beat: </div>
          <Wrapper>
            <BeatInput
              type="number"
              value={startingBeat}
              onChange={(e) => setStartingBeat(e.target.value)}
            />

            <Tooltip className="tooltip">
              Beats start at 0. Recommend using 8. Use a power of 4.{" "}
            </Tooltip>
          </Wrapper>
        </StartingNoteContainer>
        <div className="buttons">
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
          <UploadFileIcon
            className="download--icon"
            onClick={() => handlePopup()}
          ></UploadFileIcon>
        </div>
      </div>
      {popupActive && (
        <FileUploadContainer>
          <FileUpload>
            <CloseIcon
              className="close--icon"
              onClick={() => setPopupActive(false)}
            ></CloseIcon>
            <h2>PASTE LEVEL BELOW</h2>
            <UploadInputWindow
              spellcheck="false"
              value={formInput}
              onChange={(e) => handleInput(e)}
            ></UploadInputWindow>
            <SubmitButton onClick={() => handleSubmit()}>UPLOAD</SubmitButton>
          </FileUpload>
        </FileUploadContainer>
      )}
    </div>
  );
};

export default Form;

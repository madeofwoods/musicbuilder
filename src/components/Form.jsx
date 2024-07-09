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

const numberOfNotes = 400;

const Form = () => {
  const [isShowing, setIsShowing] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [outputData, setOutputData] = useState([]);
  const [highestNoteID, setHighestNoteID] = useState(numberOfNotes);
  const [formInput, setFormInput] = useState("");
  const ref = useRef();

  const collectData = (aData, sData, dData, fData) => {
    let aClone = [...aData];
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    return [
      ...aClone
        .filter((el) => el.value != "")
        .map((el, index) =>
          el.color
            ? {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 0,
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 0,
                isCorrect: el.isCorrect,
              }
        ),
      ...sClone
        .filter((el) => el.value != "")
        .map((el, index) =>
          el.color
            ? {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 1,
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 1,
                isCorrect: el.isCorrect,
              }
        ),
      ...dClone
        .filter((el) => el.value != "")
        .map((el, index) =>
          el.color
            ? {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 2,
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 2,
                isCorrect: el.isCorrect,
              }
        ),
      ...fClone
        .filter((el) => el.value != "")
        .map((el, index) =>
          el.color
            ? {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 3,
                isCorrect: el.isCorrect,
                color: el.color,
              }
            : {
                beat: el.beat,
                numberValue: Number(el.value),
                lane: 3,
                isCorrect: el.isCorrect,
              }
        ),
    ].sort((a, b) => a.beat - b.beat)
    .map((note, index) => ({
      id: index,
      ...note,
    }))
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
      output.unshift({ id: i, isCorrect: true, beat: i, value: "" });
    }
    return output;
  };

  const [aData, setAData] = useState(loadNotes());
  const [sData, setSData] = useState(loadNotes());
  const [dData, setDData] = useState(loadNotes());
  const [fData, setFData] = useState(loadNotes());

  useEffect(() => {
    setOutputData(collectData(aData, sData, dData, fData));
  }, [aData, sData, dData, fData]);

  const handleChange = (e, id, data, setData) => {
    const clone = [...data];

    let text = e.target.value;

    clone.forEach((el) => (el.value = el.id == id ? text : el.value));
    setData(clone);
  };

  const handleClick = (e, id, data, setData) => {
    const clone = [...data];

    clone.forEach((el) => (el.isCorrect = el.id == id ? !el.isCorrect : el.isCorrect));
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
    let aClone = [...aData];
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    aClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    sClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    dClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    fClone.forEach((el) => (el.beat = el.beat > beat ? el.beat + 1 : el.beat));
    setAData(
      [
        ...aClone,
        {
          id: highestNoteID,
          isCorrect: true,
          beat: beat + 1,
          value: "",
        },
      ].sort((a, b) => b.beat - a.beat)
    );
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
  };

  const handleRemoveRow = (beat) => {
    let aClone = [...sData];
    let sClone = [...sData];
    let dClone = [...dData];
    let fClone = [...fData];

    aClone.splice(aClone.length - 1 - beat, 1);
    aClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    sClone.splice(sClone.length - 1 - beat, 1);
    sClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    dClone.splice(dClone.length - 1 - beat, 1);
    dClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    fClone.splice(fClone.length - 1 - beat, 1);
    fClone.forEach((el) => (el.beat = el.beat > beat ? el.beat - 1 : el.beat));

    setAData(aClone);
    setSData([...sClone]);
    setDData(dClone);
    setFData(fClone);
  };

  const handleSubmit = () => {
    setPopupActive(false);
    let aNew = loadNotes();
    let sNew = loadNotes();
    let dNew = loadNotes();
    let fNew = loadNotes();
    let formData = JSON5.parse(formInput);

    let aFormData = formData
      .filter((el) => el.lane === 0)
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.beat]: {
            numberValue: item.numberValue,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );
    let sFormData = formData
      .filter((el) => el.lane === 1)
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.beat]: {
            numberValue: item.numberValue,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );
    let dFormData = formData
      .filter((el) => el.lane === 2)
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.beat]: {
            numberValue: item.numberValue,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );
    let fFormData = formData
      .filter((el) => el.lane === 3)
      .reduce(
        (obj, item) => ({
          ...obj,
          [item.beat]: {
            numberValue: item.numberValue,
            isCorrect: item.isCorrect,
            color: item.color != undefined ? item.color : null,
          },
        }),
        {}
      );

    console.log({ aFormData });

    aNew = aNew.map((el) =>
      Object.prototype.hasOwnProperty.call(aFormData, el.beat)
        ? {
            id: el.id,
            isCorrect: aFormData[el.beat].isCorrect,
            beat: el.beat,
            value: aFormData[el.beat].numberValue,
            color: aFormData[el.beat].color != null ? aFormData[el.beat].color : null,
          }
        : el
    );
    sNew = sNew.map((el) =>
      Object.prototype.hasOwnProperty.call(sFormData, el.beat)
        ? {
            id: el.id,
            isCorrect: sFormData[el.beat].isCorrect,
            beat: el.beat,
            value: sFormData[el.beat].numberValue,
            color: sFormData[el.beat].color != null ? sFormData[el.beat].color : null,
          }
        : el
    );
    dNew = dNew.map((el) =>
      Object.prototype.hasOwnProperty.call(dFormData, el.beat)
        ? {
            id: el.id,
            isCorrect: dFormData[el.beat].isCorrect,
            beat: el.beat,
            value: dFormData[el.beat].numberValue,
            color: dFormData[el.beat].color != null ? dFormData[el.beat].color : null,
          }
        : el
    );
    fNew = fNew.map((el) =>
      Object.prototype.hasOwnProperty.call(fFormData, el.beat)
        ? {
            id: el.id,
            isCorrect: fFormData[el.beat].isCorrect,
            beat: el.beat,
            value: fFormData[el.beat].numberValue,
            color: fFormData[el.beat].color != null ? fFormData[el.beat].color : null,
          }
        : el
    );

    console.log({ aNew })

    setAData([...aNew]);
    setSData([...sNew]);
    setDData([...dNew]);
    setFData([...fNew]);
  };

  const handleInput = (e) => {
    setFormInput(e.target.value);
  };

  const handlePopup = () => {
    setPopupActive(true);
  };

  console.log({ aData });

  return (
    <div className="Form">
      <div className="box--container">
        <div className="box">
          <div className="form--container">
            <Margin isShowing={isShowing}>
              {aData.map((el) => (
                <BarCount beat={el.beat} key={el.id}>
                  <Beat className="dbeat">{el.beat / 4 + 1}</Beat>
                </BarCount>
              ))}
            </Margin>
            <div className="row--one">
              {aData.map((el) => (
                <NoteContainer beat={el.beat} key={el.id} id={el.id} newRowAdded={highestNoteID}>
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    inputColor={el.color}
                    type="number"
                    min={0}
                    beat={el.beat}
                    className="input"
                    value={el.value}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(e) => handleChange(e, el.id, aData, setAData)}
                  />
                  {!isShowing ? null : el.isCorrect ? (
                    <ToggleOffIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, aData, setAData)}
                    />
                  ) : (
                    <ToggleOnIcon
                      className="toggle--icon"
                      onClick={(e) => handleClick(e, el.id, aData, setAData)}
                    />
                  )}
                </NoteContainer>
              ))}
            </div>
            <div className="row--two">
              {sData.map((el) => (
                <NoteContainer beat={el.beat} key={el.id} id={el.id} newRowAdded={highestNoteID}>
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    inputColor={el.color}
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
            <div className="row--three">
              {dData.map((el) => (
                <NoteContainer beat={el.beat} key={el.id} id={el.id} newRowAdded={highestNoteID}>
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    inputColor={el.color}
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
            <div className="row--four">
              {fData.map((el) => (
                <NoteContainer beat={el.beat} key={el.id} id={el.id} newRowAdded={highestNoteID}>
                  <Note
                    color={el.value}
                    isCorrect={el.isCorrect}
                    inputColor={el.color}
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
        <div className="commands">
          <div className="toggle--text">HIDE</div>
          {isShowing ? (
            <ToggleOnIcon className="icon" onClick={() => setIsShowing(!isShowing)} />
          ) : (
            <ToggleOffIcon className="icon" onClick={() => setIsShowing(!isShowing)} />
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
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON5.stringify(outputData, null, 2))}`}
            download="rhythm-game-level.json"
          >
            <DownloadIcon className="download--icon" />
          </a>
          <CopyToClipboard text={JSON5.stringify(outputData, null, 0)}>
            <ContentCopyIcon className="download--icon" onClick={() => setIsCopied(true)} />
          </CopyToClipboard>
          <UploadFileIcon className="download--icon" onClick={() => handlePopup()}></UploadFileIcon>
        </div>
      </div>
      {popupActive && (
        <FileUploadContainer>
          <FileUpload>
            <CloseIcon className="close--icon" onClick={() => setPopupActive(false)}></CloseIcon>
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

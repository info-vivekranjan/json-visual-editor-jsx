import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Clipboard from 'clipboard';
import { saveAs } from 'file-saver';
import OptionMenu from './OptionMenu';
import { dataSlice } from './features/data/dataSlice';
import { ValidityType, textareaSlice } from './features/textarea/textareaSlice';

const ControlsArea = () => {
  useEffect(() => {
    // init clipboard
    new Clipboard('#copy-to-clipboard');
  }, []);

  const downloadJson = (text) => {
    var blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'data.json');
  };

  const dispatch = useDispatch();
  const { setData } = dataSlice.actions;
  const { setLocalText } = textareaSlice.actions;

  const text = useSelector((state) => state.textarea.localText);
  const isEmpty = useMemo(() => text.length === 0, [text.length]);
  const isValid = useSelector(
    (state) => state.textarea.validity === ValidityType.Valid
  );

  const onDeleteButtonClicked = useCallback(() => {
    dispatch(setData(null));
    dispatch(setLocalText(''));
  }, [dispatch, setData, setLocalText]);

  return (
    <nav className="navbar px-1 py-0" style={{ overflow: 'visible' }}>
      <ul className="nav">
        <li className="nav-item">
          <button
            id="copy-to-clipboard"
            data-clipboard-target="#json-text"
            disabled={!isValid}
            className="btn btn-link"
            title="Copy"
          >
            <i className="far fa-copy" />
          </button>
        </li>
        <li className="nav-item">
          <button
            id="donwload"
            disabled={!isValid}
            className="btn btn-link"
            onClick={() => downloadJson(text)}
            title="Download"
          >
            <i className="fas fa-file-download" />
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link"
            disabled={isEmpty}
            onClick={onDeleteButtonClicked}
            title="Clear"
          >
            <i className="far fa-trash-alt" />
          </button>
        </li>
        <li className="dropdown nav-item">
          <button
            className="btn btn-link"
            title="More"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            id="dropdownMenuButton"
          >
            <i className="fas fa-ellipsis-v" />
          </button>
          <OptionMenu ariaLabelledby="dropdownMenuButton" />
        </li>
      </ul>
      <ul className="nav justify-content-end">
        <li className="control-count nav-item">
          <span
            className={`text-count ${
              text.length > 0 && !isValid ? 'invalid' : ''
            }`}
          >
            {text.length}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default ControlsArea;

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import { Path, EditType } from '../types';
import { dataSlice } from '../features/data/dataSlice';
import { isString, isNumber } from '../utils/is';

export const EditButtons = ({
  data,
  path,
  hidden = false,
}) => {
  const onCopyButtonClicked = useCallback((event) => {
    if (navigator.clipboard) {
      const value = event.currentTarget.getAttribute('data-value') || '';
      navigator.clipboard.writeText(`${value}`);
    }
  }, []);

  const dispatch = useDispatch();
  const { deletePath, setEditMode } = dataSlice.actions;

  const onDeleteButtonClicked = useCallback(() => {
    dispatch(deletePath(path));
  }, [path, dispatch, deletePath]);

  const onEditButtonClicked = useCallback(() => {
    dispatch(setEditMode({ path }));
  }, [dispatch, path, setEditMode]);

  return (
    <div
      className={`edit-buttons d-flex flex-row align-items-start ${
        hidden ? 'hidden' : ''
      }`}
    >
      <button
        title="Edit the value"
        data-value={data}
        className="btn btn-sm btn-link ml-1 edit-button"
        onClick={onEditButtonClicked}
      >
        <i className="far fa-edit" />
      </button>
      {navigator.clipboard && (isString(data) || isNumber(data)) && (
        <button
          title="Copy text"
          data-value={data}
          className="btn btn-sm btn-link ml-1 copy-button"
          onClick={onCopyButtonClicked}
        >
          <i className="far fa-copy" />
        </button>
      )}
      <button
        className="btn btn-sm btn-link ml-1 delete-button"
        onClick={onDeleteButtonClicked}
      >
        <i className="far fa-trash-alt" />
      </button>
    </div>
  );
};

import React, { useMemo, useCallback, useEffect } from 'react';
import TextArea from './TextArea';
import VisualizedData from './VisualizedData/VisualizedData';
import { Header } from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { textareaSlice } from './features/textarea/textareaSlice';

const minFrameWidth = 100;

export const Page = () => {
  const isDragging = useSelector(
    (state) => state.textarea.isDragging
  );
  const width = useSelector((state) => state.textarea.width);

  const { setWidth, setDragging } = textareaSlice.actions;
  const dispatch = useDispatch();

  const onMouseDown = useCallback(() => {
    dispatch(setDragging(true));
  }, [setDragging, dispatch]);
  const onMouseUpOrLeave = useCallback(() => {
    dispatch(setDragging(false));
  }, [setDragging, dispatch]);
  const onMouseMove = useCallback(
    (event) => {
      if (isDragging) {
        const newWidth = event.clientX;
        if (newWidth > minFrameWidth) {
          dispatch(setWidth(newWidth));
        }
      }
    },
    [isDragging, setWidth, dispatch]
  );

  const leadingStyle = useMemo(() => {
    return {
      width: width,
    };
  }, [width]);

  useEffect(() => {
    if (window.innerWidth < 576) {
      dispatch(setWidth(window.innerWidth));
    }
  }, [dispatch, setWidth]);

  return (
    <>
      <Header />
      <main
        className="d-flex flex-sm-row flex-column flex-grow-1 h-100"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
      >
        <div
          className="leading-side d-flex flex-column p-2"
          style={leadingStyle}
        >
          <TextArea />
        </div>
        <div
          className="adjuster d-flex justify-content-center align-items-center"
          onMouseDown={onMouseDown}
        >
          <i className="fas fa-ellipsis-v" />
        </div>
        <div className="trailing-side d-flex flex-column flex-grow-1 pr-2 pl-1">
          <div className="flex-grow-1">
            <div className="scroll-wrapper">
              <VisualizedData />
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

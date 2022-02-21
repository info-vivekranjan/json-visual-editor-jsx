import { createSlice } from '@reduxjs/toolkit';

export const ValidityType = {
  Valid : 'valid',
  Invalid : 'invalid',
  None : 'none',
}

const InitialFrameWidth = 400;

const initialState = {
  isTextareaClose: false,
  localText: '',
  validity: ValidityType.None,
  width: InitialFrameWidth,
  isDragging: false,
};

export const textareaSlice = createSlice({
  name: 'textarea',
  initialState,
  reducers: {
    toggleTextarea: (state) => {
      state.isTextareaClose = !state.isTextareaClose;
    },
    setLocalText: (state, action) => {
      const text = action.payload;
      state.localText = text;
      if (text.length > 0) {
        try {
          JSON.parse(action.payload);
          state.validity = ValidityType.Valid;
        } catch (e) {
          state.validity = ValidityType.Invalid;
        }
      } else {
        state.validity = ValidityType.None;
      }
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
  },
});

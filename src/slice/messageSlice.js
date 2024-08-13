import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    createMessage(state, action) {
      if (action.payload.success) {
        state.push({
          id: action.payload.id,
          type: "success",
          title: "成功",
          text: action.payload.message,
        });
      } else {
        state.push({
          id: action.payload.id,
          type: "danger",
          title: "錯誤",
          text: Array.isArray(action.payload?.message)
            ? action.payload?.message.join("、")
            : action.payload?.message,
        });
      }
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

// 非同步函式： createAsyncThunk 可以加入兩個參數 createAsyncThunk(自定義名稱、async function)
export const createAsyncMessage = createAsyncThunk(
  "message/createAsyncMessage",
  async function (payload, { dispatch, requestId }) {
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      })
    );

    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 3000);
  }
);

export const { createMessage } = messageSlice.actions;

export default messageSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    createMessage(state, action) {
      state.push({
        id: action.payload.id,
        type: action.payload.success ? "success" : "danger",
        title: action.payload.success ? "成功" : "錯誤",
        text: Array.isArray(action.payload.message)
          ? action.payload.message.join("、")
          : action.payload.message,
        isExiting: false, // 新增isExiting狀態
      });
    },
    startExitMessage(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state[index].isExiting = true; // 開始退出動畫
      }
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
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
      handleRemoveMessage(dispatch, requestId);
    }, 3000);
  }
);

const handleRemoveMessage = (dispatch, requestId) => {
  dispatch(messageSlice.actions.startExitMessage(requestId));

  setTimeout(() => {
    dispatch(messageSlice.actions.removeMessage(requestId));
  }, 700);
};

export const { createMessage } = messageSlice.actions;

export default messageSlice.reducer;

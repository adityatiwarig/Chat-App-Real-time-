import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    messages: [],
    isAuthLoading: true,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      const newMessage = action.payload;

      if (!state.authUser?._id || !state.selectedUser?._id) return;

      const authId = state.authUser._id.toString();
      const selectedId = state.selectedUser._id.toString();
      const senderId = newMessage?.senderId?.toString();
      const receiverId = newMessage?.receiverId?.toString();

      const belongsToCurrentChat =
        (senderId === selectedId && receiverId === authId) ||
        (senderId === authId && receiverId === selectedId);

      if (!belongsToCurrentChat) return;

      const alreadyExists = state.messages.some(
        (message) => message._id === newMessage._id
      );

      if (!alreadyExists) {
        state.messages.push(newMessage);
      }
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    clearChatState: (state) => {
      state.otherUsers = null;
      state.selectedUser = null;
      state.messages = [];
      state.onlineUsers = [];
    },
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
  setMessages,
  addMessage,
  setAuthLoading,
  setOnlineUsers,
  clearChatState,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const normalizeId = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value._id) return normalizeId(value._id);
  if (typeof value.toString === "function") return value.toString();
  return "";
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    messages: [],
    isAuthLoading: true,
    onlineUsers: [],
    unreadCounts: {},
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },

    updateUserLastSeen: (state, action) => {
      const { userId, lastSeen } = action.payload || {};
      const normalizedUserId = normalizeId(userId);
      if (!normalizedUserId || !lastSeen) return;

      if (state.otherUsers?.length) {
        state.otherUsers = state.otherUsers.map((user) => {
          const currentId = normalizeId(user?._id);
          if (currentId !== normalizedUserId) return user;
          return { ...user, lastSeen };
        });
      }

      const selectedId = normalizeId(state.selectedUser?._id);
      if (selectedId === normalizedUserId && state.selectedUser) {
        state.selectedUser = { ...state.selectedUser, lastSeen };
      }
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;

      const userId = normalizeId(action.payload?._id);
      if (userId && state.unreadCounts[userId]) {
        delete state.unreadCounts[userId];
      }
    },

    clearUnreadByUserId: (state, action) => {
      const userId = normalizeId(action.payload);
      if (userId && state.unreadCounts[userId]) {
        delete state.unreadCounts[userId];
      }
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      const newMessage = action.payload;

      if (!state.authUser?._id) return;

      const authId = normalizeId(state.authUser._id);
      const selectedId = normalizeId(state.selectedUser?._id);
      const senderId = normalizeId(newMessage?.senderId);
      const receiverId = normalizeId(newMessage?.receiverId);

      const belongsToCurrentChat =
        !!selectedId &&
        ((senderId === selectedId && receiverId === authId) ||
          (senderId === authId && receiverId === selectedId));

      if (belongsToCurrentChat) {
        const alreadyExists = state.messages.some(
          (message) => normalizeId(message._id) === normalizeId(newMessage._id)
        );

        if (!alreadyExists) {
          state.messages.push(newMessage);
        }
      }

      const isIncomingMessage = receiverId === authId && senderId !== authId;
      if (isIncomingMessage && senderId && senderId !== selectedId) {
        state.unreadCounts[senderId] = (state.unreadCounts[senderId] || 0) + 1;
      }
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = (action.payload || []).map((id) => normalizeId(id));
    },

    clearChatState: (state) => {
      state.otherUsers = null;
      state.selectedUser = null;
      state.messages = [];
      state.onlineUsers = [];
      state.unreadCounts = {};
    },
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  updateUserLastSeen,
  setSelectedUser,
  clearUnreadByUserId,
  setMessages,
  addMessage,
  setAuthLoading,
  setOnlineUsers,
  clearChatState,
} = userSlice.actions;

export default userSlice.reducer;

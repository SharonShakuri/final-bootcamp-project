import { configureStore, createSlice } from "@reduxjs/toolkit";
import userIcon from "../../public/img/profilpic.jpg";

const initialState = {
  token: "",
  fullName: "",
  userType: "",
  showAuth: false,
  isDarkMode: false,
  profileImage: localStorage.getItem("ProfileImage") || userIcon,
  searchTerm: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setShowAuth: (state, action) => {
      state.showAuth = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
      localStorage.setItem("ProfileImage", action.payload);
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setProfileImage,
  setUserType,
  setIsDarkMode,
  setToken,
  setFullName,
  setShowAuth,
  setSearchTerm,
} = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;

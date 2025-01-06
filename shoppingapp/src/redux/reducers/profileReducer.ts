/*
addProfile - đăng nhập vào lấy lưu vào data
*/

import {createSlice} from '@reduxjs/toolkit';
import {HandleAPI} from '../../api/handleAPI';

const initialState: any = {
  data: {
    favourites: [],
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.data = action.payload;
    },
    updateFavourites: (state, action) => {
      state.data.favourites = action.payload;
    },
  },
});

export const profileReducer = profileSlice.reducer;

export const {addProfile, updateFavourites} = profileSlice.actions;

export const profileSelector = (state: any) => state.profileReducer.data;

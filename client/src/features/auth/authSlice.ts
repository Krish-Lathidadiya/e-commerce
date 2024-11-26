import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: null;
}
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  // extraReducers:(builder)=>{
  //     builder
  //     .addCase(,(state,action)=>{

  //     })
  // }
});

export default authSlice.reducer;

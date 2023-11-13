import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  userId: localStorage.getItem('userId'),
};

const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    // logIn(state, action) {
    //   console.log("login action");
    //   state.isLogged = true;
    // },
    // logOut(state, action) {
    //   state.isLogged = false;
    // },
    // setAccount(state, action) {
    //   console.log(action.payload);
    //   state.account = action.payload;
    // },
    // unsetAccount(state, action) {
    //   console.log(action.payload);
    //   state.account = action.payload;
    // },
    // addPoint(state, action) {
    //   state.account.points += 1;
    // },
    setUserId(state, action: PayloadAction<string>) {
      console.log("action", action.payload);
      state.userId = action.payload;
      console.log('state',state.userId);
    },
  },
});

//export const { logIn, logOut, setAccount, unsetAccount, addPoint, setUserId } =
export const { setUserId } = loggedSlice.actions;

export default loggedSlice.reducer;

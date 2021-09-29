import { createSlice } from '@reduxjs/toolkit'


export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    busy: false,
    error: {
      status : null,
      message : null
    }
  },
  reducers: {
    
      // Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate  
      // the state because it uses the Immer library, which detects changes to a "draft state" 
      // and produces a brand new immutable state based off those changes
      // If not using "Redux Toolkit" createSlice(), you should return using a spread. ex : return {...state, user : action.payload}
    setData: (state, action) => { // == 'login/setData'
      // return {...state, user : action.payload}
      state.user = action.payload;
      state.busy = false;
      state.error = { status : null, message : null };
    },
    setBusy: (state, action) => { // == 'login/setBusy'
      // return {...state, busy : action.payload}
      state.busy = action.payload;
    },
    setError: (state, action) => { // == 'login/setError'
      // return {...state, error : action.payload}
      state.error.status = action.payload.status;
      state.error.message = action.payload.message;
      state.busy = false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // using createAsyncThunk, you can have status pending, fulfilled or rejected and you will have the 3 attached actions
    // ex : users/fetchUserByName/pending, users/fetchUserByName/fulfilled and users/fetchUserByName/rejected
/* 
  //REMOVED ==> this is painful to write this way if you have many actions...I will use a middleware instead  (see Store.js)   
    builder
    .addCase(fetchUserByName.fulfilled, (state, action) => {
      state.busy = false;
      state.user = action.payload;
      state.error = null;
      }).addCase(fetchUserByName.rejected, (state, action) => {
          const { username } = action.meta
          state.busy = false;
          state.error = "Error on getting user '" + username + "' with error : " + action.error;
      }).addCase(fetchUserByName.pending, (state, action) => {
        if (!state.busy) {
          state.busy = true;
          state.error = null;
        }
      })
    .addCase(createUser.fulfilled, (state, action) => {
      state.busy = false;
      state.user = action.payload;
      state.error = null;
      }).addCase(createUser.rejected, (state, action) => {
          const { username } = action.meta
          state.busy = false;
          state.error = "Error on creating user '" + username + "' with error : " + action.error;
      }).addCase(createUser.pending, (state, action) => {
        if (!state.busy) {
          state.busy = true;
          state.error = null;
        }
      });
*/
  }
})

// We extract the 'actions' and the 'reducer' part from Slice above
const { actions, reducer } = loginSlice
// We export each action from slice separately
export const { setData, setBusy, setError } = actions
// We export the reducer from slice as default
export default reducer

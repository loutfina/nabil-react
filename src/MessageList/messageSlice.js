import { createSlice } from '@reduxjs/toolkit'


export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    busy: false,
    error: {
      status : null,
      message : null
    }
  },
  reducers: {
    setData: (state, action) => { // == 'message/setData'
      console.log();
      if (Array.isArray(action.payload) ){
        if (action.payload.length>0){
          let overlapIndex = state.messages.findIndex(m=> m.id==action.payload[0].id)
          state.messages.splice(overlapIndex)
          state.messages = state.messages.concat(action.payload);
        }
      } else {
        state.messages.push(action.payload);
      }
      state.busy = false;
      state.error = { status : null, message : null };
    },
    setBusy: (state, action) => { // == 'message/setBusy'
      state.busy = action.payload;
    },
    setError: (state, action) => { // == 'message/setError'
      state.error.status = action.payload.status;
      state.error.message = action.payload.message;
      state.busy = false;
    }
  },
})

// We extract the 'actions' and the 'reducer' part from Slice above
export const { setData, setBusy, setError } = messageSlice.actions
export default messageSlice.reducer

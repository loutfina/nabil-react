import { createAction } from '@reduxjs/toolkit'

const ACTION = {
  fetchUserByName: 'login/fetchUserByName',
  createUser: 'login/createUser',
}

// thunk middleware give access to
//      - args : a single value, containing the first parameter that was passed to the thunk action creator when it was dispatched. 
//      - thunkAPI = {dispatch, getState, extra, requestId, signal, rejectWithValue, fulfillWithValue}
// see more here : https://redux-toolkit.js.org/api/createAsyncThunk
//
//createAsyncThunk accepts two arguments:
// 1 -A string that will be used as the prefix for the generated action types
// 2 -A "payload creator" callback function that should return a Promise containing some data, or a rejected Promise with an error
/*  // ==> has be replaced by action with http and middleware 
const fetchUserByName = createAsyncThunk( ACTION.fetchUserByName,
  async (firstArgs, thunkAPI) => {
    const { user, busy, error } = thunkAPI.getState().login;
    console.log("username" , username);
    if (busy) {
      return
    }
    const response = await apiService.get('get-user', {username : requestedName}) //notice the difference username<>userName
    return response;
  }
)
*/

/*  //Another solution is to write everything in a custom function catch by Thunk middleware and manage yourself the state
const fetchUserByName = () => {
    return async (dispatch, getState) => {
        const fetchData = async () => {
            const { user, busy, error} = getState();
            if (!busy){
              dispatch(setBusy(true));
              return apiService.get('get-user', {username : requestedName}).then((data) => {
                  if (data) {
                      dispatch(setData(data.records));
                      dispatch(setError({ status : null, message : null }));
                  }
              }).catch(err => {
                  dispatch(setError({ status : err.status.code, message : err.message }));
              }).finally(()=> {
                dispatch(setBusy(false));
              });
            }
        }
        await fetchData();
    }
}
*/
const fetchUserByName = createAction(ACTION.fetchUserByName, function prepare(username) {
  return {
    payload: {
      http: {
        endpoint: 'get-user',
        method: 'get',
        query: { username }
      }
    }
  }
})

/*  // ==> has be replaced by action with http and middleware 
const createUser = createAsyncThunk(
    ACTION.createUser,
  async (requestedName, { getState, username}) => {
    const { user, busy, error } = getState().login;
    if (busy) {
      return
    }
    const response = await apiService.apiService.post('create-user', "",{name : requestedName}) 
    return response;
  }
)
*/

const createUser = createAction(ACTION.createUser, function prepare(name) {
  return {
    payload: {
      http: {
        endpoint: 'create-user',
        method: 'post',
        body: { name }
      }
    }
  }
})


export { fetchUserByName, createUser }
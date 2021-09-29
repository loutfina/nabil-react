import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Login/loginSlice'
import messageSlice from './MessageList/messageSlice'

import apiService from './ApiService';

//// custom middleware to manage status and error message in each Slice ////
// I impose to set a value "busy" and "error" in each initial state of each slice and action setData, setError, setBusy
// I think that this will avoid to writ thousand of line to handle pending/reject/fullfiled thunk state
// this middleware is trigger if "http" (as {endpoint, method, query, body, config, useCache, overridable, stateTarget}) value exist in the action 
// This is a solution madeIn Nabil out of the box of @reduxjs/toolkit (maybe not the best)
const httpNabilMiddleware = (store) => (next) => async (action) => {
  //console.log("httpNabilMiddleware log ",action)
  if (action.payload?.http) {
    const slice = action.type.substr(0, action.type.indexOf("/"));
    try {
      const {endpoint, method, query, body, config, useCache, overridable, stateTarget} = action.payload.http;
      const {busy} = store.getState();
      if (!overridable && busy) { // if request is already in progress, don't send another except if it is an overridable one
        return
      }
      store.dispatch({ type : slice+"/setBusy", payload : true });
      action.result = await apiService[method](endpoint,query,body,config,useCache); 
      let payload = stateTarget ? {[stateTarget] : action.result} : action.result;   
      store.dispatch({ type : slice+"/setData", payload });
    } catch (error) {
      console.log("HTTP Middleware error :",error.response?.status, error.message, action);
      store.dispatch({ type : slice+"/setError", payload : {status: error.response?.status, message: error.message} });
      throw error.response;
    }
  } else  {
    return next(action) // return for the next middleware or execution code if not an action with HTTP object
  }
  
}


export default configureStore({
  reducer: {
      //list of reducers in your application
        login: loginSlice,
        message: messageSlice
  },
  //  @redujs/toolkit already add those middleware :  [thunk, immutableStateInvariant, serializableStateInvariant]
  //       --> "Thunk" middleware allow to dispatch a function (instead of action). This function have dispatch, getState as parameter.
  // we need to push any new one that we want (tips : use concat() or prepend() or unshift() instrad of [...spread] seems better)
  // !! Order of middleware is important !! as there are executer in order using "return next(action)"
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(httpNabilMiddleware),

// a good practice may be to add a logger middlerware here to disable log in production (better than using console.log everywhere)
})
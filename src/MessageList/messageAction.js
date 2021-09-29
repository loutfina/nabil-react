import { createAction } from '@reduxjs/toolkit'

const ACTION = {
  fetchMessageSince : 'message/fetchMessageSince',
  createMessage : 'message/createMessage',
}


const fetchMessageSince = createAction(ACTION.fetchMessageSince, function prepare(timestamp) {
    return {
      payload : {
        http: {
          endpoint: 'get-messages', 
          method: 'get', 
          query: {timestamp}
        }
      }
    }
  })


const createMessage = createAction(ACTION.createMessage, function prepare(message, userObj) {
  return {
    payload : {
      http: {
        endpoint: 'create-message', 
        method: 'post', 
        body: { texte: message, user : userObj }
      }
    }
  }
})


export  { fetchMessageSince, createMessage }
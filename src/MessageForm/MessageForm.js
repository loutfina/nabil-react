import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import ApiService from '../ApiService';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

const api = new ApiService();

function MessageForm(props) {

  const [ message, setMessage ] = useState("");


  //no magic binding in React, you need to create a onchange function :-(
  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('A message was submitted: ' + message, props.login);
    let payload = { texte: message, user : props.login };
    api.post(`create-message`, {},payload)
    .then(data => {
      props.onSubmit();
    })
  }

    return <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control as="textarea" 
              rows={3} 
              placeholder="Write your messaga here" 
              value={message} 
              onChange={handleChange}/>
          <Button type="submit" variant="outline-primary" id="button-addon2">Send Message</Button>
        </InputGroup>
    </form>

}

export default MessageForm;

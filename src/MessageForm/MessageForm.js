import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch} from 'react-redux';
import { createMessage} from '../MessageList/messageAction';

function MessageForm(props) {

  const [ message, setMessage ] = useState("");

  const user = useSelector((state) => state.login.user);  // useSelector subscribe for update on state.<sliceName>.<value>
  const dispatch = useDispatch()   // useDispatch give access to methode to push a change on state

  //no magic binding in React, you need to create a onchange function :-(
  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createMessage(message, user)); //dispatch action to Store
  }

    return <>
    { user && 
    <form onSubmit={handleSubmit}>
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
    </>

}

export default MessageForm;

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ApiService from '../ApiService';

const api = new ApiService();

function Login (props){

  const [ value, setValue ] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    setShow(false);
    creatUser();
  }

  //no magic binding in React, you need to create a onchange function :-(
    function handleChange(event) {
    setValue(event.target.value ? event.target.value.trim() : event.target.value);
  }

  async function handleSubmit(event) {
    console.log('Request to search a User with login ="'+value+'".');
    let user = await getUser(value)
    props.setLogin(user);
    event.preventDefault();
  }

  function getUser(userName){
    api.get('get-user', {username : userName}).then(user => {
      props.setLogin(user);
    }).catch(error => {
      if (error.status > 204 )
        alert("Error on getting users from API");
      else 
        handleShow();       
    });
  }

  function creatUser(){
    api.post('create-user', "",{name : value})
    .catch(error => {
      alert("Error on creating user name "+value);
    }).then(user => {
      props.setLogin(user);
      alert("You new user "+value+" has been created.\n You can send messages now.");
    });
  }

    return <>
    <Form onSubmit={handleSubmit} inline>
            <Form.Control type="text" placeholder="Your nickname" size="sm" value={value} onChange={handleChange} />
            <Button type="submit" size="sm">Connect</Button>
    </Form>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you a new user ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>No user <b>{value}</b> has been found.<br />Could you confirm your are a new user to create it now ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Annule</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
</>
}

export default Login;

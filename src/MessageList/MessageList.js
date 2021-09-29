import React, { useState, useEffect, useCallback } from 'react';
import './MessageList.css';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessageSince } from './messageAction';

const themeCard = "Light"; //Primary',  'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',
var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const themeTeams = true
var optionsTeams = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',  };

function MessageList(props) {

  const data = useSelector((state) => state.message.messages);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch()   // useDispatch give access to methode to push a change on state

  const initTimestamp = Date.now() - 100000000;
  var timestamp = { prevTimestamp: initTimestamp, current: initTimestamp };

  const refreshTimestamp = useCallback((timestamp) => {
    if (timestamp.prevTimestamp !== timestamp.current) //no refresh
      timestamp.prevTimestamp = timestamp.current;
    timestamp.current = Date.now();
    dispatch(fetchMessageSince(timestamp.prevTimestamp));    // <== add the dispatch
  }, []);

  //change every Xtime the timestamp to trigger the refresh
  useEffect(() => {
    refreshTimestamp(timestamp); // first execution without delay
    const autoRefreshInterval = 10 * 1000; //set to 10second
    const loopRefresh = setInterval(() => { refreshTimestamp(timestamp); }, autoRefreshInterval);
    return () => {
      clearInterval(loopRefresh); //on rerender stop it as a new one will be restarted after rerender
    };
  }, [refreshTimestamp])

  useEffect(() => {
    let divMsg = document.getElementById("messages");
    divMsg.scrollTop = divMsg.scrollHeight;
  }, [data]);

  function isSameMessage(val, index){
    return ((index!=0) && ( (val.user?.id == data[index-1].user?.id) && (new Date(val.creationDate)-new Date(data[index-1].creationDate) <300000)))
  }

  function isMe(val){
    return (val.user && user && val.user.id==user.id)
  }

  return <Card bg={themeCard.toLowerCase()} className="m-2" style={{ height: "80VH" }}>
    <Card.Header className=" p-1">Messages</Card.Header>
    <Card.Body id="messages" className=" p-1 overflow-auto">
      {data.map((val, index) => {
        return (
          <>
            {themeTeams ?
            <div className={ isMe(val) ? "my-message":""}>
              <Toast >
                { !isSameMessage(val, index) &&
                <Toast.Header closeButton={false}>
                  <Badge pill variant="primary" className="mr-2"><b>{val.user?.name?.slice(0, 1)?.toUpperCase()}</b></Badge>
                  {!isMe(val) && <strong className="mr-auto">{val.user?.name}</strong> }
                  <small className="ml-4">{new Intl.DateTimeFormat("fr-FR", optionsTeams).format(new Date(val.creationDate))}</small>
                </Toast.Header>
                }
                <Toast.Body>{val.texte}</Toast.Body>
              </Toast>
              </div>
              :
              <Container fluid key={index}>
                <Row>
                  <Col md="auto"><b>{val.user?.name} :</b></Col>
                  <Col className="text-left">{val.texte}</Col>
                  <Col xs lg="2">{new Intl.DateTimeFormat("fr-FR", options).format(new Date(val.creationDate))}
                  </Col>
                </Row>
              </Container>
            }
          </>
        );
      })}
    </Card.Body>
  </Card>

}

export default MessageList;

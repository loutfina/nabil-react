import React, {useState, useEffect, useCallback} from 'react';
import ApiService from '../ApiService';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const themeCard = "Light"; //Primary',  'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',
var options = { year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric' };

const api = new ApiService();

function MessageList(props) {
  const [ data, setData ] = useState([]);
  
  const getMessages = useCallback ((timestamp, data) => {
    api.get(`get-messages`, {timestamp})
    .then(newData => {
        console.log("#####get-messages ",newData?.length," messages since ",timestamp, (new Date(timestamp)).toLocaleString());
	    if (newData){
			setData(data.concat(newData));
			//Let scroll down the DIV to show the lastest messages
			let divMsg = document.getElementById("messages");
			divMsg.scrollTop = divMsg.scrollHeight;
		}
    })
  },[]);

  //= Trig on evry change on props.timestamp
  useEffect(() => {
    getMessages(props.timestamp, data);
  },[props.timestamp, getMessages]);

    return <Card bg={themeCard.toLowerCase()} className="m-2" style={{height: "80VH"}}>
      <Card.Header className=" p-1">Messages</Card.Header>
      <Card.Body id="messages" className=" p-1 overflow-auto">
              {data.map(( val, index ) => {
                return (
                  <Container fluid key={index}>
                  <Row>
                    <Col md="auto"><b>{val.user?.name} :</b></Col>
                    <Col className="text-left">{val.texte}</Col>
                    <Col xs lg="2">{new Intl.DateTimeFormat("fr-FR", options).format(new Date(val.creationDate))}
                    </Col>
                  </Row>
                </Container>
                );
              })}
      </Card.Body>
    </Card>

}

export default MessageList;

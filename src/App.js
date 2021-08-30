import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';
import { useState, useEffect, useCallback } from 'react';

function App() {

  const initTimestamep = Date.now()-100000000;

  const [login, setLogin] = useState(null);
  const [timestamp, setTimestamp] = useState({ prevTimestamp : initTimestamep, current : Date.now()});

  const refreshTimestamp = useCallback (() => {
    let newTimestamp = {...timestamp};
    if (newTimestamp.prevTimestamp !== newTimestamp.current) //no refresh
      newTimestamp.prevTimestamp = newTimestamp.current;
    newTimestamp.current = Date.now();
    setTimestamp(newTimestamp);
  },[timestamp]);

  //change every Xtime the timestamp to trigger the refresh
  useEffect(() => {
    console.log("useEffect setInterval ");
    const autoRefreshInterval = 10 *1000; //set to 30second
    const loopRefresh = setInterval(()=>{ refreshTimestamp(); },autoRefreshInterval);
    return () => {
      clearInterval(loopRefresh);
    };
  },[refreshTimestamp])

  const onSubmit = () => {
    refreshTimestamp();
    console.log("onSubmit: Refresh the list of message", timestamp);
  }

  return (
    <div className="App p-2">  
        <MessageList timestamp={timestamp.prevTimestamp}/>
        <Login setLogin={setLogin}/>
        {login && <MessageForm login={login} onSubmit={onSubmit}/>}
    </div>
  );
}

export default App;

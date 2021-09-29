import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import MessageList from './MessageList/MessageList';
import MessageForm from './MessageForm/MessageForm';

function App() {
  return (
    <div className="App p-2">  
        <MessageList />
        <Login />
        <MessageForm />
    </div>
  );
}

export default App;

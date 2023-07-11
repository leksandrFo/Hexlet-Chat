import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import Modals from './modals/Modals.jsx';

const ChatPage = () => (
  <div className="d-flex flex-column h-100">
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <Modals />
      </div>
    </div>
  </div>
);

export default ChatPage;

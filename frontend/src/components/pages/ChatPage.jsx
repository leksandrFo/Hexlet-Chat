import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Modals from '../Modals/Modals.jsx';

const ChatPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
      <Modals />
    </div>
  </div>
);

export default ChatPage;

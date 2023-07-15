import cn from 'classnames';
import { useAuth } from '../../hooks/index.jsx';

const Message = ({ message }) => {
  const { id, username, body } = message;
  const auth = useAuth();
  const name = auth.userName;

  const messageClass = cn('message text-break mb-2', {
    received: username !== name,
    sent: username === name,
  });

  return (
    <div key={id} className={messageClass}>
      <div className="message-content d-flex flex-row gap-1">
        <span className="message-arrow" />
        <div className="flex-shrink-0">
          <b>{`${username}:`}</b>
        </div>
        {body}
      </div>
    </div>
  );
};

export default Message;

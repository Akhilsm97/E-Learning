import React from 'react';
import { Link,  useParams } from 'react-router-dom';

const Message = ({ message }) => {

  const { username } = useParams();

  console.log('Username', username);

  return (
    <div className="container-fluid">
      <p className="success-message" style={{ padding: 180, fontSize: 25, marginLeft: 200, fontWeight: 'bold' }}>
        Payment Successful. You will receive a notification soon. <Link to={`/`} state={{ username }}>Back</Link>
      </p>
    </div>
  );
};

export default Message;

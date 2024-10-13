

const MessagesList = ({ messages = [] }) => {
  return (
    <div className="list-group overflow-auto" style={{ height: '70vh' }}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="list-group-item">
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))
      ) : (
        <div className="list-group-item">No messages available</div>
      )}
    </div>
  );
};

export default MessagesList;


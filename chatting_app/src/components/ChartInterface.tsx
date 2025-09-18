import "./ChartInterface.css";

interface Chat {
  id: number;
  fromUser: number;
  toUser: number;
  message: string;
  image?: null | string;
  timestamp: number;
}

type ListItem = Chat;

interface Props {
  items: ListItem[];
  heading: string;
  selectedUser: number | null;
}

const currentUser = 5;

const ChartInterface = ({ items, heading, selectedUser }: Props) => {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="header">{heading}</div>
      <div className="messageContainer">
        {items
          .filter(
            (chat) =>
              (chat.fromUser === currentUser && chat.toUser === selectedUser) ||
              (chat.toUser === currentUser && chat.fromUser === selectedUser)
          )
          .map((chat) => (
            <div
              key={chat.id}
              className={`messageBubble ${
                chat.fromUser === currentUser ? "fromMe" : "fromOther"
              }`}
            >
              <div className="messageText">{chat.message}</div>
              {chat.image && (
                <img
                  src={chat.image}
                  alt="chat attachment"
                  className="messageImage"
                />
              )}
              <div className="messageTime">
                {new Date(chat.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
      </div>
      <div className="textBox">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChartInterface;

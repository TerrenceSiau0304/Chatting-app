import "./ChartInterface.css";
import { useState } from "react";
import { sendChats, Chat } from "../api/Chats";

type ListItem = Chat;

interface Props {
  items: ListItem[];
  heading: string;
  selectedUser: number | null;
  onSelectInfo: (item: number) => void;
}

const currentUser = 5;

const ChartInterface = ({
  items,
  heading,
  selectedUser,
  onSelectInfo,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      const newMessage = await sendChats(currentUser, selectedUser, message);
      setMessage("");
    } catch (err) {
      console.error("Failed to send chat", err);
      setMessage("");
    }
  };

  return (
    <div className="chat-interface">
      <div
        className="header"
        onClick={() => {
          if (selectedUser !== null) {
            onSelectInfo(selectedUser);
          }
        }}
      >
        {heading}
      </div>
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
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChartInterface;

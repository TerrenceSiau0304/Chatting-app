import "./ChartInterface.css";
import { useState } from "react";
import { sendChats, Chat } from "../api/Chats";

type ListItem = Chat;

interface Props {
  items: ListItem[];
  heading: string;
  selectedUser: number | null;
  onSelectInfo: (item: number) => void;
  searchTerm: string;
}

const currentUser = 5;

const ChartInterface = ({
  items,
  heading,
  selectedUser,
  onSelectInfo,
  searchTerm,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      await sendChats(currentUser, selectedUser, message);
      setMessage("");
    } catch (err) {
      console.error("Failed to send chat", err);
      setMessage("");
    }
  };

  // All chats between currentUser and selectedUser
  const userChats = items.filter(
    (chat) =>
      (chat.fromUser === currentUser && chat.toUser === selectedUser) ||
      (chat.toUser === currentUser && chat.fromUser === selectedUser)
  );

  // Apply search filter only if searchTerm is not empty
  const displayedChats =
    searchTerm.trim() === ""
      ? userChats
      : userChats.filter((chat) =>
          chat.message.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
        {displayedChats.map((chat) => (
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
        {displayedChats.length === 0 && (
          <p style={{ color: "#888", textAlign: "center" }}>
            No messages found
          </p>
        )}
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

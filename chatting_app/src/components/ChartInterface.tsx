import "./ChartInterface.css";

const ChartInterface = () => {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="header">Chat Header</div>
      <div className="messageContainer">Chat messages here</div>
      <div className="textBox">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChartInterface;

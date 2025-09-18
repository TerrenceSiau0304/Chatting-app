import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import SideBar from "./components/SideBar";
import ChartInterface from "./components/ChartInterface";
import "./App.css";

function App() {
  let items = ["New York", "Texas", "Mlys", "Tokyo", "Paris"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideBar />

      {/* Middle column */}
      <div className="contact">
        {/* Users */}
        <ListGroup
          items={items}
          heading="Friends"
          onSelectItem={handleSelectItem}
        ></ListGroup>

        {/* Groups */}
        <ListGroup
          items={items}
          heading="Groups"
          onSelectItem={handleSelectItem}
        ></ListGroup>
      </div>

      {/* Chat Interface */}
      <ChartInterface></ChartInterface>
    </div>
  );
}

export default App;

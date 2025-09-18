import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import ListUser from "./components/ListUser";
import SideBar from "./components/SideBar";
import ChartInterface from "./components/ChartInterface";
import { fetchUsers } from "./api/Users";
import { fetchGroups } from "./api/Groups";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchGroups()
      .then(setGroups)
      .catch((err) => console.error(err));
  }, []);

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
        <ListUser
          items={users}
          heading="Users"
          onSelectItem={handleSelectItem}
        ></ListUser>

        {/* Groups */}
        <ListGroup
          items={groups}
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

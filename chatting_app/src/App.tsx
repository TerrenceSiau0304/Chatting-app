import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import ListUser from "./components/ListUser";
import SideBar from "./components/SideBar";
import ChartInterface from "./components/ChartInterface";
import { fetchUsers } from "./api/Users";
import { fetchGroups } from "./api/Groups";
import { fetchChats } from "./api/Chats";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [chatHeader, setChartHeader] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [chats, setChat] = useState([]);

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

  useEffect(() => {
    if (selectedUser) {
      fetchChats(selectedUser)
        .then(setChat)
        .catch((err) => console.error(err));
    }
  }, [selectedUser]);

  const handleSelectItem = (item: string) => {
    setChartHeader(item);
  };

  const handleSelectUser = (user: number) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-page">
      {/* Sidebar */}
      <SideBar />

      {/* Middle column */}
      <div className="contact">
        {/* Users */}
        <ListUser
          items={users}
          heading="Users"
          onSelectItem={handleSelectItem}
          onSelectUser={handleSelectUser}
        ></ListUser>

        {/* Groups */}
        <ListGroup
          items={groups}
          heading="Groups"
          onSelectItem={handleSelectItem}
        ></ListGroup>
      </div>

      {/* Chat Interface */}
      <ChartInterface
        items={chats}
        heading={chatHeader}
        selectedUser={selectedUser}
      ></ChartInterface>
    </div>
  );
}

export default App;

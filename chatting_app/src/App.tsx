import ListGroup from "./components/ListGroup";
import ListUser from "./components/ListUser";
import SideBar from "./components/SideBar";
import ChartInterface from "./components/ChartInterface";
import Profile from "./components/Profile";
import { fetchUsers, fetchUserInfo, User } from "./api/Users";
import { fetchGroups } from "./api/Groups";
import { fetchChats } from "./api/Chats";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [chatHeader, setChartHeader] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
  const [profileIndex, setProfileIdx] = useState<number | null>(null);
  const [chats, setChat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (profileIndex) {
      fetchUserInfo(profileIndex)
        .then(setSelectedProfile)
        .catch((err) => console.error(err));
    }
  }, [profileIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setSelectedProfile(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectItem = (item: string) => {
    setChartHeader(item);
  };

  const handleSelectUser = (user: number) => {
    setSelectedUser(user);
  };

  const handleSelectProfile = (user: number) => {
    setProfileIdx(user);
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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        ></ListUser>

        {/* Groups */}
        <ListGroup
          items={groups}
          heading="Groups"
          onSelectItem={handleSelectItem}
        ></ListGroup>
      </div>

      {/* Chat Interface */}
      <div className="chat-profile">
        <div className="chat-interface">
          <ChartInterface
            items={chats}
            heading={chatHeader}
            selectedUser={selectedUser}
            onSelectInfo={handleSelectProfile}
            searchTerm={searchTerm}
          />
        </div>

        {profileIndex !== null && selectedProfile && (
          <div className="profile-sidebar" ref={profileRef}>
            <Profile user={selectedProfile} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

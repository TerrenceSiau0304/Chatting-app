import { useState } from "react";
import { User } from "../api/Users";
import "./ListUser.css";

type ListItem = User;

interface Props {
  items: ListItem[];
  heading: string;
  onSelectItem: (item: string) => void;
  onSelectUser: (user: number) => void;
}

function ListUser({ items, heading, onSelectItem, onSelectUser }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      <input className="search-box" type="text" placeholder="Search"></input>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group scrollable">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item.username);
              onSelectUser(item.id);
            }}
          >
            <div className="user">
              <img src={item.profileImage} alt={item.username}></img>
              {item.username}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListUser;

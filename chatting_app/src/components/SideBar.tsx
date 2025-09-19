import {
  IoIosText,
  IoIosPerson,
  IoIosSettings,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <IoIosText>Text</IoIosText>
      <IoIosPerson>Account</IoIosPerson>
      <IoIosSettings>Settings</IoIosSettings>
      <IoIosInformationCircleOutline>FAQ</IoIosInformationCircleOutline>
    </div>
  );
};

export default SideBar;

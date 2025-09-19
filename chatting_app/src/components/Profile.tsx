import { User } from "../api/Users";
import "./Profile.css";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="profile">
      <img src={user.profileImage} alt={user.username} />
      <h2>{user.username}</h2>
      <p>{user.position}</p>
      <p>{user.address}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;

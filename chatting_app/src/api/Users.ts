export interface User {
  id: number;
  username: string;
  position: string;
  address: string;
  phone: string;
  email: string;
  profileImage: string;
}


export async function fetchUsers() {
    const res = await fetch("https://mock-test.worthycodes.com/api/chatSystem/users/list");
    if (!res.ok) throw new Error("Failed to fetch friends");
    return res.json();
}

export async function fetchUserInfo(userId: number){
    const res = await fetch(`https://mock-test.worthycodes.com/api/chatSystem/user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch information");
    return res.json();   
}
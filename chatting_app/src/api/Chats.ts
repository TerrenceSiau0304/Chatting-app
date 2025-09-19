export async function fetchChats(selectedUser: number) {
    const res = await fetch(`https://mock-test.worthycodes.com/api/chatSystem/chatByUserId/${selectedUser}`);
    if (!res.ok) throw new Error("Failed to fetch chats");
    return res.json();
}

export async function sendChats(fromUser: number, toUser: number, message: string) {
  try {
    const res = await fetch("https://mock-test.worthycodes.com/api/chatSystem/chat/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromUser, toUser, message }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send chat: ${res.status} ${res.statusText}`);
    }

    return await res.json(); 
  } catch (err) {
    console.error("Error sending chat:", err);
    throw err;
  }
}

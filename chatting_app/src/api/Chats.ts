export async function fetchChats(selectedUser: number) {
    const res = await fetch(`https://mock-test.worthycodes.com/api/chatSystem/chatByUserId/${selectedUser}`);
    if (!res.ok) throw new Error("Failed to fetch chats");
    return res.json();
}
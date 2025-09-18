export async function fetchUsers() {
    const res = await fetch("https://mock-test.worthycodes.com/api/chatSystem/users/list");
    if (!res.ok) throw new Error("Failed to fetch friends");
    return res.json();
}
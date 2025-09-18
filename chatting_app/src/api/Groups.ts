export async function fetchGroups() {
    const res = await fetch("https://mock-test.worthycodes.com/api/chatSystem/groups/list");
    if (!res.ok) throw new Error("Failed to fetch groups");
    return res.json();
}
export const getUsers = () =>
    fetch("http://localhost:3001/users").then((loadedUsers) => loadedUsers.json())

export const deleteUser = (userId) =>
    fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
    })

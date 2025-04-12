export const deleteSession = async (sessionId) =>
    fetch(`http://localhost:3001/sessions/${sessionId}`, {
        method: "DELETE",
    })

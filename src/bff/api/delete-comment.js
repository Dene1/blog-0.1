export const deleteComment = async (commentId) =>
    fetch(`http://localhost:3001/comments/${commentId}`, {
        method: "DELETE",
    })

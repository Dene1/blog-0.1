export const deletePost = (postId) =>
    fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
    })

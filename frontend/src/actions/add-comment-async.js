import {request} from "../utils/request.js"
import {addComment} from "./add-comment.js"

export const addCommentAsync = (postId, content) => (dispatch) => {
    request(`/api/posts/${postId}/comments`, "POST", {content})
        .then((comment) => {
            dispatch(addComment(comment.data))
        })
}

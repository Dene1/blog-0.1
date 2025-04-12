import {setPostData} from "./set-post-data.js"

export const removeCommentAsync = (requestServer, postId, id) => (dispatch) => {
    requestServer("removePostComment", postId, id).then((postData) => {
        dispatch(setPostData(postData.res))
    })
}

import {setPostData} from "./set-post-data.js"
import {request} from "../utils/request.js"

export const savePostAsync = (id, newPostData) => (dispatch) => {
    const saveRequest = id ?
        request(`/api/posts/${id}`, "PATCH", newPostData) :
        request("/api/posts", "POST", newPostData)


    return saveRequest.then((updatedPost) => {
        dispatch(setPostData(updatedPost.data))
        return updatedPost.data
    })
}

import {request} from "../utils/request.js"

export const removePostAsync = (id) => () =>
    request(`/api/posts/${id}`, "DELETE")

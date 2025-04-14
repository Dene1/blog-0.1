import {getComments, getPosts} from "../api"
import {getCommentsCount} from "../utils/index.js"

export const fetchPosts = async () => {
    const [posts, comments] = await Promise.all([getPosts(), getComments()])

    return {
        error: null,
        res: posts.map((post) => ({
            ...post,
            commentsCount: getCommentsCount(comments, post.id),
        })),
    }
}

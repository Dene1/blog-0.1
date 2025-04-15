import {useState} from "react"
import {Comment} from "./components"
import {Icon} from "../../../../components"
import {useDispatch, useSelector} from "react-redux"
import {selectUserId, selectUserRole} from "../../../../selectors"
import {useServerRequest} from "../../../../hooks"
import {addCommentAsync} from "../../../../actions"
import styled from "styled-components"
import {ROLE} from "../../../../constants/index.js"

const CommentsContainer = ({className, comments, postId}) => {
    const [newComment, setNewComment] = useState("")
    const userId = useSelector(selectUserId)
    const userRole = useSelector(selectUserRole)
    const dispatch = useDispatch()
    const requestServer = useServerRequest()

    const onNewCommentAdd = (userId, postId, content) => {
        dispatch(addCommentAsync(requestServer, userId, postId, content))
        setNewComment("")
    }

    const isGuest = userRole === ROLE.GUEST

    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment">
                <textarea
                    name="comment"
                    value={newComment}
                    placeholder="Комментарий..."
                    onChange={({target}) => setNewComment(target.value)}>

                </textarea>
                    <Icon id="fa-paper-plane-o" size="18px" margin="5px 0 0 10px"
                          onClick={() => onNewCommentAdd(userId, postId, newComment)}
                    />
                </div>
            )}
            <div className="comments">
                {comments.map(({id, author, content, publishedAt}) => (
                    <Comment
                        key={id}
                        postId={postId}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    )
}

export const Comments = styled(CommentsContainer)`
    width: 580px;
    margin: 0 auto;

    .new-comment {
        display: flex;
        margin: 20px 0 10px;
        width: 100%;
    }

    .new-comment textarea {
        width: 550px;
        height: 120px;
        font-size: 18px;
        resize: none;
        padding: 4px 0 0 8px;
    }
`

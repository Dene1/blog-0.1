import {useState} from "react"
import {Comment} from "./components/index.js"
import {Icon} from "../../../../components/index.js"
import {useDispatch, useSelector} from "react-redux"
import PropTypes from "prop-types"
import {selectUserRole} from "../../../../selectors/index.js"
import {addCommentAsync} from "../../../../actions/index.js"
import styled from "styled-components"
import {PROP_TYPE, ROLE} from "../../../../constants/index.js"

const CommentsContainer = ({className, comments, postId}) => {
    const [newComment, setNewComment] = useState("")
    const userRole = useSelector(selectUserRole)
    const dispatch = useDispatch()

    const onNewCommentAdd = (postId, content) => {
        dispatch(addCommentAsync(postId, content))
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
                          onClick={() => onNewCommentAdd(postId, newComment)}
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

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
    postId: PropTypes.string.isRequired,
}

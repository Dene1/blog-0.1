import {Icon, Input} from "../../../../components/index.js"
import {SpecialPanel} from "../special-panel/special-panel.jsx"
import {useLayoutEffect, useRef, useState} from "react"
import {sanitizeContent} from "./utils/index.js"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {savePostAsync} from "../../../../actions/index.js"
import {selectUserSession} from "../../../../selectors/index.js"
import styled from "styled-components"
import {PROP_TYPE} from "../../../../constants/index.js"

const Container = styled.div`
    text-align: center;
    font-size: 24px;

    a:Link {
        cursor: pointer;
        text-decoration: underline;
    }

    a:Link:hover {
        text-decoration: none;
        opacity: 0.8;
    }
`

const PostFormContainer = ({
                               className,
                               post: {
                                   id,
                                   title,
                                   imageUrl,
                                   content,
                                   publishedAt,
                               },
                           }) => {
    const session = useSelector(selectUserSession);
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
    const [titleValue, setTitleValue] = useState(title)
    const contentRef = useRef(null)

    useLayoutEffect(() => {
        setImageUrlValue(imageUrl)
        setTitleValue(title)
    }, [imageUrl, title]);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSave = () => {
        const newContent = sanitizeContent(contentRef.current.innerHTML)


        function isValidUrl(url) {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        }

        if (!isValidUrl(imageUrlValue)) {
            alert("Пожалуйста, введите валидный URL изображения.");
            return;
        }

        dispatch(savePostAsync(id,{
            imageUrl: imageUrlValue,
            title: titleValue,
            content: newContent,
        }))
            .then(({id}) => navigate(`/post/${id}`))
    }

    const onImageChange = ({target}) => setImageUrlValue(target.value)
    const onTitleChange = ({target}) => setTitleValue(target.value)

    // if (!session) {
    //     return (
    //         <Container>
    //             Вы должны войти в систему, чтобы создать или изменить пост.<br/>
    //             Пожалуйста <Link to="/login">Войдите.</Link>
    //         </Container>
    //     );
    // }

    return (
        <div className={className}>
            <Input
                value={imageUrlValue}
                placeholder="Изображение"
                onChange={onImageChange}/>
            <Input
                value={titleValue}
                placeholder="Заголовок"
                onChange={onTitleChange}/>
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                margin="20px 0"
                editButton={
                    <Icon
                        id="fa-floppy-o"
                        size="21px"
                        margin="0 10px 0 0"
                        onClick={onSave}/>
                }
            />
            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-text">
                {content}
            </div>
        </div>
    )
}

export const PostForm = styled(PostFormContainer)`
    img {
        float: left;
        margin: 0 20px 10px 0;
    }

    .post-text {
        min-height: 80px;
        border: 1px solid black;
        font-size: 18px;
        white-space: pre-line;
    }
`

PostForm.propTypes = {
    post: PROP_TYPE.POST.isRequired
}

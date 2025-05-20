import {Icon} from "../../../../components/index.js"
import PropTypes from "prop-types"
import {CLOSE_MODAL, openModal, removePostAsync} from "../../../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {checkAccess} from "../../../../utils/index.js"
import {ROLE} from "../../../../constants/index.js"
import {selectUserRole} from "../../../../selectors/index.js"
import styled from "styled-components"

const SpecialPanelContainer = ({className, id, publishedAt, editButton}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const roleId = useSelector(selectUserRole)

    const onPostRemove = (id) => {
        dispatch(openModal({
            text: "Удалить статью?",
            onConfirm: () => {
                dispatch(removePostAsync(id)).then(() => navigate("/"));
                dispatch(CLOSE_MODAL);
            },
            onCancel: () => dispatch(CLOSE_MODAL),
        }))
    }

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)

    return (
        <div className={className}>
            <div className="published-at">
                {publishedAt &&
                    <Icon inactive={true}
                          id="fa-calendar-o"
                          margin="0 7px 0 0"
                          size="18px"/>}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="buttons">
                    {editButton}
                    {publishedAt &&
                        <Icon id="fa-trash-o" size="21px" margin="0 0 0 7px"
                              onClick={() => onPostRemove(id)}/>}
                </div>
            )}
        </div>
    )
}

export const SpecialPanel = styled(SpecialPanelContainer)`
    display: flex;
    justify-content: space-between;
    margin: ${({margin}) => margin};

    .published-at {
        display: flex;
        font-size: 18px;
    }

    .buttons {
        display: flex;
    }

    i {
        position: relative;
    }
`

SpecialPanel.propTypes = {
    id: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    editButton: PropTypes.node.isRequired,
}

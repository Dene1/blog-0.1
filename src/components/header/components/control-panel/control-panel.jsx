import styled from "styled-components"
import {Icon} from "../../../index.js"
import {Link, useNavigate} from "react-router-dom"
import {ROLE} from "../../../../constants"
import {useDispatch, useSelector} from "react-redux"
import {selectUserLogin, selectUserRole, selectUserSession} from "../../../../selectors"
import {logout} from "../../../../actions"

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
`

const StyledLink = styled(Link)`
    text-align: center;
    padding: 4px 12px;
    font-size: 18px;
    border: 1px solid black;

    &:hover {
        cursor: pointer;
        background-color: #eaeaea;
    }
`

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`

const ControlPanelContainer = ({className}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    const login = useSelector(selectUserLogin)
    const session = useSelector(selectUserSession)

    const onLogout = () => {
        dispatch(logout(session))
        sessionStorage.removeItem("userData")
        navigate("/")
    }

    return (
        <div className={className}>
            {roleId === ROLE.GUEST ? (
                <StyledLink to="/login">Войти</StyledLink>
            ) : (
                <RightAligned>
                    <UserName>{login}</UserName>
                    <Icon id="fa-sign-out"
                          size="20px"
                          margin="0 0 0 10px"
                          onClick={onLogout}
                    />
                </RightAligned>
            )}
            <RightAligned>
                <Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)}/>
                <Link to="/post"><Icon id="fa-file-text-o" margin="10px 0 0 16px"/></Link>
                <Link to="/users"><Icon id="fa-users" margin="10px 0 0 16px"/></Link>
            </RightAligned>
        </div>
    )
}

export const ControlPanel = styled(ControlPanelContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

import styled from "styled-components"
import {Icon} from "../../../index.js"
import {Link, useNavigate} from "react-router-dom"
import {ROLE} from "../../../../constants/index.js"
import {useDispatch, useSelector} from "react-redux"
import {selectUserLogin, selectUserRole} from "../../../../selectors/index.js"
import {logout} from "../../../../actions/index.js"
import {checkAccess} from "../../../../utils/index.js"

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

    const onLogout = () => {
        dispatch(logout())
        sessionStorage.removeItem("userData")
        navigate("/")
    }

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)

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
                {isAdmin && (
                    <>
                        <Link to="/post"><Icon id="fa-file-text-o"
                                               margin="10px 0 0 16px"/></Link>
                        <Link to="/users"><Icon id="fa-users"
                                                margin="10px 0 0 16px"/></Link>
                    </>
                )}
            </RightAligned>
        </div>
    )
}

export const ControlPanel = styled(ControlPanelContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

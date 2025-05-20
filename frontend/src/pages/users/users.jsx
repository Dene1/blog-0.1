import {useEffect, useState} from "react"
import {PrivateContent, H2} from "../../components/index.js"
import {TableRow, UserRow} from "./components/index.js"
import {ROLE} from "../../constants/index.js"
import styled from "styled-components"
import {checkAccess} from "../../utils/index.js"
import {useSelector} from "react-redux"
import {selectUserRole} from "../../selectors/index.js"
import {request} from "../../utils/request.js"

const UsersContainer = ({className}) => {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
    const userRole = useSelector(selectUserRole)

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return
        }

        Promise.all([
            request("/api/users"),
            request("/api/users/roles"),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error)
                return
            }
            setUsers(usersRes.data)
            setRoles(rolesRes.data)

        })
    }, [shouldUpdateUserList, userRole])

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return
        }
        request(`/api/users/${userId}`, "DELETE").then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList)
        })
    }

    console.log(users)

    return (
        <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
            <div className={className}>
                <H2>Пользователи</H2>
                <div>
                    <TableRow>
                        <div className="login-column">Логин</div>
                        <div className="registered-at-column">Дата регистрации</div>
                        <div className="role-column">Роль</div>
                    </TableRow>
                    {users.map(({_id, login, createdAt: registeredAt, role}) => (
                        <UserRow key={_id}
                                 id={_id}
                                 login={login}
                                 registeredAt={registeredAt}
                                 roleId={role}
                                 roles={roles.filter(({id}) => id !== ROLE.GUEST)}
                                 onUserRemove={() => onUserRemove(_id)}
                        />
                    ))}
                </div>
            </div>
        </PrivateContent>

    )
}

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    width: 570px;
    font-size: 18px;
`

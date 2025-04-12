import {Icon} from "../../../../components"
import {TableRow} from "../table-row/table-row.jsx"
import {useState} from "react"
import {useServerRequest} from "../../../../hooks"
import styled from "styled-components"

const UserRowContainer = ({
                              className,
                              id,
                              login,
                              registeredAt,
                              roleId: userRoleId,
                              roles,
                              onUserRemove,
                          }) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId)
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
    const requestServer = useServerRequest()

    const onRoleChange = ({target}) => {
        setSelectedRoleId(target.value)
    }

    const onRoleSave = (userId, newUserRoleId) => {
        requestServer("updateUserRole", userId, newUserRoleId).then(() => {
            setInitialRoleId(newUserRoleId)
        })
    }

    const isSaveButtonDisabled = selectedRoleId === initialRoleId

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({id: roleId, name: roleName}) => (
                            <option key={roleId} value={roleId}>{roleName}</option>
                        ))}
                    </select>

                    <div className="save-role-button">
                        <Icon id="fa-floppy-o" disabled={isSaveButtonDisabled}
                              onClick={() => onRoleSave(id, selectedRoleId)}/>
                    </div>
                </div>
            </TableRow>
            <Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove}/>
        </div>
    )
}

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
    margin-top: 10px;

    select {
        padding: 0 5px;
        font-size: 16px;
    }

    .save-role-button {
        width: 20px;
        height: 30px;
        margin: 4px 0 0 10px;
        text-align: center;
    }
`

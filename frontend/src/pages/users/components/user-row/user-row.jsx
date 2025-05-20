import {Icon} from "../../../../components/index.js"
import {TableRow} from "../table-row/table-row.jsx"
import {useState} from "react"
import PropTypes from "prop-types"
import {PROP_TYPE} from "../../../../constants/index.js"
import {request} from "../../../../utils/request.js"
import styled from "styled-components"
import moment from "moment"
const UserRowContainer = ({
                              className,
                              id,
                              login,
                              registeredAt,
                              roleId,
                              roles,
                              onUserRemove,
                          }) => {
    const [initialRoleId, setInitialRoleId] = useState(roleId)
    const [selectedRoleId, setSelectedRoleId] = useState(roleId)

    const onRoleChange = ({target}) => {
        setSelectedRoleId(target.value)
    }

    const onRoleSave = (userId, newUserRoleId) => {
        request(`/api/users/${userId}`, "PATCH", {roleId: newUserRoleId})
            .then(() => setInitialRoleId(newUserRoleId))
    }

    const formattedDate = moment(registeredAt).format('DD.MM.YYYY HH:mm');
    const isSaveButtonDisabled = selectedRoleId === initialRoleId

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{formattedDate}</div>
                <div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({id: roleId, name: roleName}) => (
                            <option key={roleId} value={roleId}>{roleName}</option>
                        ))}
                    </select>

                    <div className="save-role-button">
                        <Icon
                            id="fa-floppy-o"
                            disabled={isSaveButtonDisabled}
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

UserRow.propTypes = {
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    onUserRemove: PropTypes.func.isRequired
}

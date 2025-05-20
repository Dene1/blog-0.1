import {Error} from "../error/error.jsx"
import PropTypes from "prop-types"
import {useSelector} from "react-redux"
import {selectUserRole} from "../../selectors/index.js"
import {ERROR, PROP_TYPE} from "../../constants/index.js"
import {checkAccess} from "../../utils/index.js"

export const PrivateContent = ({children, access, serverError = null}) => {
    const userRole = useSelector(selectUserRole)

    const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED
    const error = serverError || accessError

    return error ? <Error error={error}/> : children
}

PrivateContent.propTypes = {
    children: PropTypes.node.isRequired,
    access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    serverError: PROP_TYPE.ERROR,
}

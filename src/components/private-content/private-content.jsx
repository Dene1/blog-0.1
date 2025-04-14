import {Error} from "../error/error.jsx"
import {useSelector} from "react-redux"
import {selectUserRole} from "../../selectors/index.js"
import {ERROR} from "../../constants/index.js"
import {checkAccess} from "../../utils/index.js"

export const PrivateContent = ({children, access, serverError = null}) => {
    const userRole = useSelector(selectUserRole)

    const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED
    const error = serverError || accessError

    return error ? <Error error={error}/> : children
}

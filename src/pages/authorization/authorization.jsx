import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {server} from "../../bff"
import {useState} from "react"
import {AuthFormError, Button, H2, Input} from "../../components"
import {Link, Navigate} from "react-router-dom"
import {setUser} from "../../actions"
import {useDispatch, useSelector} from "react-redux"
import {selectUserRole} from "../../selectors"
import {ROLE} from "../../constants"
import {useResetForm} from "../../hooks"
import styled from "styled-components"

const authFormSchema = yup.object().shape({
    login: yup.string()
        .required("Заполните логин")
        .matches(/^\w+$/, "Неверно заполнен логин. Допускаются только латинские буквы, цифры")
        .min(3, "Неверно заполнен логин. Минимум 3 символа")
        .max(15, "Неверно заполнен логин. Максимум 15 символов"),

    password: yup.string()
        .required("Заполните пароль")
        .matches(/^[\w#%]+$/, "Неверно заполнен пароль. Допускаются только латинские буквы, цифры и знаки # %")
        .min(6, "Неверно заполнен пароль. Минимум 6 символа")
        .max(25, "Неверно заполнен пароль. Максимум 25 символов"),
})

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 20px 0;
    font-size: 18px;
`

const AuthorizationContainer = ({className}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    })

    const [serverError, setServerError] = useState(null)

    const dispatch = useDispatch()

    const roleID = useSelector(selectUserRole)

    useResetForm(reset)

    const onSubmit = ({login, password}) => {
        server.authorize(login, password).then(({error, res}) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`)
                return
            }
            dispatch(setUser(res))
            sessionStorage.setItem("userData", JSON.stringify(res))
        })
    }

    const formError = errors?.login?.message || errors?.password?.message
    const errorMessage = formError || serverError

    if (roleID !== ROLE.GUEST) {
        return <Navigate to="/"/>
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="login" placeholder="Логин..." {...register("login", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password"
                       placeholder="Пароль..." {...register("password", {
                    onChange: () => setServerError(null),
                })}/>
                <Button type="submit" disabled={!!formError}>Авторизоваться</Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    )
}

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`

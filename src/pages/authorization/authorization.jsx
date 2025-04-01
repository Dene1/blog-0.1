import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {server} from "../../bff"
import {useEffect, useState} from "react"
import styled from "styled-components"
import {Button, H2, Input} from "../../components"
import {Link, Navigate} from "react-router-dom"
import {setUser} from "../../actions"
import {useDispatch, useSelector, useStore} from "react-redux"
import {selectUserRole} from "../../selectors"
import {ROLE} from "../../constants"

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

    const StyledLink = styled(Link)`
        text-align: center;
        text-decoration: underline;
        margin: 20px 0;
        font-size: 18px;
    `

    const ErrorMessage = styled.div`
        margin: 10px 0;
        padding: 10px;
        font-size: 18px;
        background-color: #fcadad;
        text-align: center;
    `

    const [serverError, setServerError] = useState(null)

    const dispatch = useDispatch()
    const store = useStore()

    const roleID = useSelector(selectUserRole)

    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout

        return store.subscribe(() => {
            let previousWasLogout = currentWasLogout
            currentWasLogout = store.getState().app.wasLogout

            if (currentWasLogout !== previousWasLogout) {
                reset()
            }
        })
    }, [reset, store]);

    const onSubmit = ({login, password}) => {
        server.authorize(login, password).then(({error, res}) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`)
                return
            }

            dispatch(setUser(res))
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
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <StyledLink to="/register">Зарегистрироваться</StyledLink>
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

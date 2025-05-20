import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {useState} from "react"
import styled from "styled-components"
import {AuthFormError, Button, H2, Input} from "../../components/index.js"
import {Navigate} from "react-router-dom"
import {setUser} from "../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {selectUserRole} from "../../selectors/index.js"
import {ROLE} from "../../constants/index.js"
import {useResetForm} from "../../hooks/index.js"
import {request} from "../../utils/request.js"

const regFormSchema = yup.object().shape({
    login: yup.string()
        .required("Введите логин")
        .matches(/^\w+$/, "Неверно введен логин. Допускаются только латинские буквы, цифры")
        .min(3, "Неверно введен логин. Минимум 3 символа")
        .max(15, "Неверно введен логин. Максимум 15 символов"),
    password: yup.string()
        .required("Введите пароль")
        .matches(/^[\w#%]+$/, "Неверно введен пароль. Допускаются только латинские буквы, цифры и знаки # %")
        .min(6, "Неверно введен пароль. Минимум 6 символа")
        .max(25, "Неверно введен пароль. Максимум 25 символов"),
    passcheck: yup.string()
        .required("Введите пароль повторно")
        .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
})

const RegistrationContainer = ({className}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            passcheck: "",
        },
        resolver: yupResolver(regFormSchema),
    })

    const [serverError, setServerError] = useState(null)

    const dispatch = useDispatch()

    const roleID = useSelector(selectUserRole)

    useResetForm(reset)

    const onSubmit = ({login, password}) => {
        request("/api/register", "POST", {login, password})
            .then(({user, error}) => {
                if (error) {
                    setServerError(`Ошибка запроса: ${error}`)
                    return
                }
                console.log(user)
                sessionStorage.setItem("userData", JSON.stringify(user))
                dispatch(setUser(user));
            })
    }

    const formError =
        errors?.login?.message || errors?.password?.message || errors?.passcheck?.message
    const errorMessage = formError || serverError

    if (roleID !== ROLE.GUEST) {
        return <Navigate to="/"/>
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="login" placeholder="Логин..." {...register("login", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password"
                       placeholder="Пароль..." {...register("password", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password"
                       placeholder="Повторите пароль..." {...register("passcheck", {
                    onChange: () => setServerError(null),
                })}/>
                <Button type="submit" disabled={!!formError}>Зарегистрироваться</Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    )
}

export const Registration = styled(RegistrationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`

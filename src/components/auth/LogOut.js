import { Redirect } from "react-router-dom"

export const Logout = () => {
    sessionStorage.clear()

    return (
        <Redirect to="/login" />
    )
}
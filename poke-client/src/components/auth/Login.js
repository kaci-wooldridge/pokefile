import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("pokefile_user", JSON.stringify({
                        id: user.id,
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="welcome">Welcome to Pokefile!</h1>
                    <h3 className="sign-in">Please sign in</h3>
                    <fieldset className="form">
                        <label htmlFor="inputEmail"> Email </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder=""
                            required autoFocus />
                        <button className="button-80 button-85" type="submit">
                            ✓
                        </button>
                        <section className="link--register">
                            <Link to="/register" className="link">Not a member yet?</Link>
                        </section>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}
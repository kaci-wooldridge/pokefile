import { useState, useEffect } from "react"
import { Link, useNavigate  } from "react-router-dom"

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        profilePicture:"",
        aboutMe: "",
        teamId: 0
    })
    const [teams, setTeams] = useState ([])
    const [chosenTeam, setChosenTeam] = useState ('')
    let navigate = useNavigate()

    useEffect( () =>{
        fetch("http://localhost:8088/teams")
        .then(res => res.json())
        .then ((teamsArray) =>{
            setTeams(teamsArray)
        })}
    ,[])

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("pokefile_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const handleTeamChange = (event) => {
        setChosenTeam(event.target.value)
        const copy = {...user}
        copy.teamId = parseInt(event.target.value)
        setUser(copy)
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="welcome">Please Register for Pokefile!</h1>
                <fieldset className="form2">               
                    <label htmlFor="name"> Name: </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="what do you want to be called?" required autoFocus />
                    <br></br>
                    <label htmlFor="email"> Email Address: </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="email" required />
                    <br></br>
                    <label htmlFor="profilePicture"> Profile Picture: </label>
                    <input onChange={updateUser}
                        type="text" id="profilePicture" className="form-control"
                        placeholder="image address" required />
                    <br></br>
                    <label htmlFor="aboutMe"> About Me: </label>
                    <input onChange={updateUser}
                        type="text" id="aboutMe" className="form-control"
                        placeholder="this is for your profile" required />
                    <br></br>
                    <label>Team:</label>
                    <select className="form-control" value={chosenTeam} onChange={handleTeamChange}>
                    <option hidden>Choose a Team</option>
                    {teams.map((team) => (
                    <option key={team.id} value={team.id} id={team.id}>{team.name}</option>

                    ))}

                    </select>

                    <br></br>
                    <div className="register-button">
                    <button type="submit" className="button-85"> ✓ </button>
                    </div>
                
                </fieldset>
                <section className="link--register">
                            <Link to="/login" className="link">Go back to the login page</Link>
                        </section>
            </form>
        </main>
    )
}

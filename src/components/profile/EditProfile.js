import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({setEditClick}) =>{
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
    const [teams, setTeams] = useState ([])
    const [chosenTeam, setChosenTeam] = useState ('')
    let navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        profilePicture:"",
        aboutMe: "",
        teamId: 0
    })

    useEffect(() =>{
        fetch("http://localhost:8088/teams")
        .then(res => res.json())
        .then ((teamsArray) =>{
            setTeams(teamsArray)
        })}
    ,[])

    useEffect(() =>{
        fetch(`http://localhost:8088/users?id=${pokeUserObject.id}`)
            .then(res => res.json())
            .then((data) =>{
                const userObject = data[0]
                setUserInfo(userObject)
            })
    },
    [])

    const handleClick = () =>{
        setEditClick(false)
    }

    const handleClick2 = (event) =>{
        console.log(userInfo)
        event.preventDefault()
        return fetch(`http://localhost:8088/users/${userInfo.id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                    body: JSON.stringify(userInfo)
               })
                    .then(res => res.json())
                    .then(() =>{
                        setEditClick(false)
                    })
                    .then(() =>{
                        navigate(0)
                    })
    }

    const updateUser = (evt) =>{
        const copy = {...userInfo}
        copy[evt.target.id] = evt.target.value
        setUserInfo(copy)
    }

    const handleTeamChange = (event) => {
        setChosenTeam(event.target.value)
        const copy = {...userInfo}
        copy.teamId = parseInt(event.target.value)
        setUserInfo(copy)
    }

    return<>
            <div id="changeName-form2">
                <fieldset className="name-form">
                <button className="x-button" onClick={handleClick}> x </button>
                    <h3 className="edit-header">What would you like to change?</h3>   
                    <div className="babies">
                        <label htmlFor="name"> Name: </label>
                        <input onChange={(evt)=>{updateUser(evt)}}
                            type="text" id="name" className="form-control"
                            placeholder={userInfo.name} autoFocus />
                    </div>
                    <div className="babies">
                        <label htmlFor="email"> Email Address: </label>
                        <input onChange={(evt)=>{updateUser(evt)}}
                            type="email" id="email" className="form-control"
                            placeholder={userInfo.email} />
                    </div>
                    <div className="babies">
                        <label htmlFor="profilePicture"> Profile Picture: </label>
                        <input onChange={(evt)=>{updateUser(evt)}}
                            type="text" id="profilePicture" className="form-control"
                            placeholder={userInfo.profilePicture} />
                    </div>
                    <div className="babies">
                        <label htmlFor="aboutMe"> About Me: </label>
                        <input onChange={(evt)=>{updateUser(evt)}}
                            type="text" id="aboutMe" className="form-control"
                            placeholder={userInfo.aboutMe} />
                    </div>
                    <div className="babies">
                        <label>Team:</label>
                        <select className="form-control" value={chosenTeam} onChange={handleTeamChange}>
                            <option hidden>Change Team?</option>
                            {teams.map((team) => (
                            <option key={team.id} value={team.id} id={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="buttons">
                        
                        <button type="submit" className="button-85" onClick={(evt)=>{handleClick2(evt)}}> ✓ </button>
                    </div>
                </fieldset>
            </div>
    </>
}
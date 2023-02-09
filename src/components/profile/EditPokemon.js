import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const EditPokemonName = ({setChangeName, pickId, pokemonName}) =>{
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
    let navigate = useNavigate()
    const [pickInfo, setPickInfo] = useState({
        "uniqueKey": 0,
        "userId": 0,
        "pokemonId": 0,
        "pokemonNickName": "",
        "id": 0,
        "shiny": null
      })

      useEffect(() => {
        fetch(`http://localhost:8088/pokemonPicks/${pickId}`)
          .then((res) => res.json())
          .then((data) => {
            const pickObject = data[0]
            setPickInfo(pickObject)
          });
      }, []);

      const updatePick = (evt) =>{
        const copy = {...pickInfo}
        copy[evt.target.id] = evt.target.value
        setPickInfo(copy)
    }

    const handleClick = () =>{
        setChangeName(false)
    }

    const handleClick2 = (event) =>{
        console.log(pickInfo)
        event.preventDefault()
        return fetch(`http://localhost:8088/pokemonPicks/${pickId}`, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                    body: JSON.stringify(pickInfo)
               })
                    .then(res => res.json())
                    .then(() =>{
                        setChangeName(false)
                    })
                    .then(() =>{
                        navigate(0)
                    })
    }

    return<>
            <div id="changeName-form">
                <fieldset className="name-form">
                <button className="x-button" onClick={handleClick}> x </button>
                    <h3 className="edit-header">Want to change your pokemon's name?</h3>   
                    <div className="babies">
                        <label htmlFor="pokemonNickName"> Name: </label>
                        <input onChange={(evt)=>{updatePick(evt)}}
                            type="text" id="pokemonNickName" className="form-control"
                            placeholder={pokemonName} autoFocus />
                    </div>
                    <div className="buttons"> 
                        <button type="submit" className="button-85" onClick={(evt)=>{handleClick2(evt)}}> ✓ </button>
                    </div>
                </fieldset>
            </div>
    </>
}
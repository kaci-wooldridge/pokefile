import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const GiveName = ({setNameClick, pokemonName, pokemonId, shiny}) =>{
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
    const [chosenPokemon, setChosenPokemon] = useState({
        uniqueKey: 0,
        userId: 0,
        pokemonId: 0,
        pokemonNickName: "",
        shiny: null
    })
    const [newName, setNewName] = useState("")

    const yesNameClick = (evt) =>{
        setNameClick(false)
        const copy = {...chosenPokemon}
        copy.userId = parseInt(pokeUserObject.id)
        copy.pokemonId = parseInt(pokemonId)
        copy.pokemonNickName = newName
        copy.uniqueKey = new Date()-parseInt(pokemonId)
        copy.shiny = shiny
        setChosenPokemon(copy)


        return fetch("http://localhost:8088/pokemonPicks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(res => res.json())
    }



    return<>
        <div id="changeName-form3">
            <fieldset className="name-form">
                {
                    shiny
                    ?
                    <h2>!!{pokemonName} is shiny!!</h2> 
                    :
                    ""
                }
                <h3>{pokemonName} has been added to your pokedex!</h3>
                <div>
                    <label htmlFor="inputName">Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={evt => setNewName(evt.target.value)}
                        className="form-control2"
                        placeholder={pokemonName}
                        autoFocus />
                </div>
                <button className="button-80 button-85" type="submit" 
                    onClick={(evt) => {yesNameClick(evt)}}>
                    ✓
                </button>
            </fieldset>
        </div>
    </>
}
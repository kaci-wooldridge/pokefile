import { useState } from "react"

export const AddFeaturedPokemon = ({setNameClick, pokemonName, pokemonId}) =>{
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
    const [newName, setNewName] = useState("")
    const [chosenPokemon, setChosenPokemon] = useState({
        uniqueKey: 0,
        userId: 0,
        pokemonId: 0,
        pokemonNickName: "",
        shiny: null
    })

    const isShiny = () =>{
        let shiny = null
        const num = Math.floor(Math.random() * 100)
        if(num > 80){
            shiny = true
        }else{
            shiny = false
        }
        console.log(shiny)
        return shiny
    }

    const yesNameClick = (evt) =>{
        setNameClick(false)
        const shiny = isShiny()
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
        <div id="changeName-form">
            <fieldset className="name-form">
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

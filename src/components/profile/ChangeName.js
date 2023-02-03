import { useState } from "react"

export const ChangeName = ({setNameClick, pokemonName, pokemonId}) =>{
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
    const [nameOption, setNameOption] = useState(false)
    const [chosenPokemon, setChosenPokemon] = useState({
        userId: 0,
        pokemonId: 0,
        pokemonNickName: ""
    })
    const [newName, setNewName] = useState("")

    const yesNameClick = (evt) =>{
        setNameClick(false)
        const copy = {...chosenPokemon}
        copy.userId = parseInt(pokeUserObject.id)
        copy.pokemonId = parseInt(pokemonId)
        copy.pokemonNickName = newName
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
        {/* <form className="form--name" onSubmit={}> */}

            <fieldset className="name-form">
                <h3>{pokemonName} has been added to your pokedex!</h3>
                {/* <button className="button-80 button-85" type="submit" 
                    onClick={() => {setNameOption(true)}}>
                    ✓
                </button> */}
                <div>
                    <label htmlFor="inputName">Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={evt => setNewName(evt.target.value)}
                        className="form-control2"
                        placeholder={pokemonName}
                        required autoFocus />
                </div>
                <button className="button-80 button-85" type="submit" 
                    onClick={(evt) => {yesNameClick(evt)}}>
                    ✓
                </button>
                {/* <button className="button-80 button-85"
                    onClick={() => {setNameClick(false)}}>
                    x
                </button> */}
            </fieldset>
        {/* </form> */}
        </div>
    </>
}
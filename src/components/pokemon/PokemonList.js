import { useState, useEffect } from 'react'
import "./PokemonList.css"
import { useNavigate } from "react-router-dom"

export const PokemonList = () => {
    const navigate = useNavigate()
    
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
	const [pokemon, setPokemon] = useState([""])
    const [chosenPokemon, setChosenPokemon] = useState({
        userId: 0,
        pokemonId: 0
    })
        // name: pokemon.name,
        // image: pokemon.sprites['front_default'],
        // type: pokemon.types.map((type) => type.type.name).join(', '),
        // id: pokemon.id
    

    useEffect(() =>{
        const promises = [];
        for (let i = 1; i <= 150; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url)
            .then((res) => res.json()));
        }
        Promise.all(promises)
            .then((results) => {
                const pokemonList = results.map((result) => ({
                    name: result.name,
                    image: result.sprites['front_default'],
                    type: result.types.map((type) => type.type.name).join(', '),
                    id: result.id
                }));
                setPokemon(pokemonList)
            })
    }, 
    [])

    const handleClick = (evt) =>{

        const copy = {...chosenPokemon}
        copy.userId = parseInt(pokeUserObject.id)
        copy.pokemonId = parseInt(evt.target.id)
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

	// useEffect(() => {
	// 	fetch(`https://pokeapi.co/api/v2/pokemon?limit=150/`)
	// 		.then((res) => res.json())
	// 		.then((pokemonArray) => {
	// 			setPokemon(pokemonArray.results)
	// 		})
	// }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

	return (<>
		<div className='pokemon-container'>
			{pokemon.map((pokemonObj) => {
				return (  
					<div
						className='pokemon'
						key={`${pokemonObj.id}`}
					>
                        <div className='pokemon-sprite'>
                            <img src={pokemonObj.image} />
						</div>
                        <h2 className='pokemon-name'>
                            {pokemonObj.name}
						</h2>
                        <div className='pokemon-type'>
                            type: {pokemonObj.type}
                        </div>
                        <div className="add-button">
                            <button className='button-85' role="button" id={pokemonObj.id} 
                                onClick={(evt) =>{handleClick(evt); alert(`${pokemonObj.name} has been added to your pokedex!`)}}>
                                    +
                            </button>
                        </div>
					</div>
				)
			})}
		</div>
    </>
	)
}
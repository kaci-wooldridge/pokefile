import { useState, useEffect } from 'react'
import "./PokemonList.css"
import { useNavigate } from "react-router-dom"
import { ChangeName } from '../profile/ChangeName'

export const PokemonList = ({searchTermState }) => {
    const navigate = useNavigate()
    const [nameClick, setNameClick] = useState(false)
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
	const [pokemon, setPokemon] = useState([""])
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonId, setPokemonId] = useState("")
    const [filtered, setFiltered] = useState([])

    

    useEffect(() =>{
        const promises = [];
        for (let i = 1; i <= 700; i++) {
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
                setFiltered(pokemonList)
            })
    }, 
    [])

    const handleClick = (name, id) =>{
        setNameClick(true)
        setPokemonName(name)
        setPokemonId(id)
    }

    useEffect(
        () => {
            const searchedPokemon = pokemon.filter(p => 
                p?.name?.toLowerCase().includes(searchTermState.toLowerCase()))
            setFiltered(searchedPokemon)
        },
        [searchTermState]
    )


	return (<>
        { nameClick? <ChangeName setNameClick={setNameClick} pokemonName={pokemonName} pokemonId={pokemonId}/> : "" }
		<div className='pokemon-container'>
			{filtered.map((pokemonObj) => {
				return (  
					<div
						className='pokemon'
						key={`list-${pokemonObj.id}`}
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
                                onClick={() =>{handleClick(pokemonObj.name, pokemonObj.id); }}>
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
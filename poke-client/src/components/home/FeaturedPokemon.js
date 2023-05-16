import { useState, useEffect } from "react"
import { AddFeaturedPokemon } from "./AddFeaturedPokemon"

export const FeaturedPokemon = () =>{
    const[pokemon, setPokemon] = useState([])
    const [nameClick, setNameClick] = useState(false)
    const [pokemonName, setPokemonName] = useState('')
	const [pokemonId, setPokemonId] = useState('')

    useEffect(() => {
        const promises = [];
        for(let i=0; i<5; i++){
            const num = Math.floor(Math.random() * 1008)
            let url = `https://pokeapi.co/api/v2/pokemon/${num}`
            promises.push(fetch(url).then((res) => res.json()))
        }
        Promise.all(promises).then((results) => {
          const pokemonList = results.map((result) => ({
            name: result.name,
            image: result.sprites["front_default"],
            type: result.types.map((type) => type.type.name).join(", "),
            id: result.id,
          }));
          setPokemon(pokemonList);
        });
      }, []);

      const handleClick = (name, id) => {
		setNameClick(true)
		setPokemonName(name)
		setPokemonId(id)
	}

    return (
		<>
			{nameClick ? (
				<AddFeaturedPokemon
					setNameClick={setNameClick}
					pokemonName={pokemonName}
					pokemonId={pokemonId}
				/>
			) : (
				''
			)}
            <h2 className="my-pokemon-header">featured pokemon</h2>
			<div className='pokemon-container'>
				{pokemon.map((pokemonObj) => {
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
							<div className='add-button'>
								<button
									className='button-85 add-pokemon-button'
									role='button'
									id={pokemonObj.id}
									onClick={() => {
										handleClick(
											pokemonObj.name,
											pokemonObj.id
										)
									}}
								>
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

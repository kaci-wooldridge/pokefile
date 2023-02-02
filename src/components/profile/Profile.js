import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./Profile.css"

export const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([""])
    const [pokemonPicks, setPokemonPicks] = useState([""])
    const [pokemon, setPokemon] = useState([""])
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)

    useEffect(() =>{
        fetch(`http://localhost:8088/users?id=${pokeUserObject.id}&_expand=team`)
        .then(res => res.json())
        .then ((data) =>{
            setUser(data)
        })}
    ,[])

    useEffect(() =>{
        const promises = []
        fetch(`http://localhost:8088/pokemonPicks?userId=${pokeUserObject.id}`)
        .then(res => res.json())
        .then ((data) =>{
            setPokemonPicks(data)
            data.map(pick => {
                const url = `https://pokeapi.co/api/v2/pokemon/${pick.pokemonId}`;
                promises.push(fetch(url)
                .then((res) => res.json()));
            })
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
        })
    }, [])


    const handleClick = (evt) =>{
        const match = pokemonPicks.filter(poke => poke.pokemonId===parseInt(evt.target.id))
        if(pokeUserObject.id===match[0].userId && match[0].pokemonId===parseInt(evt.target.id)){
            console.log(match[0].id)
            fetch(`http://localhost:8088/pokemonPicks/${match[0].id}`,{
                method: "DELETE"
            })
            .then(() =>{
                const promises = []
                fetch(`http://localhost:8088/pokemonPicks?userId=${pokeUserObject.id}`)
                .then(res => res.json())
                .then ((data) =>{
                    setPokemonPicks(data)
                    data.map(pick => {
                        const url = `https://pokeapi.co/api/v2/pokemon/${pick.pokemonId}`;
                        promises.push(fetch(url)
                        .then((res) => res.json()));
                    })
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
                })
            })
        }
    }




    return <div className="profile-container">
                <div className="header">
                    <h1>{user[0].name}</h1>
                    <div className="teamName">member of {user[0].team?.name}</div>
                </div>
                <div className="mid">
                    <div className="profile-picture">
                        <img src="https://cdn11.bigcommerce.com/s-gyhhtwx4/images/stencil/300x300/products/2838/6337/079346033522_puzzle_1500__40452.1671818285.jpg?c=2" />
                    </div>
                    <div className="aboutMe">
                    {user[0].aboutMe}
                    </div>
                </div>
                <div className="myPokemon">
                    <h2>My Pokemon</h2>
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
                                        <div className="button">
                                            <button className="button-85">
                                            ❤︎
                                            </button>
                                        </div>
                                        <div>
                                            {default}
                                        </div>
                                        <div className='button'>
                                            <button className='button-85' role="button" id={pokemonObj.id}
                                                onClick={(event) =>{
                                                    handleClick(event)
                                                }}>
                                            x
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>

            </div>

}
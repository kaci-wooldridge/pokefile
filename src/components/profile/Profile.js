import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

export const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([""])
    const [profileId, setProfileId] = useState([""])
    const [pokemonPicks, setPokemonPicks] = useState([])
    const [isName, setIsName] = useState("")
    const [pokemon, setPokemon] = useState([""])
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)

    const [findId, setFindId] = useState([])

    useEffect(() =>{
        fetch(`http://localhost:8088/users?id=${pokeUserObject.id}&_expand=team`)
        .then(res => res.json())
        .then ((data) =>{
            setUser(data)
        })}
    ,[])

    // useEffect(() =>{
    //     const promises = []
    //     fetch(`http://localhost:8088/pokemonPicks?userId=${pokeUserObject.id}`)
    //     .then(res => res.json())
    //     .then ((data) =>{
    //         setPokemonPicks(data)
    //         data.map(pick => {
    //             const url = `https://pokeapi.co/api/v2/pokemon/${pick.pokemonId}`;
    //             promises.push(fetch(url)
    //             .then((res) => res.json()));
    //         })
    //         Promise.all(promises)
    //             .then((results) => {
    //                 const pokemonList = results.map((result) => ({
    //                     name: result.name,
    //                     image: result.sprites['front_default'],
    //                     type: result.types.map((type) => type.type.name).join(', '),
    //                     id: result.id
    //                 }));
    //                 setPokemon(pokemonList)
    //             })
    //     })
    // }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/pokemonPicks?userId=${pokeUserObject.id}`)
          .then((res) => res.json())
          .then((data) => {
            setPokemonPicks(data);
          });
      }, []);
      useEffect(() => {
        const promises = [];
        pokemonPicks.map((pick) => {
          const url = `https://pokeapi.co/api/v2/pokemon/${pick.pokemonId}`;
          promises.push(fetch(url).then((res) => res.json()));
        });
        Promise.all(promises).then((results) => {
          const pokemonList = results.map((result, index) => ({
            name: result.name,
            image: result.sprites["front_default"],
            type: result.types.map((type) => type.type.name).join(", "),
            id: result.id,
            pokemonPickId: pokemonPicks[index].id,
            pokemonNickName: pokemonPicks[index].pokemonNickName,
          }));
          setPokemon(pokemonList);
        });
      }, [pokemonPicks]);



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
                        <img width="400px" src={user[0].profilePicture} />
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
                                        key={`${pokemonObj.pokemonPickId}-${pokeUserObject.id}`}
                                    >
                                        <div className='pokemon-sprite'>
                                            <img src={pokemonObj.image} />
                                        </div>
                                        {
                                            pokemonObj.pokemonNickName
                                            ?
                                            <h2 className='pokemon-name'>
                                            {pokemonObj.pokemonNickName} 
                                            </h2>
                                            :
                                            <h2 className='pokemon-name'>
                                            {pokemonObj.name} 
                                            </h2>
                                        }


                                        <div className='pokemon-type'>
                                            type: {pokemonObj.type}
                                        </div>

                                        <div className="buttons">
                                            {/* <button className="button-85">
                                            ❤︎
                                            </button> */}
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
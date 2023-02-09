import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EditPokemonName } from "./EditPokemon"
import { EditProfile } from "./EditProfile"
import "./Profile.css"

export const Profile = () => {
    const [user, setUser] = useState([""])
    const [pokemonPicks, setPokemonPicks] = useState([])
    const [pokemon, setPokemon] = useState([])
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
    const [editClick, setEditClick] = useState(false)
    const [changeName, setChangeName] = useState(false)
    const [pickId, setPickId] = useState(null)

    useEffect(() =>{
        fetch(`http://localhost:8088/users?id=${pokeUserObject.id}&_expand=team`)
        .then(res => res.json())
        .then ((data) =>{
            setUser(data)
        })}
    ,[])

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
            shinyImage: result.sprites["front_shiny"],
            type: result.types.map((type) => type.type.name).join(", "),
            id: result.id,
            pokemonPickId: pokemonPicks[index].id,
            pokemonNickName: pokemonPicks[index].pokemonNickName,
            shiny: pokemonPicks[index].shiny
          }));
          setPokemon(pokemonList);
        });
      }, [pokemonPicks]);



    const handleClick = (evt) =>{
        const match = pokemon.filter(poke => poke.pokemonPickId===parseInt(evt.target.value))
        if(match[0].pokemonPickId===parseInt(evt.target.value)){
            fetch(`http://localhost:8088/pokemonPicks/${match[0].pokemonPickId}`,{
                method: "DELETE"
            })
            .then(() =>{
                fetch(`http://localhost:8088/pokemonPicks?userId=${pokeUserObject.id}`)
                .then((res) => res.json())
                .then((data) => {
                  setPokemonPicks(data)
                })
            })
        }
    }

    const handleEditClick = () =>{
        setEditClick(true)
    }

    const changeNameClick = (id) =>{
        setChangeName(true)
        setPickId(id)
    }

    return<>
        { editClick? <EditProfile setEditClick={setEditClick} /> : "" }
        { changeName? <EditPokemonName setChangeName={setChangeName} pickId={pickId}/> : "" }
            <div className="profile-container">
                <div className="header">
                    <h1>{user[0].name}</h1>
                    <div className="teamName">member of {user[0].team?.name}</div>
                    <button className="button-85 edit-profile" onClick={handleEditClick}>edit profile</button>
                </div>
                <div className="mid">
                    <div className="profile-picture">
                        <img width="450px" src={user[0].profilePicture} />
                    </div>
                    <div className="aboutMe">
                    {user[0].aboutMe}
                    </div>
                </div>
                <div className="myPokemon">
                    <h2 className="my-pokemon-header">My Pokemon</h2>
                        <div className='pokemon-container'>
                            {pokemon.map((pokemonObj) => {
                                return (
                                    <div
                                        className='pokemon'
                                        key={`${pokemonObj?.pokemonPickId}-${pokeUserObject.id}`}
                                    >
                                        <div className="edit-name-button">
                                            <button className="gear" onClick={()=>{changeNameClick(parseInt(pokemonObj.pokemonPickId))}}>⚙️</button>
                                        </div>
                                        <div className='pokemon-sprite'>
                                        {
                                            pokemonObj.shiny
                                            ?
                                            <img src={pokemonObj.shinyImage} />
                                            :
                                            <img src={pokemonObj.image} />
                                        }
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
                                            <button className='button-85' role="button" id={pokemonObj.id} value={pokemonObj.pokemonPickId}
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
        </>

}
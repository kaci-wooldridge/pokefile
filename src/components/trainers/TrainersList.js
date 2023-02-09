import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Trainers.css"

export const TrainerList = () => {
    const [trainerArray, setTrainerArray] = useState([])
    const [pokemonPicks, setPokemonPicks] = useState([])
    const [pokemon, setPokemon] = useState([])

        useEffect(() =>{
            fetch(`http://localhost:8088/users`)
                .then(res=> res.json())
                .then((data) =>{
                    setTrainerArray(data)
                })
            },
            []
        )

        // useEffect(() => {
        //     fetch(`http://localhost:8088/pokemonPicks?_expand=user`)
        //       .then((res) => res.json())
        //       .then((data) => {
        //         setPokemonPicks(data);
        //       });
        // }, []);

        // const match = () =>{
        // }
    
        // useEffect(() => {
        // const promises = [];
        // pokemonPicks.map((pick) => {
        //     const url = `https://pokeapi.co/api/v2/pokemon/${pick.pokemonId}`;
        //     promises.push(fetch(url).then((res) => res.json()));
        // });
        // Promise.all(promises).then((results) => {
        //     const pokemonList = results.map((result, index) => ({
        //     name: result.name,
        //     image: result.sprites["front_default"],
        //     shinyImage: result.sprites["front_shiny"],
        //     type: result.types.map((type) => type.type.name).join(", "),
        //     id: result.id,
        //     pokemonPickId: pokemonPicks[index].id,
        //     pokemonNickName: pokemonPicks[index].pokemonNickName,
        //     shiny: pokemonPicks[index].shiny
        //     }));
        //     setPokemon(pokemonList);
        // });
        // }, [pokemonPicks]);

    return<section className="trainer">
        {trainerArray.map(trainer=>{
            return (
            <div className="trainer-container" key={trainer.id}>
                <Link to={`../profile/${trainer.id}`} className="link"> <div className="trainer-name">{trainer.name}</div> </Link>
            </div>
            )
        })}
    </section>
}
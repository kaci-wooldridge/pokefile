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
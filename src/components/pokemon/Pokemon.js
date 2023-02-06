export const Pokemon = ({pokemonObject}) =>{

    return <div className="pokemon" key={pokemonObject.id}>
            <header>
            </header>
            <li class="card" style="padding: 2%;margin: 2%;list-style-type: none;">
                <img class="card-image" src={pokemonObject.image}/>
                <h2 class="card-title">{pokemonObject.name}</h2>
                <p class="card-subtitle">Type: {pokemonObject.type}</p>
            </li>
            <footer>
            </footer>
    </div>
}
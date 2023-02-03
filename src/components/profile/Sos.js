useEffect(() =>{
    fetch(`http://localhost:8088/pokemonPicks?userId=${pokeUserObject.id}`)
    .then(res => res.json())
    .then ((data) =>{
        setPokemonPicks(data)
        data.forEach(pick => {
            const url = `https://pokeapi.co/api/v2/pokemon/${pick.pokemonId}`;
            fetch(url)
            .then((res) => res.json())
            .then((result) =>{
                const pokemonRecieved = {
                    name: result.name,
                    image: result.sprites['front_default'],
                    type: result.types.map((type) => type.type.name).join(', '),
                    id: result.id,
                    pokemonPickId: data.id,
                    pokemonNickName: data.pokemonNickName
                }
                const copy = pokemon.map(p=>({...p}))
                copy.push(pokemonRecieved)
                setPokemon(copy)
            })
        })
    })
}, [])
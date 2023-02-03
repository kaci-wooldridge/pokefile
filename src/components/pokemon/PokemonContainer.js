import { useState } from "react"
import { PokemonList } from "./PokemonList"
import { PokemonSearch } from "./PokemonSearch"



export const PokemonContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>

        <PokemonSearch setterFunction={setSearchTerms} />

        <PokemonList searchTermState={searchTerms} />
    </>
}
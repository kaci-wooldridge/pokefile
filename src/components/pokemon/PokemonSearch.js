export const PokemonSearch = ({ setterFunction }) =>{
    return(
        <div className="barContainer">
            <input 
                onChange={(changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }}
                type="text" placeholder="Search" className ="searchbar"/>
            {/* <button 
                onClick={() =>{
                }}>x</button> */}
        </div>
    )
}
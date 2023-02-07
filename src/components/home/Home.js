import { FeaturedPokemon } from "./FeaturedPokemon"
import "./home.css"

export const Home = () =>{
    return <>
        <div className="home-container">
            <h1>Welcome to Pokefile!</h1>
            <img className="home__img" src={require('./images/eevees.png')} border="0" />
            <div>
                <FeaturedPokemon />
            </div>
        </div>
    </>
}
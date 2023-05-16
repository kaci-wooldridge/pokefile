import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)

    return (
        <ul className="navbar">
            <li className="navbar__item homeButton">
                <Link className="navbar__link" to="/">
                    Home
                </Link>
            </li>

            <li className="navbar__item pokemonButton">
                <Link className="navbar__link" to="/pokemonList">
                    Pokemon
                </Link>
            </li>

            <li className="navbar__item trainersButton">
                <Link className="navbar__link" to="/trainers">
                    Trainers
                </Link>
            </li>

            <li className="navbar__item profileButton">
                <Link className="navbar__link" to={`../profile/${pokeUserObject.id}`}>
                    Profile
                </Link>
            </li>



            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("pokefile_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}
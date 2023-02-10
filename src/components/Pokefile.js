import { Route, Routes, Outlet } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Pokefile.css"
import { NavBar } from "./nav/Navbar"
import { Profile } from "./profile/Profile"
import { PokemonContainer } from "./pokemon/PokemonContainer"
import { Home } from "./home/Home"
import { TrainerList } from "./trainers/TrainersList"


export const Pokefile = () => {
	const localPokeUser = localStorage.getItem("pokefile_user")
    const pokeUserObject = JSON.parse(localPokeUser)
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />

			<Route
				path='/'
				element={
					<Authorized>
						<>
							<NavBar />
							<Outlet />
						</>
					</Authorized>
				}
			>
				<Route
					path='/'
					element={
						<>
							<Home />
							<Outlet />
						</>
					}

				>

				</Route>
				<Route path='pokemonList' element={<PokemonContainer />} />
				<Route path='profile/:userId' element={<Profile />} />
				<Route path='trainers' element={<TrainerList />} />
			</Route>
		</Routes>
	)
}
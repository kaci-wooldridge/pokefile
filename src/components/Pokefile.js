import { Route, Routes, Outlet } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Pokefile.css"
import { NavBar } from "./nav/Navbar"
import { Profile } from "./profile/Profile"
import { PokemonContainer } from "./pokemon/PokemonContainer"


export const Pokefile = () => {
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
							<h1>Pokefile</h1>
							<div>"gotta catch 'em all"</div>
							<Outlet />
						</>
					}

				>

				</Route>
				<Route path='pokemonList' element={<PokemonContainer />} />
                <Route path='profile' element={<Profile />} />
			</Route>
		</Routes>
	)
}
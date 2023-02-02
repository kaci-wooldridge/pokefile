import { Route, Routes, Outlet } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Pokefile.css"
import { PokemonList } from "./pokemon/PokemonList"
import { NavBar } from "./nav/Navbar"
import { Profile } from "./profile/Profile"


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
				<Route path='pokemonList' element={<PokemonList />} />
                <Route path='profile' element={<Profile />} />
			</Route>
		</Routes>
	)
}
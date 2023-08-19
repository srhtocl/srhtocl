import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useAuth } from "../context/auth-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Layout() {

	// from firebase
	const auth = getAuth();

	const authContext = useAuth();

	useEffect(() => {

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			
			user ? authContext.setUser(user) : authContext.setUser(null);
		
		});
		
		return () => unsubscribe();

	},);

	return (
		<React.Fragment>

			{authContext.user && <Header/>}

			<main className="flex container h-full overflow-auto justify-center">
				<Outlet />
			</main>

			<Footer />

		</React.Fragment>
	);
}
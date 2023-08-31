import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useAuth } from "../context/auth-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Layout() {

	// from firebase
	const auth = getAuth();

	const authContext = useAuth();

	const location = useLocation();

	useEffect(() => {

		const unsubscribe = onAuthStateChanged(auth, (user) => {

			user ? authContext.setUser(user) : authContext.setUser(null);

		});

		return () => unsubscribe();

	},);


	return (
		<React.Fragment>
			
			<Header />

			<main id="main" className="sr-layout my-14">
				<Outlet />
			</main>

			<Footer />

		</React.Fragment>
	);
}
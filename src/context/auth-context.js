import React, { createContext, useContext, useState } from 'react';

import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";


const AuthContext = createContext();

export function AuthProvider({ children }) {

	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(false);

	// from firebase
	const auth = getAuth();

	const handleLogout = async () => {

		try {

			await signOut(auth).then(() => {

				setUser(null);

				setLoading(false);

				console.log("Çıkış başarılı.");
			});

		} catch (error) {

			console.error("Çıkış yapılırken bir hata oluştu:", error);
		}
	};

	const value = { user, setUser, loading, setLoading, handleLogout };

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() { return useContext(AuthContext); }

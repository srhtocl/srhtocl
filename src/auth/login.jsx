import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth-context';

export default function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const { setUser } = useAuth();
    
    const navigate = useNavigate();

    const handleEmailChange = (event) => { setEmail(event.target.value); }

    const handlePasswordChange = (event) => { setPassword(event.target.value); }

    const handleSubmit = (event) => {

        event.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // set AuthContext
                setUser(userCredential.user);
                
                navigate("/");
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold mb-6">Giriş Yap</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

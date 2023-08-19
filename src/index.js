import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, } from "react-router-dom";
import router from './routers';
import { AuthProvider } from "./context/auth-context";

import "./styles/main.css"
import "./styles/apply.css"
import 'tailwindcss/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(

	<AuthProvider>
		
		<RouterProvider router={router} />
	
	</AuthProvider >

);
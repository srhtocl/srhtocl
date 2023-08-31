import { createHashRouter } from "react-router-dom";
import Root from "../pages/root";
import Home from "../pages/home";
import Message from "../pages/message";
import ErrorPage from "../pages/error-page";
import Response from "../pages/response";
import AllMessage from "../pages/messages";
import Login from "../auth/login";
import CreatePost from "../pages/create-post";
import AllPosts from "../pages/read-post";


const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/message",
                element: <Message />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/response/:userid",
                element: <Response />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/all-messages",
                element: <AllMessage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/login",
                element: <Login />,                
                errorElement: <ErrorPage />,
            },
            {
                path: "/create-post",
                element: <CreatePost />,                
                errorElement: <ErrorPage />,
            },
            {
                path: "/posts",
                element: <AllPosts />,                
                errorElement: <ErrorPage />,
            }
        ]
    }
]);

export default router;

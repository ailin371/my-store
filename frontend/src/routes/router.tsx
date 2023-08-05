import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegistrationPage />,
            },
        ]
    },
]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import NotFound404Page from "../pages/NotFound404Page";
import CartPage from "../pages/CartPage";

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
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "products/:productId",
                element: <ProductPage />,
            },
            {
                path: "*",
                element: <NotFound404Page />,
            }
        ]
    },
]);

export default router;
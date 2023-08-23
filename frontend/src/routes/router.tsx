import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import NotFound404Page from "../pages/NotFound404Page";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: (
                    <Navigate to='/products' />
                ),
                index: true,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegistrationPage />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "products",
                element: (
                    <ProtectedRoute>
                        <ProductsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "products/:productId",
                element: (
                    <ProtectedRoute>
                        <ProductPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <NotFound404Page />,
            }
        ]
    },
]);

export default router;
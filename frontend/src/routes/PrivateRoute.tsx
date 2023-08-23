import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectUser } from "../app/features/user/userSelectors";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const user = useAppSelector(selectUser);

    if (!user.token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
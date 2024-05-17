import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";

export const routes = [
    {
        path: "/",
        element: Dashboard
    },
    {
        path: "/create-user",
        element: UserPage
    },
    {
        path: "user/:id",
        element: UserPage
    }
]
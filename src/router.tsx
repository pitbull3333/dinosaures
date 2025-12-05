import { createBrowserRouter } from "react-router"
import App from "./App.tsx"
import Home from "./pages/Home.tsx"
import Dino from "./pages/Dino.tsx"

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/dinosaures",
                element: <Home />
            },
            {
                path: "/dinosaures/:name",
                element: <Dino />
            }
        ]
    }
])

export default router;
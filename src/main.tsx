import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import router from "./router"
import "./i18n"
import './styles/global.css'

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

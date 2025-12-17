import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import router from "./router"
//import "./i18n"
import i18n from "./i18n"
import './styles/global.css'

const savedLang = localStorage.getItem("lang")
if (savedLang) {
  i18n.changeLanguage(savedLang.split("-")[0]) // fr-FR → fr
}

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

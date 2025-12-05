import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import fr from "./translations/fr.json"
import en from "./translations/en.json"

i18n.use(initReactI18next).init({
    lng: "fr",// langue par défaut
    fallbackLng: "fr",// si une traduction manque
    resources: {
        fr: { translation: fr },
        en: { translation: en },
    },
})

export default i18n;
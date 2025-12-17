import { Select, MenuItem, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../styles/languageSelector.css"
const base = import.meta.env.BASE_URL

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    const handleChange = (event: any) => {
      const lang = event.target.value
      i18n.changeLanguage(event.target.value)
      localStorage.setItem("lang", lang)
    }

  return (
    <Select id="select-langage" size="small" value={i18n.language} onChange={handleChange} sx={{ width: "8.2vw", height: "4vh"}}>
      <MenuItem value="fr">
        <Box sx={{display: "flex", alignItems: "center"}}>
          <img className="img-flags" src={`${base}images/flags/fr.svg`} alt="" />Français
        </Box>
      </MenuItem>
      <MenuItem value="en">
        <Box sx={{display: "flex", alignItems: "center"}}>
          <img className="img-flags" src={`${base}images/flags/en.svg`} alt="" />English
        </Box>
      </MenuItem>
    </Select>
  )
}
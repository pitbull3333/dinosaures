import { Select, MenuItem, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    const handleChange = (event: any) => {
        i18n.changeLanguage(event.target.value)
    }

  return (
    <Select id="select-langage" size="small" value={i18n.language} onChange={handleChange} sx={{ width: "8.2vw" }}>
      <MenuItem value="fr">
        <Box sx={{display: "flex", alignItems: "center"}}>
          <svg viewBox="0 0 900 600" width="2vw" style={{ marginRight: "0.2vw" }}>
            <rect width="900" height="600" fill="#ED2939"/>
            <rect width="600" height="600" fill="#FFFFFF"/>
            <rect width="300" height="600" fill="#002395"/>
          </svg>Français
        </Box>
      </MenuItem>
      <MenuItem value="en">
        <Box sx={{display: "flex", alignItems: "center"}}>
          <svg viewBox="0 0 900 600" width="2vw" style={{ marginRight: "0.2vw" }}>
            <rect width="900" height="600" fill="#012169" />
            <polygon points="0,0 100,0 900,500 900,600 800,600 0,100" fill="#FFFFFF" />
            <polygon points="900,0 800,0 0,500 0,600 100,600 900,100" fill="#FFFFFF" />
            <polygon points="0,0 60,0 900,540 900,600 840,600 0,60" fill="#C8102E" />
            <polygon points="900,0 840,0 0,540 0,600 60,600 900,60" fill="#C8102E" />
            <rect x="0" y="250" width="900" height="100" fill="#FFFFFF" />
            <rect x="400" y="0" width="100" height="600" fill="#FFFFFF" />
            <rect x="0" y="275" width="900" height="50" fill="#C8102E" />
            <rect x="425" y="0" width="50" height="600" fill="#C8102E" />
          </svg>English
        </Box>
      </MenuItem>
    </Select>
  )
}
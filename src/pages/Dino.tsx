import { useParams,useNavigate } from "react-router";
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next"
import LanguageSelector from "../components/LanguageSelector"
import dinos from "../data/dino.json"
import "../styles/dino.css"
const base = import.meta.env.BASE_URL

function Dino(){
    const { name } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()
    
    const displayedDino = dinos.find((dino) => {
        return dino.name.toLowerCase() === name?.toLowerCase()
    })

    return (
        <>
            <main id="main-dino">
                <LanguageSelector />
                <img src={`${base}images/dinosaures/${displayedDino?.name}.jpg`} alt={displayedDino?.name} />
                <p>{displayedDino?.name}</p>
                <p>{t(displayedDino?.diet?? "")}</p>
                <p>{parseFloat((displayedDino?.length ?? "").replace("m", ""))} m</p>
                <p>{displayedDino?.lived}</p>
                <p>{displayedDino?.found}</p>
                <Button variant="contained" sx={{}} onClick={() => navigate("/dinosaures")}>RETOUR</Button>
            </main>
        </>
    )
}

export default Dino
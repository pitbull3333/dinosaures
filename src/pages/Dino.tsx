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
    function translateLived(lived: string | undefined, t: Function) {
        if (!lived) return ""
        const [period, ...rest] = lived.split(",")
        const years = rest.join(",").trim()
        const translatedPeriod = t(period.trim())
        let translatedYears = years
        if (years) {
            translatedYears = years.replace("million years ago", t("millionYearsAgo"))
        }
        return years ? `${translatedPeriod}, ${translatedYears}` : translatedPeriod
    }
    const checkPeriod: [string, boolean][]= [
        ["late triassic",false],
        ["early jurassic", false],
        ["mid jurassic", false ],
        ["late jurassic", false],
        ["early cretaceous", false],
        ["late cretaceous", false]

    ]
    if (displayedDino?.lived) {
        checkPeriod.forEach((p,i) => {
            checkPeriod[i][1] = displayedDino.lived.toLowerCase().includes(p[0])
        })
    }
    let iconHerbivorous = ""
    let iconCarnivorous = ""
    switch (displayedDino?.diet.toLowerCase()) {
        case "herbivorous":
            iconHerbivorous = "herbivorous"
            iconCarnivorous = ""
        break;
        case "carnivorous":
            iconHerbivorous = ""
            iconCarnivorous = "carnivorous"
        break;
        case "omnivorous":
            iconHerbivorous = "herbivorous"
            iconCarnivorous = "carnivorous"
        break;
        default:
        iconHerbivorous = ""
        iconCarnivorous = ""
    }
    console.log(iconHerbivorous)

    return (
        <>
            <header id="header-dino">
                <section>
                    <article>
                        <div>{t("triassic")}</div>
                        <div>{t("jurassic")}</div>
                        <div>{t("cretaceous")}</div>
                        <div><span>{t("lower")}</span><br />252-247</div>
                        <div><span>{t("mid")}</span><br />247-237</div>
                        <div className={checkPeriod[0][1] ? "active" : ""}><span>{t("superior")}</span><br />237-201</div>
                        <div className={checkPeriod[1][1] ? "active" : ""}><span>{t("lower")}</span><br />201-174</div>
                        <div className={checkPeriod[2][1] ? "active" : ""}><span>{t("mid")}</span><br />174-164</div>
                        <div className={checkPeriod[3][1] ? "active" : ""}><span>{t("superior")}</span><br />164-145</div>
                        <div className={checkPeriod[4][1] ? "active" : ""}><span>{t("lower")}</span><br />145-101</div>
                        <div className={checkPeriod[5][1] ? "active" : ""}><span>{t("superior")}</span><br />101-66</div>
                    </article>
                    <img src={`${base}images/meteorite.jpg`} alt={t("meteorite")} />
                </section>
                <section>
                    <Button variant="contained" onClick={() => navigate("/dinosaures/")}>RETOUR</Button>
                    <LanguageSelector />
                </section>
            </header>
            <main id="main-dino">
                <img src={`${base}images/dinosaures/${displayedDino?.name}.jpg`} alt={displayedDino?.name} />
                <p>{displayedDino?.name}</p>
                <section>
                    <figure>
                        <p>{t("diet")} : {t(displayedDino?.diet?? "")}</p>
                        {iconCarnivorous === "carnivorous" && (<img src={`${base}images/${iconCarnivorous}.svg`} alt={t("meat")} />)}
                        {iconHerbivorous === "herbivorous" && (<img src={`${base}images/${iconHerbivorous}.svg`} alt={t("plant")} />)}
                    </figure>
                    <p>{t("length")} : {parseFloat((displayedDino?.length ?? "").replace("m", ""))} m</p>
                    <p>{t("lived")} : {translateLived(displayedDino?.lived, t)}</p>
                    <p>{t("found")} : {displayedDino?.found}</p>
                </section>
            </main>
        </>
    )
}

export default Dino
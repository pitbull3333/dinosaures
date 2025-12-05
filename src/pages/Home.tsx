import { useState } from 'react'
import { useNavigate } from 'react-router'
import Search from "../components/Search.tsx"
import dinos from "../data/dino.json"
import "../styles/variable.css"
import "../styles/home.css"
const base = import.meta.env.BASE_URL;

function Home(){
    const [lengthFilter, setLengthFilter] = useState<string[]>([])
    const [periods,setPeriods] = useState<string[]>([])
    const [diets,setDiets] = useState<string[]>([])
    const [search,setSearch] = useState("")
    const navigate = useNavigate()

    const displayedDinos = dinos.filter((dino) => {
        const matchLengthFilter = lengthFilter.length === 0 || lengthFilter.some(interval => {
            const [min, max] = interval.split("-").map(Number)
            const size = parseFloat(dino.length)
            return size >= min && size <= max
        });
        const matchperiod = periods.length === 0 || periods.some(period => dino.lived.toLowerCase().includes(period.toLowerCase()))
        const matchDiet = diets.length === 0 || diets.some(diet => dino.diet.toLowerCase().includes(diet.toLowerCase()))
        const matchName = dino.name.toLowerCase().includes(search.toLowerCase())
        return matchLengthFilter && matchperiod && matchDiet && matchName
    })

    const goToDino = (name:string) => {
        navigate(`/dinosaures/${name.toLowerCase()}`)
    }

    return (
        <>
            <header id="header-search">
                <Search
                    lengthFilter={lengthFilter}
                    setLengthFilter={setLengthFilter}
                    periods={periods}
                    setPeriods={setPeriods}
                    diets={diets}
                    setDiets={setDiets}
                    setSearch={setSearch}
                >
                </Search>
            </header>
            <main id="main-list-dino">
                <ul>
                    {displayedDinos.map((dino) => (
                        <li key={dino.name}>
                            <img src={`${base}images/dinosaures/${dino.name}.jpg`} alt={dino.name} onClick={() => goToDino(dino.name)} />
                            <a onClick={() => goToDino(dino.name)}>{dino.name}</a>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default Home
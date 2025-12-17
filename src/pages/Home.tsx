import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Search from "../components/Search.tsx"
import dinos from "../data/dino.json"
import continentsData from "../data/continents.json";
import "../styles/variable.css"
import "../styles/home.css"

const base = import.meta.env.BASE_URL
type ContinentsType = typeof continentsData
type ContinentKey = keyof ContinentsType

function Home(){
    const [continents, setContinents] = useState<string[]>([])
    const [lengthFilter, setLengthFilter] = useState<string[]>([])
    const [periods,setPeriods] = useState<string[]>([])
    const [diets,setDiets] = useState<string[]>([])
    const [search,setSearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const savedContinents = localStorage.getItem("continents")
        const savedLength = localStorage.getItem("lengthFilter")
        const savedPeriods = localStorage.getItem("periods")
        const savedDiets = localStorage.getItem("diets")
        const savedSearch = localStorage.getItem("search")
        if (savedContinents) setContinents(JSON.parse(savedContinents))
        if (savedLength) setLengthFilter(JSON.parse(savedLength))
        if (savedPeriods) setPeriods(JSON.parse(savedPeriods))
        if (savedDiets) setDiets(JSON.parse(savedDiets))
        if (savedSearch) setSearch(savedSearch)
    },[])
    useEffect(() => {
        localStorage.setItem("continents", JSON.stringify(continents))
    }, [continents])
    useEffect(() => {
        localStorage.setItem("lengthFilter", JSON.stringify(lengthFilter))
    }, [lengthFilter])
    useEffect(() => {
        localStorage.setItem("periods", JSON.stringify(periods))
    }, [periods])
    useEffect(() => {
        localStorage.setItem("diets", JSON.stringify(diets))
    }, [diets])
    useEffect(() => {
        localStorage.setItem("search", search)
    }, [search])

    const displayedDinos = dinos.filter((dino) => {
        const foundClean = dino.found
            .toLowerCase()
            .replace(/,/g, "")// enlever les virgules
            .replace(/\s+/g, " ")// nettoyer les espaces multiples
            .trim()
        const matchContinent = continents.length === 0 || continents.some((continentKey) =>
            continentsData[continentKey as ContinentKey].some((country) =>
                foundClean.includes(country)
            )
        )
        const matchLengthFilter = lengthFilter.length === 0 || lengthFilter.some(interval => {
            const [min, max] = interval.split("-").map(Number)
            const size = parseFloat(dino.length)
            return size >= min && size <= max
        })
        const matchPeriod = periods.length === 0 || periods.some(period => dino.lived.toLowerCase().includes(period.toLowerCase()))
        const matchDiet = diets.length === 0 || diets.some(diet => dino.diet.toLowerCase().includes(diet.toLowerCase()))
        const matchName = dino.name.toLowerCase().includes(search.toLowerCase())
        return matchContinent && matchLengthFilter && matchPeriod && matchDiet && matchName
    })

    const goToDino = (name:string) => {
        navigate(`/dinosaures/${name.toLowerCase()}`)
    }

    return (
        <>
            <header id="header-search">
                <Search
                    continents={continents}
                    setContinents={setContinents}
                    lengthFilter={lengthFilter}
                    setLengthFilter={setLengthFilter}
                    periods={periods}
                    setPeriods={setPeriods}
                    diets={diets}
                    setDiets={setDiets}
                    search={search}
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
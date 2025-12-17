import { FormControl, Select, MenuItem, Checkbox, ListItemText, TextField, InputLabel } from "@mui/material"
import Button from '@mui/material/Button'
import { useTranslation } from "react-i18next"
import LanguageSelector from "../components/LanguageSelector"
import continentsData from "../data/continents.json"
import "../styles/search.css"

type SearchProps = {
    continents: string[] 
    lengthFilter: string[]
    periods: string[]
    diets: string[]
    search: string
    setContinents: React.Dispatch<React.SetStateAction<string[]>>
    setLengthFilter: React.Dispatch<React.SetStateAction<string[]>>
    setPeriods: React.Dispatch<React.SetStateAction<string[]>>
    setDiets: React.Dispatch<React.SetStateAction<string[]>>
    setSearch: React.Dispatch<React.SetStateAction<string>>
}
const optionsContinents = Object.keys(continentsData)
const optionsLength = [
    { value: "0-1", range: [0,1] },
    { value: "1-2", range: [1,2] },
    { value: "2-5", range: [2,5] },
    { value: "5-10", range: [5,10] },
    { value: "10-15", range: [10,15] },
    { value: "15-20", range: [15,20] },
    { value: "20-25", range: [20,25] },
    { value: "25-30", range: [25,30] },
    { value: "30-99", range: [30,99] }
]
const optionsPeriod = ["late triassic","early jurassic","mid jurassic","late jurassic", "early cretaceous","late cretaceous"]
const optionsDiet = ["herbivorous","carnivorous","omnivorous"]

function Search({continents, setContinents, lengthFilter, setLengthFilter, periods, setPeriods, diets, setDiets, search, setSearch}: SearchProps){
    const { t } = useTranslation()

    const resetFilter = () => {
        setContinents([])
        setLengthFilter([])
        setPeriods([])
        setDiets([])
        setSearch("")
    }
    const ListContinents = (event: any) => {
        const value = event.target.value as string[]
        setContinents(value)
    }
    const ListInputPeriods = (event: any) => {
        const value = event.target.value as string[]
        setPeriods(value)
    }
    const ListInputDiet = (event: any) => {
        const value = event.target.value as string[]
        setDiets(value)
    }
    const TextInput = (event: any) => {
        setSearch(event.target.value)
    }

    return (
        <>
            <section id="filtered">
                <FormControl variant="outlined" size="small" sx={{width: "11vw"}}>
                    <InputLabel>{t("location")}</InputLabel>
                    <Select
                        label={t("location")}
                        multiple
                        value={continents}
                        onChange={ListContinents}
                        renderValue={(selected) => (selected as string[]).map(v => t(v)).join(", ")}
                        sx={{textAlign: "center"}}
                    >
                        {optionsContinents.map((option) => (
                            <MenuItem key={option} value={option} sx={{p: 0}}>
                                <Checkbox checked={continents.includes(option)} sx={{m: 0, paddingLeft: 0}} />
                                <ListItemText primary={t(option)} sx={{flex: "unset"}} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" size="small" sx={{width: "7vw"}}>
                    <InputLabel>{t("length")}</InputLabel>
                    <Select
                        label={t("length")}
                        multiple
                        value={lengthFilter}
                        onChange={(e) => setLengthFilter(e.target.value as string[])}
                        renderValue={(selected) => (selected as string[]).map(value => t(value)).join(", ")}
                        sx={{textAlign: "center"}}
                    >
                        {optionsLength.map(option => (
                        <MenuItem key={option.value} value={option.value} sx={{p: 0}}>
                            <Checkbox checked={lengthFilter.includes(option.value)} sx={{paddingLeft: 0}} />
                            <ListItemText primary={t(option.value)} sx={{flex: "unset"}} />
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{width: "12vw"}}>
                    <InputLabel>{t("period")}</InputLabel>
                    <Select
                        label={t("period")}
                        multiple
                        value={periods}
                        onChange={ListInputPeriods}
                        renderValue={(selected) => (selected as string[]).map(v => t(v)).join(", ")}
                        sx={{textAlign: "center"}}
                    >
                        {optionsPeriod.map((option) => (
                            <MenuItem key={option} value={option} sx={{p: 0}}>
                                <Checkbox checked={periods.includes(option)} sx={{paddingLeft: 0}} />
                                <ListItemText primary={t(option)} sx={{flex: "unset"}} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{width: "11vw"}}>
                    <InputLabel>{t("diet")}</InputLabel>
                    <Select
                        label={t("diet")}
                        multiple
                        value={diets}
                        onChange={ListInputDiet}
                        renderValue={(selected) => (selected as string[]).map(v => t(v)).join(", ")}
                        sx={{textAlign: "center"}}
                    >
                        {optionsDiet.map((option) => (
                            <MenuItem key={option} value={option} sx={{p: 0}}>
                                <Checkbox checked={diets.includes(option)} sx={{m: 0, paddingLeft: 0}} />
                                <ListItemText primary={t(option)} sx={{flex: "unset"}} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField sx={{input:{textAlign: "center"}}} label={t("search")} variant="outlined" size="small" value={search} onChange={TextInput} />
                <Button variant="contained" onClick={() => resetFilter()}>{t("reset")}</Button>
                <LanguageSelector />
            </section>
        </>
    )
}

export default Search
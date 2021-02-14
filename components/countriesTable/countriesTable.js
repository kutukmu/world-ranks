import style from './countriesTable.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'

const ArrowKey = (isSorted) =>{
    return !isSorted ? <KeyboardArrowDownRounded color = 'inherit'/> : <KeyboardArrowUpRounded color = 'inherit'/>
}


const countriesTable = ({countries}) =>{

    console.log(countries.length)
    const [listOfCountries, setCountries] = useState(countries)

    useEffect(() =>{
        setCountries(countries)
    }, [countries])

    const [sortedMap, setSortedMap] = useState({
        'population':false,
        'name':false,
        'area':false,
        'gini':false
    })

    const orderBy = (key) =>{
        let newList = null
        if (key == 'name'){
            newList =  countries.sort((a,b) =>  !sortedMap[key] ? -1: -1)
        }else{
            newList =  countries.sort((a,b) =>  !sortedMap[key] ? a[key]- b[key]: b[key]- a[key])
        }
        setCountries(newList)
        setSortedMap(prev =>{
            return {
                ...prev,
                [key]: !sortedMap[key]
            }
        })
        console.log(sortedMap)
    }
    
    
    
    return (
        <div className = {style.container}>
            <div className = {style.heading}>
                <div className = {style.buttons}>
                <div className = {style.flagDistance}></div>
                    <button className={style.nameButton} onClick = {() => orderBy('name')}>
                        <div>
                            Name
                        </div>
                        <div className = {style.heading_color}>
                        { ArrowKey(sortedMap['name']) }
                        </div>
                     </button>
                    <button className={style.populationButton} onClick = {() => orderBy('population')}>
                        <div>
                            Population
                        </div>
                    <div className = {style.heading_color}>
                        { ArrowKey(sortedMap['population']) }
                    </div>
                    </button>
                    <button className={style.areaButton} onClick = {() => orderBy('area')}>
                        <div>
                            Area
                        </div>
                    <div className = {style.heading_color}>
                        { ArrowKey(sortedMap['area']) }
                    </div>
                    </button>

                    <button className={style.giniButton} onClick = {() => orderBy('gini')}>
                        <div>
                            Gini
                        </div>
                    <div className = {style.heading_color}>
                        { ArrowKey(sortedMap['gini']) }
                    </div>
                    </button>
                </div>
            </div>

            <div className = {style.table}>
                {
                    listOfCountries.map((country, idx) =>(
                        <Link href= {`/country/${country.alpha3Code}`} key= {idx}>
                            <div className = {style.row} >
                                <div className= {style.flag}>
                                    <img src ={country.flag} alt={country.name}/>
                                
                                </div>
                                <div className= {style.name}>
                                    {
                                        country.name
                                    }
                                
                                </div>
                                <div className= {style.population}>
                                    {
                                     country.population
                                    }

                                
                                </div>

                                <div className= {style.area}>
                                    {
                                     country.area || 0
                                    }

                                
                                </div>

                                <div className= {style.gini}>
                                    {
                                     country.gini || 0 
                                    } %

                                
                                </div>
                            </div>
                        </Link>
                        
                    ))
                }
            </div>




        </div>
    )


}

export default countriesTable




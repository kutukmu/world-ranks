import Layout from '../../components/layout/Layout'
import style from './country.module.css'
import {useState, useEffect} from 'react'
import { BorderStyleOutlined } from '@material-ui/icons'

const getElement = async(id) =>{
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
    const country = await res.json()
    return country
}

const Country = ({country}) =>{
    
    const [borders, setBorders] = useState([])


    const getBorders = async() =>{
        const borders = await Promise.all(country.borders.map((border) =>  getElement(border)))
        setBorders(borders)
    }

    useEffect(() =>{
        getBorders()
    }, [])

    console.log(borders)

    return <Layout title = {country.name}>
            <div className = {style.panel}>
            <div className = {style.panel_left}>
                <div className = {style.overview_panel}>

                    <img src = {country.flag} alt = {country.name}/>
                    <h1 className = {style.overview_name}>{country.name}</h1>

                    <div className = {style.overview_region}>{country.region}</div>
                    <div className = {style.overview_numbers}>
                        <div className = {style.overview_population}>
                            <div className = {style.overview_value}>{country.population}</div>
                            <div className = {style.overview_label}>Population</div>
                        </div>
                        <div className = {style.overview_area}>
                            <div className = {style.overview_value}>{country.area}</div>
                            <div className = {style.overview_label}>Area</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = {style.panel_right}>
                <div className= {style.details}>
                    <h4 className = {style.details_heading}>Details</h4>
                    <div className = {style.details_row}>
                        <div className = {style.details_label}>Capital</div>
                        <div className = {style.details_value}>{country.capital}</div>
                    </div>

                    <div className = {style.details_row}>
                        <div className = {style.details_label}>Languages</div>
                        <div className = {style.details_value}>
                        {country.languages.map(({name}) => name).join(', ')} 
                        </div>
                    </div>

                    <div className = {style.details_row}>
                        <div className = {style.details_label}>Currencies</div>
                        <div className = {style.details_value}>
                        {country.currencies.map(({name}) => name).join(', ')} 
                        </div>
                    </div>

                    <div className = {style.details_row}>
                        <div className = {style.details_label}>Native name</div>
                        <div className = {style.details_value}>{country.nativeName}</div>
                    </div>

                    <div className = {style.details_row}>
                        <div className = {style.details_label}>Gini</div>
                        <div className = {style.details_value}>{country.gini}</div>
                    </div>

                    <div className = {style.borders}>
                        <div className= {style.border_label}>Border</div>
                        <div className = {style.border_container}>
                            {borders.map(({flag, name}) =>{
                                return <div className = {style.border_inner}>
                                    <img src = {flag} alt = {name}/>
                                    <div className = {style.country_name}>{name}</div>
                                </div>
                            })}
                        </div>
                        
                        </div>
                </div>
            </div>
                

                
               

            </div>
    </Layout>
    
}


export const getServerSideProps = async ({params}) =>{

        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`)
    
        const country = await res.json()
    
    
    return {
      props:{
        country
      }
    }
  }


export default Country
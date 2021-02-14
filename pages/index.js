import styles from '../styles/Home.module.css'
import Layout from '../components/layout/Layout'
import SearchInput from  '../components/search/searchInput'
import CountriesTable from '../components/countriesTable/countriesTable'
import {useState} from 'react'

export default function Home({countries}) {

  const [keyword, setKeyword] = useState('')

  const filteredCountries = countries.filter(item => item.name.toLocaleLowerCase().includes(keyword) ||item.region.toLocaleLowerCase().includes(keyword)  )




  return <Layout>
    <div className = {styles.counts}>{countries.length}</div>
    <SearchInput placeholder = 'Filter by Name, Region or Country' onChange = {(e) => setKeyword(e.target.value.toLocaleLowerCase())}/>
    <CountriesTable countries = {filteredCountries}/>
  </Layout>
}

export const getStaticProps = async () =>{
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  
  const countries = await res.json()
  return {
    props:{
      countries
    }
  }
}

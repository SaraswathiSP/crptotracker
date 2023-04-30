import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrenciesList from '../CryptocurrenciesList'
import './index.css'

const CryptocurrencyTracker = () => {
  const [cryptoList, setCryptoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

  const getCryptoList = async () => {
    const data = await fetch(apiUrl)
    const response = await data.json()
    const updatedData = response.map(each => ({
      currencyName: each.currency_name,
      usdValue: each.usd_value,
      euroValue: each.euro_value,
      id: each.id,
      currencyLogo: each.currency_logo,
    }))
    console.log(updatedData)
    setCryptoList(updatedData)
    setIsLoading(false)
  }

  useEffect(() => {
    getCryptoList()
  }, [])

  return (
    <div className="app-container">
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="Rings" color="#ffffff" height={80} width={80} />
        </div>
      ) : (
        <CryptocurrenciesList cryptoList={cryptoList} />
      )}
    </div>
  )
}

export default CryptocurrencyTracker

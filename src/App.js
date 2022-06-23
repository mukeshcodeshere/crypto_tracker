import {useState,useEffect} from "react"
// CoinCap API -> 'https://api.coincap.io/v2/assets?limit=10'

function App(){
  const [coins,setcoins] = useState([])
  const [limit,setLimit] = useState(10)
  useEffect(
    () => {
      const fetch_coin = async() => {
        const result = await fetch('https://api.coincap.io/v2/assets?limit='+limit)
        const data_object = await result.json()
        console.log(data_object.data) //first data is an object ; actual data is inside the object
        setcoins(data_object.data)
      }
      fetch_coin() 
    } , [limit]//to ensure console log does not keep fetching and only renders after first fetch ; if not will run out of requests to API ; second limit array is to ensure app keeps fetching 
  )

  // refresh_to_top function changes limit back to original state variable and scrolls to top of pages
  const refresh_to_top = () => {
    setLimit(10) 
    window.scrollTo(0,0)
  }


  
  return (
    <section className="coins">

      <article>
        <p>{coins.length} coins retrieved</p>
      </article>


      <h1>Cryptocurrency Tracker</h1>
      <h5>
        <p>Powered by <a href="https:coincap.io">CoinCap</a></p>
      </h5>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Coin Name</th>
            <th>Symbol</th>
            <th>Price/USD</th>
            <th>Market Cap/USD</th>
            <th>Supply</th>
            <th>24 hour Volume</th>
            <th>% Change in 24 hours</th>
            <th>Volume-Weighted Avg Price/USD</th>
            
            
          </tr>
        </thead>
        <tbody>
          {coins.map(({id,name,rank,symbol,marketCapUsd,volumeUsd24Hr,priceUsd,supply,changePercent24Hr,vwap24Hr})=>(
            <tr key = {id}>
              <td>{rank}</td>
              <td>{name}</td>
              <td>{symbol}</td>
              <td>{parseFloat(priceUsd).toFixed(3)}</td>
              <td>{parseInt(marketCapUsd)}</td>
              <td>{parseFloat(supply).toFixed(2)}</td>
              <td>{parseInt(volumeUsd24Hr)}</td>
              <td>{parseFloat(changePercent24Hr).toFixed(2)}%</td>
              <td>{parseFloat(vwap24Hr).toFixed(2)}</td>
            </tr>
          ))}
        </tbody> 
      </table>
      <div className="buttons">
        <button onClick={() => setLimit(limit + 10)}>+10 COINS</button>
        <button onClick={refresh_to_top}>RELOAD</button> 
      </div>

    </section>
  )
}

export default App;

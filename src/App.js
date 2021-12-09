import React,{useState,useEffect} from 'react';
import axios from 'axios';  
import Coin from './Coin';
import "./App.css"
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

export default function App() {
  const[coins,setCoins]=useState([]);
  const[search,setSearch]=useState('');
  const handleChange=(e)=>{
    setSearch(e.target.value)
  }
 
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
  );




  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
      console.log(res.data)
    }).catch(err=>console.log(err))
  },[])
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="input" className="coin-input" placeholder="search" onChange={handleChange} >

             </input>
        </form>
        </div>
        {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
         
      

    </div>
  )
}
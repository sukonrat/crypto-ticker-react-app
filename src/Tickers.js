import React, { Component } from "react";
import axios from "axios"
import "./Tickers.css";
import Cryptocurrency from "./Cryptocurrency.js";

class Tickers extends Component {
  //trigger when component is called
  constructor(props) {
    super(props);

    //default data then stored data in component
    this.state = {
      data: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          price_usd: "1",
          percent_change_1h: '0',
          percent_change_24h: '0',
          percent_change_7d: '0',
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          price_usd: "1",
          percent_change_1h: '0',
          percent_change_24h: '0',
          percent_change_7d: '0',
        },
        {
          id: "litecoin",
          name: "Litecoin",
          symbol: "LTC",
          price_usd: "1",
          percent_change_1h: '0',
          percent_change_24h: '0',
          percent_change_7d: '0',
        },
      ],
    };
  }

  //fetch data through api
  fetchCryptocurrencyData(){
    axios.get('https://api.coinmarketcap.com/v1/tricker/?limit=10')
    .then(response => {
        let wanted = ["bitcoin", "ethereum", "litecoin"];
        let result = response.data.filter(currency => wanted.includes(currency.id)); //filter wanted data by using id //includes - only included data id
        this.setState({
            data: result
        })
        .catch(err => console.log(err));
    })
  }

  componentDidMount(){
      this.fetchCryptocurrencyData();
      this.interval= setInterval(() => this.fetchCryptocurrencyData(), 60*10); //updated data every 0.6s
  }
  //return jsx systax
  render() {
    //access data and loop data array then stored data in parameter(currency)
    let tickers = this.state.data.map((currency) => (
      //map function need to set key props(id) to identified the unique id, then display as a list
      <Cryptocurrency data={currency} key={currency.id}/>
    ));

    return (
      <div className="tickers-container">
        <ul className="tickers">{tickers}</ul>
        <p>information updated every minute</p>
      </div>
    );
  }
}

export default Tickers;

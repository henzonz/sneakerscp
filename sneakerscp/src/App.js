import './assets/css/App.css';
import './assets/css/bootstrap.min.css'
import Axios from "axios"
import { useEffect, useState } from 'react';

//https://ac.cnstrc.com/search/yeezy%20350?c=ciojs-client-2.29.12&key=key_XT7bjdbvjgECO5d8&i=304dfa84-55c2-4423-82f6-945c8450c185&s=3&page=1&num_results_per_page=24&fmt_options%5Bhidden_fields%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_fields%5D=gp_instant_ship_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_instant_ship_lowest_price_cents_3&_dt=1674685709373
function App() {
  const API_URL = 'https://ac.cnstrc.com/search/'
  const [shoeData, setShoeData] = useState([]);
  const [searchShoe, setSearchShoe] = useState("");

  function getURL(search) {
    const url = `${API_URL}${search.replace(/ /g, "%20")}` + '?c=ciojs-client-2.29.12&key=key_XT7bjdbvjgECO5d8&i=304dfa84-55c2-4423-82f6-945c8450c185&s=3&page=1&num_results_per_page=24&fmt_options%5Bhidden_fields%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_fields%5D=gp_instant_ship_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_instant_ship_lowest_price_cents_3&_dt=16746857093'
    return Axios.get(url);
  }
  useEffect(() => {
    getURL(searchShoe).then(response => {
      setShoeData(response.data.response.results)
      console.log(response.data.response.results)
    })
  }, [searchShoe]);

  function handleSearch(event) {
    setSearchShoe(event.target.value);
  }
  return (
    <div className="App">
      <div className="search-input pt-3">
        <input
          type="text"
          value={searchShoe}
          placeholder="Search"
          onChange={handleSearch}
        >
        </input>
      </div>
      {/* shoe search results */}
      <div className="container">
        <div className="row">
          {shoeData.map((shoe, index) => {
            return (
              (shoe.data.category === 'shoes') ?
                <div className="col p-2">
                  <div className="card h-100" style={{ width: '14rem' }}>
                    <img className="card-img-top" src={shoe.data.image_url} style={{ height: '200px', width: '200px' }} alt="card-img" />
                    <div className="card-body">
                      <div className="card-title" style={{ fontWeight: 'bold', fontSize: '1.15rem' }}> {shoe.value} </div>
                      <p className="card-text">Sample quick text to build this card</p>
                    </div>
                  </div>
                </div> :
                <></>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
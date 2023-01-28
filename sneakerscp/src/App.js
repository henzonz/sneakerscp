import './assets/css/App.css';
import './assets/css/bootstrap.min.css'
import SearchIcon from './assets/img/search.png'
import GoatLogo from './assets/img/goat-logo-512.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios"
import { useEffect, useState } from 'react';

//https://ac.cnstrc.com/search/yeezy%20350?c=ciojs-client-2.29.12&key=key_XT7bjdbvjgECO5d8&i=304dfa84-55c2-4423-82f6-945c8450c185&s=3&page=1&num_results_per_page=24&fmt_options%5Bhidden_fields%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_fields%5D=gp_instant_ship_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_instant_ship_lowest_price_cents_3&_dt=1674685709373
function App() {
  const API_URL = 'https://ac.cnstrc.com/search/'
  const [shoeData, setShoeData] = useState([]);
  const [searchShoe, setSearchShoe] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  function getURL(search) {
    const url = `${API_URL}${search.replace(/ /g, "%20")}` + '?c=ciojs-client-2.29.12&key=key_XT7bjdbvjgECO5d8&i=304dfa84-55c2-4423-82f6-945c8450c185&s=3&page=1&num_results_per_page=25&fmt_options%5Bhidden_fields%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_fields%5D=gp_instant_ship_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_lowest_price_cents_3&fmt_options%5Bhidden_facets%5D=gp_instant_ship_lowest_price_cents_3&_dt=16746857093'
    return Axios.get(url);
  }
  useEffect(() => {

    getURL(searchShoe).then(response => {
      setShoeData(response.data.response.results)
      console.log(response.data.response.results)
    })

  }, [searchShoe]);

  function handleSearch(event) {
    setTempSearch(event.target.value);
  }
  function handleKeyPressed(event) {
    if (event.key === "Enter") {
      setTimeout(() => {
        setSearchShoe(tempSearch)
      }, 1500)
    }
  }
  return (
    <div className="main-screen">
      <div className="search-container pt-3">
        <input
          className="border border-secondary rounded-pill"
          type="text"
          value={tempSearch}
          onChange={handleSearch}
          onKeyDown={handleKeyPressed}
        />
        <FontAwesomeIcon className="search-icon text-muted" icon={faMagnifyingGlass} />

      </div>
      {/* shoe search results */}
      <div className="container">
        <div className="row">

          {shoeData.map((shoe) => {
            return (
              (shoe.data.category === 'shoes') ?
                <div className="col py-3" key={shoe.data.id}>
                  <div className="card shadow h-100" style={{ width: '14rem' }}>
                    <div className="shoe-year font-italic font-weight-bold">{shoe.data.release_date_year}</div>
                    <img className="card-img-top shoe-img" src={shoe.data.image_url} style={{ height: '200px', width: '200px' }} alt="card-img" />
                    <div className="card-body">
                      <div className="card-title h-50" style={{ fontWeight: 'bold', fontSize: '1.05rem' }}> {shoe.value} </div>
                      <div className="shoe-info mt-4">
                        <img className="mp-logo" style={{ width: '32px', height: '32px' }} src={GoatLogo} />
                        <div className="shoe-price">${parseFloat((shoe.data.gp_lowest_price_cents_3) / 100).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>


                :
                <></>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default App;

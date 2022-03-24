import React,{useState,useEffect} from "react";
import './App.css';


const api ={
 key : '3b1def1634fd5bd3468f31aca2a06cec',
 base : 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [searchInput,setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(false);

  useEffect(()=>{

      const fetchWeather = async () => {
        if (!searchCity) return;
        setLoading(true);
        //Process
          try {
              const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok){
                setWeatherInfo(
                        `Nation:  ${data.sys.country}
                        Weather:  ${data.weather[0].description}
                        Temperature:  ${data.main.temp}
                        `
                );
                setErrorMessage("");
            }else {
                setErrorMessage(data.message);
            }
          }catch (error){
              setErrorMessage(error.message);
          }
        setLoading(false);
      };
      fetchWeather();

  },[searchCity]);

  const handleSubmit = (e) =>{
      e.preventDefault();
      setSearchCity(searchInput);
  };

  return (
      <>
        <form onSubmit={handleSubmit} className="weather">
          <input className={"search-box"}
                 type="text"
                 placeholder="City"
                 value={searchInput}
                 onChange={(e)=>setSearchInput(e.target.value)}/>
            {loading ? (<div>Loading...</div>) : (
                <>
                    {errorMessage ? (
                        <div style={{color:"red"}}>{errorMessage}</div>
                    ) : (
                        <div className="active">{weatherInfo}</div>
                    )}
                </>
            )}
        </form>
          <button className="Search-button" onClick={handleSubmit}>
              <span>Search</span>
          </button>
      </>
  );
}

export default App;

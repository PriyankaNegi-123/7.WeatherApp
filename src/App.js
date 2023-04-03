import "./App.css";
import hot from './assets/hot.jpg';
import cold from './assets/cold.jpg';
import Description from "./components/Description";
import { useEffect, useState } from "react";
import  getFormattedWeatherData  from "./weatherService";

const App = ()=>{
    const [city, setCity] = useState('paris');
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("metric");
    const [bg, setBg] = useState(hot);
    
    useEffect(()=>{
        const fetchWeatherData = async ()=>{
        const data = await getFormattedWeatherData(city, units)
        setWeather(data);

        // bg image
        const threshold = units === 'metric' ? 20 : 70;
        if(data.temp<= threshold) setBg(cold)
        else setBg(hot)
        };
        fetchWeatherData();
    }, [units, city])

    // to convert to F
    const handleUnitsClick = (e)=>{
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1)
        const isCelsius = currentUnit === "c";
        button.innerText = isCelsius ? "°F" : "°C";
        setUnits(isCelsius ? "metric" : "imperial")
    }

    // input handler
    const enterKeyPressed = (e)=>{
        if (e.keyCode===13){
            setCity(e.currentTarget.value)
        }
    }

    return(
        <div className="app" style={{backgroundImage:`url(${bg})`}}>
            <div className="overlay">
                {weather && (
                <div className="container">
                    <div className="section section_input">
                        <input onKeyDown={enterKeyPressed} type='text' name="city" placeholder="Enter city..."/>
                        <button onClick={(e)=>handleUnitsClick(e)}>&deg;F</button>
                    </div>
                    <div className="section section_temp">
                        <div className="icon">
                            <h3>{`${weather.name}, ${weather.country}`}</h3>
                            <img src={weather.iconURL} alt="icon-img"/>
                            <h3>{weather.description}</h3>
                        </div>
                        <div className="temp">
                            <h1>{weather.temp.toFixed()}&deg;{units==="metric"? "C" : "F"}</h1>
                        </div>
                    </div>
                    <Description weather={weather} units={units}/>
                </div>
                )}
            </div>
        </div>
    )
}

export default App;
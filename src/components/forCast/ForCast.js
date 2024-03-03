import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import apiKeys from "../../utils/apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { FaSearch } from "react-icons/fa";
import "./ForCast.css";
const ForCast = (props) => {
  const [query, setQuery] = useState([]);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.api_key}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
        setQuery("");
      })
      .catch((err) => {
        console.log(err);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };
  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <>
      <div className="container">
        <div className=" right-section ">
          <div className="icon text-center">
            <ReactAnimatedWeather
              icon={props.iconData}
              size={defaults.size}
              color={defaults.color}
              animate={defaults.animate}
            />
          </div>
          <div className="weather-title">
            <h2 className="text-center pt-2">{props.weatherTitle}</h2>
            <hr />
          </div>
          <div className="search  ">
            <input
              type="text"
              placeholder="search any city"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />

            <div className="search-icon">
              <FaSearch onClick={search} />
            </div>
          </div>

          {typeof weather?.main !== "undefined" ? (
            <div className="search-result">
              <div
                className="weather-title text-center 
          pt-4"
              >
                <h5>
                  {weather?.name} , {weather?.sys?.country}
                </h5>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`}
                  alt="weather-icon"
                />
              </div>
              <div className="weather-description ">
                <div>
                  <ul>
                    <li>Temperature </li>
                    <li>{Math.floor(weather?.main?.temp).toString()}°C</li>
                  </ul>
                  <hr />
                </div>
                <div>
                  <ul>
                    <li>Humidity</li>
                    <li>{weather?.main?.humidity}%</li>
                  </ul>
                  <hr />
                </div>
                <div>
                  <ul>
                    <li>Visibility</li>
                    <li>{weather?.visibility} mi</li>
                  </ul>
                  <hr />
                </div>
                <div>
                  <ul>
                    <li>Wind Speed</li>
                    <li>{weather?.wind?.speed} Km/h</li>
                  </ul>
                  <hr />
                </div>
              </div>
            </div>
          ) : (
            <ul className="else-block">
              <li>
                {error.query} {error.message}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ForCast;

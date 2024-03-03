import React from "react";
//import Clock from "react-live-clock";
import { useState, useEffect } from "react";
import apiKeys from "../../utils/apiKeys";
import "./CurrentLocation.css";
import ForCast from "../forCast/ForCast";
//import bgImg1 from "../../images/background.jpg";
const CurrentLocation = () => {
  const [lat, setLat] = useState(28.67);
  const [long, setLong] = useState(77.22);
  const [iconData, setIconData] = useState();
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    return setToggle(!toggle);
  };

  const getDayInfo = (d) => {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} , ${date} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
        const api = `${apiKeys.base}weather?lat=${lat}&lon=${long}&units=metric&APPID=${apiKeys.api_key}`;
        console.log(api);
        await fetch(api)
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            console.log("result is --->", result);
            setIconData(result?.weather?.[0]?.main);

            switch (result?.weather?.[0]?.main) {
              case "Haze":
                setIconData({ icon: "CLEAR_DAY" });
                break;
              case "Clouds":
                setIconData({ icon: "CLOUDY" });
                break;
              case "Rain":
                setIconData({ icon: "RAIN" });
                break;
              case "Snow":
                setIconData({ icon: "SNOW" });
                break;
              case "Dust":
                setIconData({ icon: "WIND" });
                break;
              case "Drizzle":
                setIconData({ icon: "SLEET" });
                break;
              case "Fog":
                setIconData({ icon: "FOG" });
                break;
              case "Smoke":
                setIconData({ icon: "FOG" });
                break;
              case "Tornado":
                setIconData({ icon: "WIND" });
                break;
              default:
                setIconData({ icon: "CLEAR_DAY" });
            }
          });
      } else {
        return alert("please allow access to location");
      }
    };
    fetchData();
  }, [lat, long]);

  return (
    <>
      <div className="container">
        <div className=" parent ">
          <div className=" left-section">
            <div className="text-end place-info">
              <h2>{data.name}</h2>
              <p>{data?.sys?.country}</p>
            </div>
            <div className="left-section-bottom">
              <div className="date-time ">
                <div className="time"></div>
                <div className="date">{getDayInfo(new Date())}</div>
              </div>
              <div className="temp-description" onClick={handleToggle}>
                {toggle ? (
                  <p>
                    {Math.floor(data?.main?.temp * 1.8 + 32)}
                    <span>°F</span>
                  </p>
                ) : (
                  <p>
                    {Math.floor(data?.main?.temp)}
                    <span>°C</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="right-section">
            <ForCast
              iconData={iconData?.icon}
              weatherTitle={data?.weather?.[0]?.main}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentLocation;

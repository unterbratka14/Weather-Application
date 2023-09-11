/* eslint-disable no-unused-vars */
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { useState } from "react";

const WheatherApp = () => {
  let api_key = "b3b0346d0115fb461f2dbaf3d7b54e4a";

  const [wicon, setWicon] = useState(cloud_icon);

  // When we click on the search icon then it will run the search() function. If the value inside the input is an empty string it will return 0, if it is not then our url will be constructed. Inside the url we will get the value that we typed inside input, and we are using the api_key to fetch the data. We store the data inside the response variable. After storing the data inside the response variable we are parsing the data into json.
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json(); // Parse the data into the JSON format, await is added to wait until our data is converted to json format.
    const humidity = document.getElementsByClassName("humidity");
    const wind = document.getElementsByClassName("wind_speed");
    const temperature = document.getElementsByClassName("temperature");
    const city = document.getElementsByClassName("city");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
    city[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }

    document.getElementById("input_field").value = "";
  };

  return (
    <div className="w-1/2 h-3/4 min-w-[300px] min-h-[600px] rounded absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b from-[#130754] to-[#3b2f80]">
      <div className="flex justify-center gap-5 pt-16">
        <input
          className="rounded h-10 w-60 cityInput"
          type="text"
          placeholder="Search"
          id="input_field"
        />
        <div className="bg-white h-10 w-10 rounded-full flex justify-center items-center">
          <button onClick={search}>
            <img src={search_icon} alt="search_icon" />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={wicon} alt="cloud_icon" />
      </div>
      <div className="flex justify-center text-white text-6xl temperature">
        24°C
      </div>
      <div className="flex justify-center text-white text-6xl city">London</div>
      <div className="flex justify-center gap-10">
        <div className="flex items-center text-white mt-8 gap-2">
          <img src={humidity_icon} alt="humidity_icon" className="h-7" />
          <div className="flex flex-col">
            <p className="humidity">87%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="flex items-center text-white mt-8 gap-2">
          <img src={wind_icon} alt="wind_icon" className="h-7" />
          <div className="flex flex-col">
            <p className="wind_speed">5.14km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div> // Container for the whole app
  );
};

export default WheatherApp;

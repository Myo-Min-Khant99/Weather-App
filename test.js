let condition_value = document.getElementById("condition_value")
let timeOfDay_value = document.getElementById("timeOfDay_value")
let day_value = document.getElementById("day_value")
let time_value = document.getElementById("time_value")
let country_value = document.getElementById("country_value")
let icon_value = document.getElementById("icon_value")
let temp_value = document.getElementById("temp_value")
let pressure_value = document.getElementById("pressure_value")
let humidity_value = document.getElementById("humidity_value")
let wind_value = document.getElementById("wind_value")
let date = new Date();
let background_color_transition = document.querySelector('.testing');
let background_image_1 = document.getElementById("bg_img1");
let background_image_2 = document.getElementById("bg_img2");

function getDayOrNight(hour) {
  let dayOrnight
  if (hour >= 6 && hour <= 17) {
    dayOrnight = "day";
  }else {
    dayOrnight = "night"
  }
  themeChange(dayOrnight);
  return dayOrnight
}

function themeChange(dayOrnight) {
  console.log("it went through")
  if (dayOrnight == "day") {
    background_color_transition.classList.add('change-opacity');
    background_color_transition.classList.remove('hehe');
    background_image_1.src = "img/sun.png"
    background_image_2.src = "img/rainbow.png"
  }else {
    background_color_transition.classList.remove('change-opacity');
    background_color_transition.classList.add('hehe');
    background_image_1.src = "img/moon.png"
    background_image_2.src = "img/star.png"
  }
}

function WeatherImg(condition) {
  let result
  if (condition.includes("Cloudy") || condition.includes("cloudy")) {
    result = "img/404.png"
  }else if (condition.includes("Rain") || condition.includes("rain")) {
    result = "img/rain.png"
  }else if (condition.includes("Snow") || condition.includes("snow")) {
    result = "img/404.png"
  }else if (condition.includes("Sunny") || condition.includes("sunny")) {
    result = "img/sunny_day.png"
  }else if (condition.includes("Clear") || condition.includes("clear")) {
    result = "img/clear_night.png"
  }else if (condition.includes("Overcast") || condition.includes("overcast")) {
    result = "img/404.png"
  }else if (condition.includes("Mist") || condition.includes("mist")) {
    result = "img/404.png"
  }else {
    result = "img/404.png"
  }
  return result
}

function dayCondition(hour) {
  let timeOfDay
  if (hour >= 1 && hour <= 3) {
    timeOfDay = "Late Night";
  } else if (hour >= 4 && hour <= 6) {
    timeOfDay = "Early Morning";
  } else if (hour >= 7 && hour <= 11) {
    timeOfDay = "Morning";
  } else if (hour >= 12 && hour <= 16) {
    timeOfDay = "Afternoon";
  } else if (hour >= 17 && hour <= 19) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }
  return timeOfDay 
}

function getDay(timezone) {
  let options = { timeZone: timezone };
  let day ;
  let blah = date.getDay('en-US', options);
  let blah2 = date.toLocaleString('en-US', options);
  switch (blah) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
       day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;  
    case 6:
      day = "Saturday";
  }
  return day
}

document.getElementById("my_form").addEventListener("submit", function(event) {
  event.preventDefault();
  let country_name = document.getElementById("country_name").value;
  let api_id = '4129359bb41e458492534903242304'
  let url = `https://api.weatherapi.com/v1/current.json?key=${api_id}&q=${country_name}`
  
  fetch(url).then(data => {
    if(data["status"] == 200) {
      return data.json()
    }else {
      document.getElementById("alert").innerHTML = "That country is not currently available in this Earth";
    }
  }).then(data => {
    console.log(data)
    let temp = data["current"]["temp_c"];
    let pressure = data["current"]["pressure_mb"];
    let humidity = data["current"]["humidity"];
    let wind = data["current"]["wind_kph"];
    let city = data["location"]["name"];
    let country = data["location"]["country"];
    let condition = data["current"]["condition"]["text"];
    let time = data["location"]["localtime"];
    let timezone = data["location"]["tz_id"];
    let day = getDay(timezone);
    let hours = time.slice(11, 13);
    let hour_filter = hours.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '');
    let weather_condition =  WeatherImg(condition)

    getDayOrNight(hour_filter);

    condition_value.innerHTML = condition
    timeOfDay_value.innerHTML = dayCondition(hour_filter)
    day_value.innerHTML = day
    time_value.innerHTML = time.slice(10)
    country_value.innerHTML = city + " (" + country + ")"
    icon_value.src = weather_condition
    temp_value.innerHTML = temp;
    pressure_value.innerHTML = pressure;
    humidity_value.innerHTML = humidity;
    wind_value.innerHTML = wind;

  }).catch (err => { alert(err) })
});
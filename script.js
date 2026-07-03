
// yaad kr lo khuch class jo hoti wo desgin ke liye declare hoti hai
let cityname = document.querySelector(".weather_city")
let datetime = document.querySelector(".weather_date_time")
let w_forcast = document.querySelector(".weather_forcast")
let w_temperature = document.querySelector(".weather_temperature")
let w_icon = document.querySelector(".weather_icon")
let w_minterm = document.querySelector(".weather_min")
let w_maxterm = document.querySelector(".weather_max")
let w_feelslike = document.querySelector(".weather_feelslike")
let w_humidity = document.querySelector(".weather_humidity")
let w_wind = document.querySelector(".weather_wind")
let w_pressure = document.querySelector(".weather_pressure")


// yha se humne form ka search baar access kiya hai
let citysearch = document.querySelector(".weather_search");


// iss function ke through humne code ko NAME mein convert kare
const getcountryname = (code) =>{
    return new Intl.DisplayNames([code],{type : "region"}).of(code);
}


// iss function ke through humne code ko TIME mein convert kiya hai
const getdatetime = (dt) =>{
   const curdate = new Date(dt * 1000)
//    console.log(curdate);
      const options ={
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric",
        hour : "numeric",
        minute : "numeric",
      }

      const formatter = new Intl.DateTimeFormat("en-US",options)
      const formatteddate = formatter.format(curdate);
      return formatteddate;
   
}

let city = "jalalabad"


// yaha pe event listner lgya hai 
citysearch.addEventListener("submit",(e)=>{

    // jo hai form ka default behaviour rokega
       e.preventDefault();

   let cityname = document.querySelector(".city_name")
   console.log(cityname.value);
   
   city = cityname.value;
   getweatherdata();
   cityname.value = " ";
})



const getweatherdata = async()=>{
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=73cc2e43c529adf747a9862c52af5bef`;
   
   try{
       const res = await fetch(weatherurl)
       const data = await res.json()
       console.log(data);
       
       // destructuring the data
     const {dt,main,name,sys,weather,wind} = data;

     cityname.innerHTML = `${name},${getcountryname(sys.country)}`
     datetime.innerHTML = getdatetime(dt);

     // ye extra cheeze isliye likhi kyunki hume degree bhi chahiye thee
     w_temperature.innerHTML = `${((main.temp)-273.15).toFixed(2)}&#176`;
     w_minterm.innerHTML = `Min :${Math.floor(main.temp_min)}&#176`
     w_maxterm.innerHTML = `Max :${Math.ceil(main.temp_max)}&#176`

     w_feelslike.innerHTML = `${main.feels_like.toFixed(2)}&#176`
     w_humidity.innerHTML = `${main.humidity}%`
     w_wind.innerHTML = `${wind.speed}m/s`
     w_pressure.innerHTML = `${main.pressure} hpa`

     // ye carefully karna kyunki ye array se data fetch kr rhe hai
     w_forcast.innerHTML = weather[0].main;

     // ismien to code se photo laani hai
     w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`
   }

   catch(err){
     console.log(err);
     
   }
}



//load wali line isliye likhi h ki jesi hi aap page load kare to weather dekhye
window.addEventListener("load",getweatherdata);

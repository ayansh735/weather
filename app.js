// Select DOM
const temp = document.querySelector(".temp");
const contition = document.querySelector(".contition");
const city = document.querySelector(".city");
const hiLow = document.querySelector(".hi-low");
const date = document.querySelector(".date");

//Search Query
const form = document.querySelector("#form");
const search = document.querySelector(".search");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(search.value){
        fetchApi(search.value);
    }
})

const fetchApi = async (city) => {
        const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73b23aa07a4635d1fece272e5ad8a55f`);
        const respData = await resp.json();
        if(respData.cod == 404){
            alert(`There Is No Named City As ${city}`)
        } else{
            showInfo(respData);
        }
}

const showInfo = (data) => {
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = getDate();
    temp.innerHTML = `${Math.round(data.main.temp - 273.15)}<span>°c</span>`;
    contition.innerHTML = data.weather[0].main;
    hiLow.innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.ceil(data.main.temp_max - 273.15)}°c`;
}

const getDate = () => {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getDay()];
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`;
}
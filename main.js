const input_city = getElement(".input-city")
const section = getElement(".section")
const bg = getElement(".bg")
const url = 'https://api.openweathermap.org/data/2.5/weather?appid=76394e1a21461e3743e211bec74d9384&q='

var weather;
var city;


function getElement(element) {
    return document.querySelector(element)
}


function switchBg(url) {
    bg.style.backgroundImage = url
}


function formater(word) {
    let newWord = word.charAt(0).toUpperCase()
    for (let c = 1; c < word.length; c++) {
        if (word[c - 1] == ' ') {
            newWord += word.charAt(c).toUpperCase()
        } else {
            newWord += word.charAt(c)
        }
    }

    return newWord
}


function request(city) {
    fetch(url + city)
        .then(response => response.json())
        .then(data => {

            weather = data

        })
        .catch(error => {
            notFound()
        })
}


function found(weather) {
    if (weather.temp_max == weather.temp_min) {
        var card = `
    <div class="block">
        <h1>${city}</h1>
        <div class="main">
            <div class="information">
            <div class="information">
                <h2>${toCelsius(weather.temp)}C</h2>
                <h4>Now</h4>
            </div>
        </div>
    </div>
    `;
    } else {
        var card = `
    <div class="block">
        <h1>${city}</h1>
        <div class="main">
            <div class="information">
                <h2>${toCelsius(weather.temp_min)}C</h2>
                <h4>Min</h4>
            </div>
            <hr width="0px" height="20px">
            <div class="information">
                <h2>${toCelsius(weather.temp)}C</h2>
                <h4>Now</h4>
            </div>
            <hr width="0px" height="20px">
            <div class="information">
                <h2>${toCelsius(weather.temp_max)}C</h2>
                <h4>Max</h4>
            </div>
        </div>
    </div>
    `;
    }
    section.innerHTML = card

}


function toCelsius(temp) {
    let covertion = temp - 273
    return parseFloat(covertion.toFixed(0))
}


function startApp() {
    city = formater(input_city.value) //.charAt(0).toUpperCase()+input_city.value.slice(1)

    section.innerHTML = `<h1>Searching ${city}...</h1>`
    request(city)
    setTimeout(function () {
        //switchBg(urlImage)
        if (weather.cod == 404) {
            notFound()

        } else {
            found(weather.main)
        }
    }, 2000)
}

function notFound() {
    let card = `
    <div class="error">
        <h1 color="red">${city} Not Found!</h1>
    </div>
    `;
    section.innerHTML = card
}


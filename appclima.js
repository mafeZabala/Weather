/* se crea una variable para guardar la key(contraseña)y la url de la api */
const apiWeather ={
    key:'0d3ba7268862039c05f77a1d054c4a1d',
    url:`https://api.openweathermap.org/data/2.5/weather`
}
const section = document.getElementById('contenedorPrincipal');
const divsearch = document.getElementById('PrincipalSearch')
const searchInput = document.getElementById('search')
const climaCity = document.getElementById('climaCity')
const climaDate = document.getElementById('climaDate')
const temperatureImg = document.getElementById('temperatureImg')
const temperatureText = document.getElementById('temperatureText')
const weather = document.getElementById('weather')
const range = document.getElementById('range')

function transformGrad (kelvin) {
    return Number(kelvin - 273.15).toFixed(2)
}
/* cuando hay un evento(submit) se corre una funcion */
divsearch.addEventListener('submit',createSubmit,true)
/* funcion asincrona para la informacion de la api */
async function buscar(query){
    /* trype..catch: previene un error,llegado al caso que suceda toma ese error y deja pasar al siguiente */
    try{
        /*  se utiliza la url para buscar los paises y cuidad, se pasa la llave y su lenguaje*/
        const reponse = await fetch(`${apiWeather.url}?q=${query}&appid=${apiWeather.key}&lang=es`);
        const data = await reponse.json();
        climaCity.innerHTML = `${(data.name).substring(0,3)},${data.sys.country}`;
        /* toLocaledatestring: devuelve una cadena con el idioma de la fecha especifica de la zona horaria */
        climaDate.innerHTML = (new Date()).toLocaleDateString()
        const temperaturaGrados = transformGrad(data.main.temp)
        temperatureText.innerHTML = temperaturaGrados;
        weather.innerHTML = data.weather[0].description;
        const minTemp = transformGrad(data.main.temp_min)
        const maxTemp = transformGrad(data.main.temp_max)
        range.innerHTML = `${minTemp}/${maxTemp}`
        const ruta = imagen(temperaturaGrados)
        temperatureImg.setAttribute('src',ruta)
        console.log(data);
       /*  console.log("hola") */
    }catch(error){
        console.log(error);
    }

}

function imagen(temperatura){
    let src = './img/temperature-media.svg'
    if(temperatura > 26){
        src = './img/temperature-high.svg'
    }
    if(temperatura < 20){
        src = './img/temperature-low.svg'
    }
    return src
}

function createSubmit(evento){
    /* evitar una renderizacion */
    evento.preventDefault()
    buscar(searchInput.value);
    /* console.log("hola") */
}

buscar("Bucaramanga")

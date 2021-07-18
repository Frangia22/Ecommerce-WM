// Llamar api del clima
//Url
const url = "https://ws.smn.gob.ar/map_items/weather";
console.log(url);
fetch(url)
	.then(res =>{
		if(res.ok){
			console.log(res);
			//Traer el Json
			res.json().then(clima => {
				//Buscar localidad
				const localidad = clima.find( valor => {
					return  valor.name == "Laboulaye";
				});
				//Almaceno el valor de la temperatura
				let tempImg = parseFloat(localidad.weather.tempDesc);
				console.log(tempImg);
				//Creo un elemento a
				let message = document.createElement("a");
				//Si la temperatura es mayor a 25
				if(tempImg > 25){
					message.innerHTML=(`${localidad.name}, ${localidad.province} <img src="/images/high_temp.png" alt="Cuidado! la temperatura es alta"> <strong>${localidad.weather.tempDesc}</strong> ${localidad.weather.description}`);                   
					//Si la temperatura es menor a 10
				}else if (tempImg < 10){
					message.innerHTML=(`${localidad.name}, ${localidad.province} <img src="/images/low_temp.png" alt="Cuidado! la temperatura es baja"> <strong>${localidad.weather.tempDesc}</strong> ${localidad.weather.description}`);
				}else{
					message.innerHTML=(`${localidad.name}, ${localidad.province} <img src="/images/medium_temp.png" alt="La temperatura es agradable"> <strong>${localidad.weather.tempDesc}</strong> ${localidad.weather.description}`);
				}
				//let mostrarClima = document.createElement("p");
				//mostrarClima.innerHTML = (`${localidad.name}, ${localidad.province} ${localidad.weather.tempDesc} ${localidad.weather.description}`);
				message.href = "https://www.smn.gob.ar/";
				message.classList.add("weather-link");
				// eslint-disable-next-line no-undef
				appW.appendChild(message);
				//appW.appendChild(mostrarClima);                
			});
		}else{
			console.error(`Fallo, ${res.status}`);
		}
	})
	.catch(error => {
		console.error(`Fallo, ${error.statusText}`);
	});
//Que cuando toquemos el btn aparezca y desaparezca el menu
// eslint-disable-next-line no-undef
menubtn.addEventListener("click", () => {
	// eslint-disable-next-line no-undef
	nav.classList.toggle("desplegar");
});
// eslint-disable-next-line no-undef
menuFilter.addEventListener("click", () => {
	// eslint-disable-next-line no-undef
	filter.classList.toggle("mostrarFiltro");
	console.log("Hiciste");
});

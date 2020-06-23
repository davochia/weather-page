window.addEventListener('load', ()=>{
    let lat;
    let long;


    // Select Dom elements
    let temperatureDescription = document.querySelector(".temp-description")
    let temperatureDegree = document.querySelector(".temp-degree")
    let locationTimezone = document.querySelector(".loc-timezone")

    let degreeSection = document.querySelector(".temp")
    const degreeSpan = document.querySelector(".temp span")


    // Set location selector of current position
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = "https://cors-anywhere.herokuapp.com/" //proxy to serve our api
            
            //Api link set toa variable
            const api = `${proxy}https://api.darksky.net/forecast/517cf70d12cfe042e1bbeb71977b60a1/${lat},${long}`;

            // fetch the API and save to res(response) variable the convert to JSON
            fetch(api)
                .then(res =>{
                    return res.json();
            })
            .then(data => {

                const {temperature, summary, icon} = data.currently; 

                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary

                locationTimezone.textContent = data.timezone

                // Fereheit to celsuis converter
                let celsius = (temperature - 32) * (5/9)

                // weather icon setttings 
                setIcons(icon, document.querySelector(".icon"))

                // Toggle onclick event to ferenheit or celsius
                degreeSection.addEventListener('click', () =>{
                    if(degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C"
                        temperatureDegree.textContent = Math.floor(celsius)
                    }else{
                        degreeSpan.textContent = "F"
                        temperatureDegree.textContent = temperature
                    }
                })


            });

        });
    }
    // Change the icon to skyicon 
    function setIcons(icon, iconID){

        const skycons = new Skycons({color:'white'})
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])

    }

});
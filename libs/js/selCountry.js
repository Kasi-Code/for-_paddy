document.querySelector('.submit').addEventListener('click', function(event) {
    // event.preventDefault();

    var selCountry = document.getElementById("myInput").value;

        // console.log(selCountry)

        fetch(`/libs/php/selCountry.php?selCountry=${selCountry}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                let countryName = data.country.components.country
                let cityName = data.country.components.city
                let countryFlag = data.country.annotations.flag

                let weatherDescription = data.weather.weather[0].description
                let weatherTemp = data.weather.main.temp

                let cityPopulation = data.population[0].population

                let iso = data.country.annotations.currency.iso_code
                let currencyName = data.country.annotations.currency.name
                let currencySymbol = data.country.annotations.currency.symbol   
                let getCurrencies = data.currency.rates
                let compareToUSD = data.currency.base
                let compareToEUR = "EUR"
                let compareToGBP = "GBP"

                // console.log(localCurrency)

                let wikiLink = data.wikipedia.wikipediaUrl
                
                const kelvin = weatherTemp
                let celsius = kelvin - 273.15
                // let newton = celsius * ( 23 / 100 )
                celsius = Math.floor(celsius)

                $('#countryName').html(countryName);
                $('#cityName').html(cityName);
                $('#flag').html(countryFlag);

                $('#weatherCondition').html(weatherDescription.toUpperCase());
                $('#temperature').append(celsius + "˚C");

                $('#population').append(cityPopulation);

                $('#isoCode').append(iso + ", ");
                $('#currencyName').append(currencyName);
                $('#currencySymbal').append(currencySymbol);

                let link = document.querySelector('.wikipedia');
                    link.setAttribute('href', wikiLink);
                    link.innerHTML = wikiLink;

                // WEATHER ICONS

                const today = new Date()
                const getHour = today.getHours()

                if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){
                    $(".clearskyIcon").css("display", "block")
                } else if (weatherDescription == "cloudy"){
                    $(".clouds").css("display", "block")
                } else if (weatherDescription.includes("rain") || weatherDescription.includes("rainny") || weatherDescription.includes("overcast")){
                    $(".overcastClouds").css("display", "block")
                } else if (weatherDescription.includes("cloud") || weatherDescription.includes("clouds")){
                    $(".sunAndClouds").css("display", "block")
                } else if (weatherDescription.includes("snow")){
                    $(".snow").css("display", "block")
                } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")){
                    $(".thunder").css("display", "block")
                }

                // CURRENCY

                const listOfCurrency = Object.entries(getCurrencies)
                for (const [cName, cValue] of listOfCurrency) {
                    if (iso == cName && iso != compareToUSD && iso != compareToEUR) {
                        // console.log(cValue)
                        $('#localCurrency').append(cValue);    

                        for (const [cName, cValue] of listOfCurrency) {
                            if (compareToUSD == cName) {  
                                $('#secondCurrency').append("To USD $" + cValue); 
                                
                                for (const [cName, cValue] of listOfCurrency) {
                                    if (compareToEUR == cName) {  
                                        $('#thirdCurrency').append("To EUR €" + cValue);                        
                                    }
                                }                           
                            }
                        }                    
                    } else if (iso == cName && iso != compareToGBP && iso != compareToEUR) {
                        $('#localCurrency').append(cValue);    

                        for (const [cName, cValue] of listOfCurrency) {
                            if (compareToGBP == cName) {  
                                $('#secondCurrency').append("To GBP £" + cValue); 
                                
                                for (const [cName, cValue] of listOfCurrency) {
                                    if (compareToEUR == cName) {  
                                        $('#thirdCurrency').append("To EUR €" + cValue);                        
                                    }
                                }                           
                            }
                        }                    
                    } else if (iso == cName && iso != compareToGBP && iso != compareToUSD) {
                        $('#localCurrency').append(cValue);    

                        for (const [cName, cValue] of listOfCurrency) {
                            if (compareToUSD == cName) {  
                                $('#secondCurrency').append("To USD $" + cValue); 
                                
                                for (const [cName, cValue] of listOfCurrency) {
                                    if (compareToGBP == cName) {  
                                        $('#thirdCurrency').append("To BGP £" + cValue);                        
                                    }
                                }                           
                            }
                        }                    
                    }
                }

                // THE MAP

                var lat = data.country.geometry.lat
                var lng = data.country.geometry.lng

                var mymap = L.map('mapid').setView([lat, lng], 13);

                L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mFYXi7zo4EzHjijzbUxG', {
                attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'your.mapbox.access.token'
                }).addTo(mymap);
                var marker = L.marker([lat, lng]).addTo(mymap)
                var circle = L.circle([lat, lng], {
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.5,
                    radius: 1000
                }).addTo(mymap)
                // var featureGroup = L.featureGroup(markers).addTo(map);
                // map.fitBounds(featureGroup.getBounds());
            })
            .catch(error => {console.log(error)})
  });
 
//  function getCountry () {

        
//         }
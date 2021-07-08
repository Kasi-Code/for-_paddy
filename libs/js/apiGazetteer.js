// AUTO LOAD USING X LOACTION

window.onload = function () {

    if ($('#preloader').length) {

        $('#preloader').delay(1000).fadeOut('slow', function () { 
            $(this).remove();

                // TOGGLE

                $(".buttonUp").click(function(){
                    $(".panel").slideToggle("slow");
                });

                navigator.geolocation.getCurrentPosition(position => {
                    long = position.coords.longitude
                    lat = position.coords.latitude
            
                    fetch(`/libs/php/getGazetteer.php?lat=${lat}&long=${long}`)
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
                            let wikiSummary = data.wikipedia.summary
                            
                            const kelvin = weatherTemp
                            let celsius = kelvin - 273.15
                            // let newton = celsius * ( 23 / 100 )
                            celsius = Math.floor(celsius)
            
                            $('#countryName').html("Country: " + countryName);
                            $('#cityName').html("Capital City: " + cityName);
                            $('#flag').html(countryFlag);
            
                            $('#weatherCondition').html(weatherDescription.toUpperCase());
                            $('#temperature').html(celsius + "˚C");
            
                            $('#population').html("Population: " + cityPopulation);
            
                            $('#isoCode').html("Currency; " + iso + ", ");
                            $('#currencyName').html(currencyName);
                            $('#currencySymbal').html(currencySymbol);

                            // WIKI

                            $('#essayIcon').html("&#128220 ");
                            $('#wikiSummary').html(wikiSummary);
            
                            var a = document.querySelector('.wikipedia');
                                a.href = `http://${wikiLink}`;
                            $('#wikiLink').html(`Wikipedia links`);
                            $('#wikiLinkIcon').html(`🌐 `);
            
                            // WEATHER ICONS
            
                            const today = new Date()
                            const getHour = today.getHours()

                            console.log(getHour)
            
                            if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){
                                    if (getHour >= 6 && getHour <= 18) {
                                        $("#changeIcon").html("&#127774")
                                    } else {
                                        $("#changeIcon").html("🌕")
                                    }
                                } else if (weatherDescription == "cloudy"){
                                    $("#changeIcon").html("☁️")
                                } else if (weatherDescription.includes("rain") || weatherDescription.includes("rainny") || weatherDescription.includes("overcast")){
                                    $("#changeIcon").html("&#127783")
                                } else if (weatherDescription.includes("cloud") || weatherDescription.includes("clouds")){
                                    $("#changeIcon").html("&#127780")
                                } else if (weatherDescription.includes("snow")){
                                    $("#changeIcon").html("❄️")
                                } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")){
                                    $("#changeIcon").html("⛈")
                                } else if (weatherDescription.includes("mist") || weatherDescription.includes("fog")){
                                    $("#changeIcon").html("🌫")
                                } else {
                                    $("#changeIcon").html("🌍")
                            }
            
                            // CURRENCY COMPARING
            
                            const listOfCurrency = Object.entries(getCurrencies)
                            for (const [cName, cValue] of listOfCurrency) {

                                $('#exchangeRate').html("Exchange rate; ");  

                                if (iso == cName && iso != compareToUSD && iso != compareToEUR) {
                                    // console.log(cValue)
                                    $('#localCurrency').html(cValue);    
            
                                    for (const [cName, cValue] of listOfCurrency) {
                                        if (compareToUSD == cName) {  
                                            $('#secondCurrency').html("To USD $" + cValue); 
                                            
                                            for (const [cName, cValue] of listOfCurrency) {
                                                if (compareToEUR == cName) {  
                                                    $('#thirdCurrency').html("To EUR €" + cValue);                        
                                                }
                                            }                           
                                        }
                                    }                    
                                } else if (iso == cName && iso != compareToGBP && iso != compareToEUR) {
                                    $('#localCurrency').html(cValue);    
            
                                    for (const [cName, cValue] of listOfCurrency) {
                                        if (compareToGBP == cName) {  
                                            $('#secondCurrency').html("To GBP £" + cValue); 
                                            
                                            for (const [cName, cValue] of listOfCurrency) {
                                                if (compareToEUR == cName) {  
                                                    $('#thirdCurrency').html("To EUR €" + cValue);                        
                                                }
                                            }                           
                                        }
                                    }                    
                                } else if (iso == cName && iso != compareToGBP && iso != compareToUSD) {
                                    $('#localCurrency').html(cValue);    
            
                                    for (const [cName, cValue] of listOfCurrency) {
                                        if (compareToUSD == cName) {  
                                            $('#secondCurrency').html("To USD $" + cValue); 
                                            
                                            for (const [cName, cValue] of listOfCurrency) {
                                                if (compareToGBP == cName) {  
                                                    $('#thirdCurrency').html("To BGP £" + cValue);                        
                                                }
                                            }                           
                                        }
                                    }                    
                                }
                            }
            
                            // THE MAP

                            const poi = data.poi_nearByPlaces

                            for (let i = 0; i < poi.length; i++) {
                                var markerPlaces = L.marker([poi[i].lat, poi[i].lng]).addTo(mymap)

                                var nearByName = poi[i].name
                                var nearByTypeClass = poi[i].typeClass
                                var nearByTypeName = poi[i].typeName
                                
                                markerPlaces.bindPopup(`<h4>${nearByName}</h4><p>${nearByTypeClass}</p><p>${nearByTypeName}</p>`).openPopup()

                            }
            
                            var lat = data.country.geometry.lat
                            var lng = data.country.geometry.lng
            
                            mymap.setView([lat, lng], 16.5);
            
                            var marker = L.marker([lat, lng]).addTo(mymap)
                                marker.bindPopup("<h5>Hey! 🐾</h5>You are here 📍").openPopup()

                            var circle = L.circle([lat, lng], {
                                color: "red",
                                fillColor: "#f03",
                                fillOpacity: 0.5,
                                radius: 10
                            }).addTo(mymap)
                            // var featureGroup = L.featureGroup(markers).addTo(map);
                            // map.fitBounds(featureGroup.getBounds());

                        })
                        .catch(error => {console.log(error)})
                });
            }); 
        }
}

// WHEN X SELECTS COUNTRY FROM SEARCH

document.querySelector('.submit').addEventListener('click', function(event) {
    // event.preventDefault();

    var selCountry = document.getElementById("myInput").value;
        // console.log(selCountry)

        fetch(`/libs/php/selCountry.php?selCountry=${selCountry.replaceAll(" ", "%20")}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                let countryName = data.country.components.country
                let cityName = data.population[0].capital
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
                let wikiSummary = data.wikipedia.summary
                let wikiThumnail = data.wikipedia.thumbnailImg
                
                const kelvin = weatherTemp
                let celsius = kelvin - 273.15
                // let newton = celsius * ( 23 / 100 )
                celsius = Math.floor(celsius)

                $('#countryName').html("Country: " + countryName);
                $('#cityName').html("Capital City: " + cityName);
                $('#flag').html(countryFlag);

                $('#weatherCondition').html(weatherDescription.toUpperCase());
                $('#temperature').html(celsius + "˚C");

                $('#population').html("Population: " + cityPopulation);

                $('#isoCode').html("Currency; " + iso + ", ");
                $('#currencyName').html(currencyName);
                $('#currencySymbal').html(currencySymbol);

                // WIKI LINK

                $('#essayIcon').html("&#128220 ");
                $('#wikiSummary').html(wikiSummary);

                var a = document.querySelector('.wikipedia');
                    a.href = `http://${wikiLink}`;
                $('#wikiLink').html(`Wikipedia links`);

                // IMAGE FOR PIN LOCATION
                    
                var img = document.createElement("img");

                img.src = wikiThumnail;
                var src = document.getElementById("thumnail");
                $(src).html(img)

                // WEATHER ICONS

                const today = new Date()
                const getHour = today.getHours()

                if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){
                    $("#changeIcon").html("&#127774")
                } else if (weatherDescription == "cloudy"){
                    $("#changeIcon").html("☁️")
                } else if (weatherDescription.includes("rain") || weatherDescription.includes("rainny") || weatherDescription.includes("overcast")){
                    $("#changeIcon").html("&#127783")
                } else if (weatherDescription.includes("cloud") || weatherDescription.includes("clouds")){
                    $("#changeIcon").html("&#127780")
                } else if (weatherDescription.includes("snow")){
                    $("#changeIcon").html("❄️")
                } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")){
                    $("#changeIcon").html("⛈")
                } else if (weatherDescription.includes("mist") || weatherDescription.includes("fog")){
                    $("#changeIcon").html("🌫")
                } else {
                    $("#changeIcon").html("🌍")
                }

                // CURRENCY COMPARING

                const listOfCurrency = Object.entries(getCurrencies)
                for (const [cName, cValue] of listOfCurrency) {

                    $('#exchangeRate').html("Exchange rate; ");   
                    
                    if (iso == cName && iso != compareToUSD && iso != compareToEUR) {
                        // console.log(cValue)
                        $('#localCurrency').html(cValue);    

                        for (const [cName, cValue] of listOfCurrency) {
                            if (compareToUSD == cName) {  
                                $('#secondCurrency').html("To USD $" + cValue); 
                                
                                for (const [cName, cValue] of listOfCurrency) {
                                    if (compareToEUR == cName) {  
                                        $('#thirdCurrency').html("To EUR €" + cValue);                        
                                    }
                                }                           
                            }
                        }                    
                    } else if (iso == cName && iso != compareToGBP && iso != compareToEUR) {
                        $('#localCurrency').html(cValue);    

                        for (const [cName, cValue] of listOfCurrency) {
                            if (compareToGBP == cName) {  
                                $('#secondCurrency').html("To GBP £" + cValue); 
                                
                                for (const [cName, cValue] of listOfCurrency) {
                                    if (compareToEUR == cName) {  
                                        $('#thirdCurrency').html("To EUR €" + cValue);                        
                                    }
                                }                           
                            }
                        }                    
                    } else if (iso == cName && iso != compareToGBP && iso != compareToUSD) {
                        $('#localCurrency').html(cValue);    

                        for (const [cName, cValue] of listOfCurrency) {
                            if (compareToUSD == cName) {  
                                $('#secondCurrency').html("To USD $" + cValue); 
                                
                                for (const [cName, cValue] of listOfCurrency) {
                                    if (compareToGBP == cName) {  
                                        $('#thirdCurrency').html("To BGP £" + cValue);                        
                                    }
                                }                           
                            }
                        }                    
                    }
                }

                // THE MAP
                
                const poi = data.poi_nearByPlaces

                for (let i = 0; i < poi.length; i++) {
                    var markerPlaces = L.marker([poi[i].lat, poi[i].lng]).addTo(mymap)

                    var nearByName = poi[i].name
                    var nearByTypeClass = poi[i].typeClass
                    var nearByTypeName = poi[i].typeName
                    
                    markerPlaces.bindPopup(`<h4>${nearByName}</h4><p>${nearByTypeClass}</p><p>${nearByTypeName}</p>`).openPopup()

                }

                var lat = data.wikipedia.lat
                var lng = data.wikipedia.lng
            
                mymap.setView([lat, lng], 14);
            
                var marker = L.marker([lat, lng]).addTo(mymap)
                    marker.bindPopup(
                        `<img class="thumnail" id="thumnail" src="${wikiThumnail}" alt="Picture of the location">
                        <p>Picture of ${cityName} City</p>`
                        ).openPopup()

                        var circle = L.circle([lat, lng], {
                                color: "red",
                                fillColor: "#f03",
                                fillOpacity: 0.5,
                                radius: 50
                        }).addTo(mymap)
                // var featureGroup = L.featureGroup(markers).addTo(map);
                // map.fitBounds(featureGroup.getBounds());
            })
            .catch(error => {
                $('#countryName').html(`Error, "${selCountry}" isn't available right now...`);
                $('#flag').html(`😔`);
                console.log(error)
            })
  });
                var mymap = L.map('mapid').setView([0, 0], 13);

                L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mFYXi7zo4EzHjijzbUxG', {
                attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'your.mapbox.access.token'
                }).addTo(mymap);

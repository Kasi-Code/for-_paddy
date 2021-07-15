// INITIATE MAP

// var mymap = L.map('mapid').setView([0, 0], 13);

// L.tileLayer.provider('MapTiler.Streets', {
//     key: 'mFYXi7zo4EzHjijzbUxG',
//     tileSize: 512,
//     zoomOffset: -1,
//     maxZoom: 18
// }).addTo(mymap);

var mymap = L.map('mapid').setView([0, 0], 13);

            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mFYXi7zo4EzHjijzbUxG', {
            attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy;OpenStreetMap contributors</a>`,
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);

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

                            let showTime = data.countryTime.slice(11, 16)
            
                            let weatherDescription = data.weather.weather[0].description
                            let weatherTemp = data.weather.main.temp
            
                            // let cityPopulation = data.population[0].population
            
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
                            $('#cityName').html("City: " + cityName);
                            $('#flag').html(countryFlag);
                            $('#time').html(`(${showTime})`);
            
                            $('#weatherCondition').html(weatherDescription.toUpperCase());
                            $('#temperature').html(celsius + "˚C");
            
                            // $('#population').html("Population: " + cityPopulation);
            
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
                            // console.log(getHour)

                            // const getTime = data.countryTime.slice(11, 13)
                            // console.log(getTime)
            
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
                            // const poi2 = data.poi

                            for (let i = 0; i < poi.length; i++) {
                                var markerPlaces = L.marker([poi[i].lat, poi[i].lng]).addTo(mymap)

                                var nearByName = poi[i].title
                                var summary = poi[i].summary
                                
                                markerPlaces.bindPopup(`<h4>${nearByName}</h4><p>${summary}</p>`).openPopup()

                            }

                            // for (let i = 0; i < poi2.length; i++) {
                            //     var markerPlaces = L.marker([poi2[i].lat, poi2[i].lng]).addTo(mymap)
            
                            //     var nearByName = poi2[i].name
                            //     var nearByTypeClass = poi2[i].typeClass
                            //     var nearByTypeName = poi2[i].typeName
                                
                            //     markerPlaces.bindPopup(`<h4>${nearByName}</h4><p>${nearByTypeClass}</p><p>${nearByTypeName}</p>`).openPopup()
            
                            // }
            
                            var lat = data.country.geometry.lat
                            var lng = data.country.geometry.lng
            
                            mymap.setView([lat, lng], 14);
            
                            var marker = L.marker([lat, lng]).addTo(mymap)
                                marker.bindPopup("<h5>Hey! 🐾</h5>You are here 📍").openPopup()

                            var circle = L.circle([lat, lng], {
                                color: "red",
                                fillColor: "#f03",
                                fillOpacity: 0.5,
                                radius: 10
                            }).addTo(mymap)

                            // var featureGroup = L.featureGroup(marker).addTo(mymap);
                            // mymap.fitBounds(featureGroup.getBounds());

                            // HIGHLIGHT COUNTRY BORDER


                            // const getCountryArr = data.countryBorders
                            
                            // var bounds = [];

                            // for (var i = 0; i < getCountryArr.length; i++) {

                            //     var polygonType = getCountryArr[i].geometry.type
                            //     var multiCoordinates = getCountryArr[i].geometry.coordinates

                            //     if (polygonType == "MultiPolygon") {
                                    
                            //         for (var mc = 0; mc < multiCoordinates.length; i++) {

                            //             var multiCoordinates1 = multiCoordinates[mc]

                            //             for (var mc1 = 0; mc1 < multiCoordinates1.length; i++) {

                            //                 var multiCoordinates2 = multiCoordinates[mc1]

                            //                 for (var mc2 = 0; mc2 < multiCoordinates2.length; i++) {

                            //                     console.log(multiCoordinates2[mc2])

                            //                 }

                            //             }

                            //         }

                            //     } else if (polygonType == "Polygon") {
                            //         for (var p = 0; p < getCountryArr.length; i++) {

                            //         }
                            //         var polygonArr = getCountryArr[i].geometry.coordinates
                            //     }


                                

                            // }

                            // create an orange rectangle
                            // L.polygon(bounds, {color: "#ff7800", weight: 1}).addTo(mymap);

                            // // zoom the map to the rectangle bounds
                            // mymap.fitBounds(bounds);

                        })
                        .catch(error => {console.log(error)})
                });
            }); 
        }
}

// SEARCH INPUT

fetch("/libs/php/getGazetteerBySearch.php")
  .then(response => response.json())
  .then(data => {

    

    //   console.log(data)

    const countryObject = data.countryBorders
    let countries = []

    for ( var i = 0; i < countryObject.length; i++ ) {
      
      let country = countryObject[i].properties.name
      countries.push(country)
      
      autocomplete(document.getElementById("myInput"), countries);

      function autocomplete(inp, arr) {
        
        var currentFocus;
        
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
           
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            a.style.overflow = "auto";
            a.style.maxHeight = "80vh"; 
            a.style.borderTopLeftRadius = "20px";
            a.style.borderTopRightRadius = "20px";
            
            this.parentNode.appendChild(a);
            
            for (i = 0; i < arr.length; i++) {
              
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                
                b = document.createElement("DIV");
                
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
               
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                
                    b.addEventListener("click", function(e) {
                    
                    inp.value = this.getElementsByTagName("input")[0].value;
                    
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
              
// WHEN X SELECTS COUNTRY FROM SEARCH

a.addEventListener('click', function(event) {
    
    event.preventDefault();

    $(".loading").css("display", "block");
    $("#loading").html("loading...");
    $(".showCountryName").css("display", "none");

    var selCountry = document.getElementById("myInput").value;
        // console.log(selCountry)

        fetch(`/libs/php/selCountry.php?selCountry=${selCountry.replaceAll(" ", "%20")}`)
            .then(res => {
                return res.json()
            })
            .then(data => {

                $(".loading").css("display", "none");
                $(".showCountryName").css("display", "block");

                console.log(data)

                let countryName = data.country.components.country
                let cityName = data.population[0].capital
                let countryFlag = data.country.annotations.flag

                let showTime = data.countryTime.slice(11, 16)

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
                $('#time').html(`(${showTime})`);

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
                $('#wikiLinkIcon').html(`🌐 `);

                // IMAGE FOR PIN LOCATION
                    
                var img = document.createElement("img");

                img.src = wikiThumnail;
                var src = document.getElementById("thumnail");
                $(src).html(img)

                // WEATHER ICONS

                const getTime = data.countryTime.slice(11, 13)

                // console.log(getTime)

                if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){
                    if (getTime >= 6 && getTime <= 18) {
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
                // const poi2 = data.poi

                // console.log(poi2)

                for (let i = 0; i < poi.length; i++) {
                    var markerPlaces = L.marker([poi[i].lat, poi[i].lng]).addTo(mymap)

                    var nearByName = poi[i].title
                    var summary = poi[i].summary
                    
                    markerPlaces.bindPopup(`<h4>${nearByName}</h4><p>${summary}</p>`).openPopup()

                }

                // for (let i = 0; i < poi2.length; i++) {
                //     var markerPlaces = L.marker([poi2[i].lat, poi2[i].lng]).addTo(mymap)

                //     var nearByName = poi2[i].name
                //     var nearByTypeClass = poi2[i].typeClass
                //     var nearByTypeName = poi2[i].typeName
                    
                //     markerPlaces.bindPopup(`<h4>${nearByName}</h4><p>${nearByTypeClass}</p><p>${nearByTypeName}</p>`).openPopup()

                // }

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

                // HIGHLIGHT COUNTRY BORDER

                let getCountryArr = data.countryBorders
                
                var bounds = []

                for (let i = 0; i < getCountryArr.length; i++) {

                    var polygonType = getCountryArr[i].geometry.type
                    let countryNameArr = getCountryArr[i].properties.name
                    var multiCoordinates = getCountryArr[i].geometry.coordinates

                    if (polygonType == "MultiPolygon" && countryNameArr == countryName) {

                        // console.log(countryNameArr + " is MultiPolygon")

                        // console.log(multiCoordinates)
                        
                        for (let mc = 0; mc < multiCoordinates.length; mc++) {

                            var multiCoordinates1 = multiCoordinates[mc]

                            for (let mc1 = 0; mc1 < multiCoordinates1.length; mc1++) {

                                var multiCoordinates2 = multiCoordinates[mc1]
                                // bounds.push(multiCoordinates2)
                                // console.log(multiCoordinates2)

                                for (let mc2 = 0; mc2 < multiCoordinates2.length; mc2++) {

                                    var multiCoordinates3 = multiCoordinates[mc2]

                                    // bounds.push(multiCoordinates3)
                                    // console.log(multiCoordinates3)

                                    for (let mc3 = 0; mc3 < multiCoordinates3.length; mc3++) {

                                        var multiCoordinates4 = multiCoordinates[mc3]
        
                                        // bounds.push(multiCoordinates4)
                                        // console.log(multiCoordinates4)
                                    }
                                }
                            }
                        }
                    
                    } else if (polygonType == "Polygon" && countryNameArr == countryName) {

                        // console.log(countryNameArr + " is Polygon")

                        // console.log(multiCoordinates)

                        for (let c = 0; c < multiCoordinates.length; c++) {

                            var multiCoordinates1 = multiCoordinates[c]

                            for (let c1 = 0; c1 < multiCoordinates1.length; c1++) {

                                let polygonArr = multiCoordinates1[c1]
                                // bounds.push(polygonArr)
                                // console.log(polygonArr)

                            }
                        }
                    }
                }
                
                
                L.polygon(bounds, {color: "#ff7800", weight: 1}).addTo(mymap)
                
                // mymap.fitBounds(bounds);

            })
            .catch(error => {
                $(".loading").css("display", "none");
                $(".showCountryName").css("display", "block");
                $('#countryName').html(`Error, "${selCountry}" isn't available right now...`);
                $('#flag').html(`😔`);
                console.log(error)
            })
  });

        });
        
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
             
              currentFocus++;
              
              addActive(x);
            } else if (e.keyCode == 38) {
              
              currentFocus--;
              
              addActive(x);
            } else if (e.keyCode == 13) {
              
              e.preventDefault();
              if (currentFocus > -1) {
                
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          
          if (!x) return false;
          
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          
          x[currentFocus].classList.add("autocomplete-active");
          }
          function removeActive(x) {
            
            for (var i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
          }
          function closeAllLists(elmnt) {
            
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
              if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      }
    }
  });


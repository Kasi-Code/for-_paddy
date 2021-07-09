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

                            // console.log(getHour)
            
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
                $('#wikiLinkIcon').html(`🌐 `);

                // IMAGE FOR PIN LOCATION
                    
                var img = document.createElement("img");

                img.src = wikiThumnail;
                var src = document.getElementById("thumnail");
                $(src).html(img)

                // WEATHER ICONS

                const today = new Date()
                const getHour = today.getHours()

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
                $(".loading").css("display", "none");
                $(".showCountryName").css("display", "block");
                $('#countryName').html(`Error, "${selCountry}" isn't available right now...`);
                $('#flag').html(`😔`);
                console.log(error)
            })
  });

            var mymap = L.map('mapid').setView([0, 0], 13);
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mFYXi7zo4EzHjijzbUxG', {
            attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy;OpenStreetMap contributors</a>`,
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);

// SEARCH INPUT

fetch("/libs/php/getGazetteerBySearch.php")
  .then(response => response.json())
  .then(data => {

    //   console.log(data)

    const countryObject = data.countryBorders
    let countries = []

    for ( var i = 0; i < countryObject.length; i++ ) {
      // console.log(countryObject[i].properties)
      let country = countryObject[i].properties.name
      countries.push(country)
      // console.log(countries)
      autocomplete(document.getElementById("myInput"), countries);

      function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
          }
          function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
          }
          function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
              if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      }
    }
  });



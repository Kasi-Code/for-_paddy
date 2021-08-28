// GLOBAL

let countriesForSearch = []
let countriesForSelect = []

let cloudyNight = $("#cloudyPicture").attr("src", "libs/media/nightCloudy.png")

// INITIATE MAP

var mymap = L.map('mapid').setView([0, 0], 13);

            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mFYXi7zo4EzHjijzbUxG', {
            attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy;OpenStreetMap contributors</a>`,
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);

            var wikiMarker = L.icon({
                iconUrl: 'libs/media/blueMarker.gif',                        
                iconSize:     [38, 38],
                iconAnchor:   [19, 45],
                popupAnchor:  [0, -40]
            });

// AUTO LOAD USING X LOACTION

window.onload = function () {

    $("#preloader").css("display", "block");

        // TOGGLE

        $(".buttonUp").click(function(){
            $(".panel").slideToggle("fast");
        });

        // OPTIONS TOGGLE

        $(".covidSlide").click(function() {
            $(".covid").slideToggle("fast");

                if ($(".newsBox").is(":visible")) {
                    $(".newsBox").hide("fast")
                }

        });

        // NEWS TOGGLE

        $(".newsSlide").click(function(){
            $(".newsBox").slideToggle("fast");

                if ($(".covid").is(":visible")) {
                    $(".covid").hide("fast")
                }
                if ($(".panel").is(":visible")) {
                    $(".panel").hide("fast")
                }

        });

        // INFO TOGGLE

        $(".infoSlide").click(function(){

            $(".panel").slideToggle("fast");

                if ($(".newsBox").is(":visible")) {
                    $(".newsBox").hide("fast")
                }

        });

        // SEARCH SWITCHES

        $(".searchSwitch").click(function(){

            // $(".select-container").slideToggle("fast");

            $(".select-container").hide("fast");
            $(".search-container").show("fast");

            $(".searchSwitch").hide("fast");
            $(".selectSwitch").show("fast");
            // $(".select-container").hide("fast");

        });

        $(".selectSwitch").click(function(){

            // $(".select-container").slideToggle("fast");

            $(".select-container").show("fast");
            $(".search-container").hide("fast");

            $(".searchSwitch").show("fast");
            $(".selectSwitch").hide("fast");
            // $(".select-container").hide("fast");

        });
                
        $("#map").click(function(){
            if ($(".panel, .newsBox, .covid").is(":visible")) {
                $(".panel, .newsBox, .covid").hide("fast")
            }
        })

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

                $.ajax({
                    type: "GET",
                    url: `libs/php/getGazetteer.php?lat=${lat}&long=${long}`,
                    success: function(data) {

                        // console.log(data)

                        $("#preloader").css("display", "none").fadeOut('slow')
    
                        let countryName = data.country
                        let cityName = data.city
                        let countryFlag = data.flag
                        let showTime = data.countryTime.slice(11, 16)
                                                
                        // WEATHER ICONS

                        let weatherDescription = data.description
                        let weatherTemp = data.temp
                        let feels_like = data.feels_like
                        let humidityPercentage = data.humidity

                        function convertToCelsius(kelvin) {

                            const celsius = 273.15

                            return Math.floor(kelvin - celsius)
                          }

                        let mainTemp = convertToCelsius(weatherTemp)
                        let feelsLike = convertToCelsius(feels_like)
                        
                        const today = new Date()
                        const getHour = today.getHours()
                        
                        if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){

                            (getHour >= 6 && getHour <= 18) ? $("#changeIcon").html("&#127774") : $("#changeIcon").html("🌕")

                        } else if (weatherDescription.includes("cloudy")){
                            $("#changeIcon").html("☁️")
                        } else if (weatherDescription.includes("rain") || weatherDescription.includes("rainny") || weatherDescription.includes("overcast") || weatherDescription.includes("drizzle")){
                            $("#changeIcon").html("&#127783")
                        } else if (weatherDescription.includes("cloud") || weatherDescription.includes("clouds")){  
                            
                            if (getHour >= 6 && getHour <= 18) {
                                $("#changeIcon").html("&#127780")
                            } else {
                                $("#changeIcon").html(cloudyNight)
                                $(".cloudyPicture").css("display", "block")
                            }                           

                        } else if (weatherDescription.includes("snow")){
                            $("#changeIcon").html("❄️")
                        } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")){
                            $("#changeIcon").html("⛈")
                        } else if (weatherDescription.includes("mist") || weatherDescription.includes("fog")){
                            $("#changeIcon").html("🌫")
                        } else {
                            $("#changeIcon").html("🌍")
                        }
                        
                        let iso = data.iso_code
                        let currencyName = data.name
                        let currencySymbol = data.symbol   
                        
                        // console.log(localCurrency)
                                                
                        $('#countryName').html("<b>Country:</b> " + countryName);
                        $('#cityName').html("<b>City:</b> " + cityName);
                        $('#flag').html(countryFlag);
                        $('#time').html(`(${showTime})`);
                        
                        $('#weatherCondition').html(weatherDescription.toUpperCase());
                        $('#temperature').html(mainTemp + "˚C | ");
                        $('#humidity').html("  HUMIDITY: " + humidityPercentage + "%");
                        $('#feelsLike').html("  FEELS LIKE " + feelsLike + "˚C");
                        
                        $('#isoCode').html("<b>Currency;</b> " + iso + ", ");
                        $('#currencyName').html(currencyName);
                        $('#currencySymbal').html(currencySymbol);
    
                        // WIKI
                        
                        let wikiLink = data.wikipediaUrl
                        let wikiSummary = data.summary

                        $('#essayIcon').html("&#128220 ");
                        $('#wikiSummary').html(wikiSummary);
                        
                        var a = document.querySelector('.wikipedia');
                            a.href = `http://${wikiLink}`;
                        $('#wikiLink').html(`Wikipedia links`);
                        $('#wikiLinkIcon').html(`🌐 `);
    
                        // COVID
                        $('#active').html(data.Active);
                        $('#confirmed').html(data.Confirmed);
                        $('#deaths').html(data.Deaths);
                        $('#recovered').html(data.Recovered);
                    
                        // CURRENCY COMPARING

                        let getCurrencies = data.rates
                        let compareToUSD = data.base
                        let compareToEUR = "EUR"
                        let compareToGBP = "GBP"
                    
                        const listOfCurrency = Object.entries(getCurrencies)
                        for (const [cName, cValue] of listOfCurrency) {
                            $('#exchangeRate').html("<b>Exchange rate</b> ⚖");  
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
    
                        // NEWS
                        const newsArr = data.news.articles
    
                        for (var i = 0; i < newsArr.length; i++){ 
                            // Create DOM element
                            let childNode = document.createElement('li')
                            let parentNode = document.getElementById('parentList')
                            childNode.setAttribute("class", "childList")
                        
                            // Set content to current element
                            childNode.innerHTML = `<a href="${newsArr[i].url}" target="_blank"><span><h5>${newsArr[i].author}</h5></span><span><p>${newsArr[i].title}</p></span></a>` 
                            parentNode.style.overflow = "auto";
                            parentNode.style.maxHeight = "85vh"; 
                            // childNode.style.borderTopLeftRadius = "20px";
                            // childNode.style.borderTopRightRadius = "20px";
                        
                            // Add DOM Node to list
                            parentNode.appendChild(childNode);
                        }
                      
                        // CHANGING MARKER ICON

                        var humanMarker = L.icon({
                            iconUrl: 'libs/media/humanMarkerOrange.png',                        
                            iconSize:     [38, 45], // size of the icon
                            // shadowSize:   [50, 64], // size of the shadow
                            iconAnchor:   [19, 45], // point of the icon which will correspond to marker's location
                            // shadowAnchor: [4, 62],  // the same for the shadow
                            popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
                        });

                        // THE MAP

                        // Maker of your location
                    
                        var lat = data.lat
                        var lng = data.lng
                    
                        var marker = L.marker([lat, lng], {icon: humanMarker}).addTo(mymap)
                            marker.bindPopup("<h5>Hey! 🐾</h5>You are here 📍").openPopup()
                            
                        var circle = L.circle([lat, lng], {
                            color: "red",
                            fillColor: "orange",
                            fillOpacity: 0.5,
                            radius: 30
                        }).addTo(mymap)            

                        // Maker of places near by

                        const poi = data.poi_nearByPlaces
    
                        for (let i = 0; i < poi.length; i++) {
                            var markerPlaces = L.marker([poi[i].lat, poi[i].lng], {icon: wikiMarker}).addTo(mymap)

                            var nearByName = poi[i].title
                            var summary = poi[i].summary
                            var urlClick = poi[i].wikipediaUrl

                            markerPlaces.bindPopup(
                                `<div style="text-align: center;">
                                <a href="https://${urlClick}" target="blank">
                                <h4>${nearByName}</h4>
                                <p>${summary}</p>
                                </a>
                                </div>`
                            )
                        }                   
                        
                        mymap.setView([lat, lng], 14); // <-- Set the center on the map with your location
                    },
                    error: function(error) {
                        alert(`loading failed: ${error}`)
                }
            })          
    })

    // SELECT INPUT

    $.ajax({
        type: "GET",
        url: "libs/php/countryCodeAndName.php",
        success: function(data) {

            // console.log(data)

            const countryName = data.name
            const countryISO = data.iso
            
            for ( var i = 0; i < countryName.length; i++ ) {
            
                let country = countryName[i]

                countriesForSelect.push({
                    name: country, 
                    code: countryISO[i]})
            }

            listOfCrounty(countriesForSelect.map(country => country.name).sort());
            
            function listOfCrounty(name) {

                var selectList = document.getElementById("countryOption");
                
                var option = document.createElement("option");
                
                for (i = 0; i < name.length; i++) {

                    // console.log(array[i])
                    var option = document.createElement("option");
                    // option.value = name[i];
                    option.text = name[i];
                    // option.style.borderRadius = "20px";

                    selectList.appendChild(option);
                }
                    
            }

            var x, i, j, l, ll, selElmnt, a, b, c;
            
            x = document.getElementsByClassName("custom-select");
            l = x.length;
            for (i = 0; i < l; i++) {
              selElmnt = x[i].getElementsByTagName("select")[0];
              selElmnt.setAttribute("id", "mySelect");
              ll = selElmnt.length;
              
              a = document.createElement("DIV");
              a.setAttribute("class", "select-selected");
              a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
              x[i].appendChild(a);
              
              b = document.createElement("DIV");
              b.setAttribute("class", "select-items select-hide");
              for (j = 1; j < ll; j++) {
                
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function(e) {
                    
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                      if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                          y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                      }
                    }
                    h.click();

                    // WHEN X SELECT COUNTRY

                    event.preventDefault();
                        
                    $(".loading").css("display", "block");
                    $("#loading").html("loading...");
                    $(".showCountryName").css("display", "none");
                
                    const selCountry = document.getElementById("mySelect").value;
                    
                    // console.log(selCountry)

                    $.ajax({
                        type: "GET",
                        url: `libs/php/selCountry.php?selCountry=${countriesForSelect.find(c => c.name == selCountry).code}`,
                        success: function(data) {

                            $(".loading").css("display", "none");
                            $(".showCountryName").css("display", "block");
                        
                            // console.log(data)
                        
                            let countryName = data.country
                            let cityName = data.capital
                            let countryFlag = data.flag
                        
                            let showTime = data.countryTime.slice(11, 16)
                                                
                            // WEATHER ICONS

                            let weatherDescription = data.description
                            let weatherTemp = data.temp
                            let feels_like = data.feels_like
                            let humidityPercentage = data.humidity

                            function convertToCelsius(kelvin) {

                                const celsius = 273.15

                                return Math.floor(kelvin - celsius)
                              }

                            let mainTemp = convertToCelsius(weatherTemp)
                            let feelsLike = convertToCelsius(feels_like)
                        
                            const getTime = data.countryTime.slice(11, 13)
                        
                            // console.log(getTime)
                        
                            if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){
                            
                                (getTime >= 6 && getTime <= 18) ? $("#changeIcon").html("&#127774") : $("#changeIcon").html("🌕")
                            
                            } else if (weatherDescription.includes("cloudy")){
                                $("#changeIcon").html("☁️")
                            } else if (weatherDescription.includes("rain") || weatherDescription.includes("rainny") || weatherDescription.includes("overcast") || weatherDescription.includes("drizzle")){
                                $("#changeIcon").html("&#127783")
                            } else if (weatherDescription.includes("cloud") || weatherDescription.includes("clouds")){   

                                if (getTime >= 6 && getTime <= 18) {
                                    $("#changeIcon").html("&#127780")
                                } else {
                                    $("#changeIcon").html(cloudyNight)
                                    $(".cloudyPicture").css("display", "block")
                                }      

                            } else if (weatherDescription.includes("snow")){
                                $("#changeIcon").html("❄️")
                            } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")){
                                $("#changeIcon").html("⛈")
                            } else if (weatherDescription.includes("mist") || weatherDescription.includes("fog")){
                                $("#changeIcon").html("🌫")
                            } else {
                                $("#changeIcon").html("🌍")
                            }
                        
                            let cityPopulation = data.population
                        
                            let iso = data.iso_code
                            let currencyName = data.name
                            let currencySymbol = data.symbol   
                        
                            // console.log(localCurrency)
                        
                            $('#countryName').html("<b>Country:</b> " + countryName);
                            $('#cityName').html("<b>Capital City:</b> " + cityName);
                            $('#flag').html(countryFlag);
                            $('#time').html(`(${showTime})`);

                            $('#temperature').html(mainTemp + "˚C | ");
                            $('#humidity').html("  HUMIDITY: " + humidityPercentage + "%");
                            $('#feelsLike').html("  FEELS LIKE " + feelsLike + "˚C");
                            $('#weatherCondition').html(weatherDescription.toUpperCase());
                        
                            $('#population').html("<b>Population:</b> " + cityPopulation + " citizens");
                        
                            $('#isoCode').html("<b>Currency;</b> " + iso + ", ");
                            $('#currencyName').html(currencyName);
                            $('#currencySymbal').html(currencySymbol);
                        
                            // WIKI LINK
                        
                            let wikiLink = data.wikipediaUrl
                            let wikiSummary = data.summary
                            let wikiThumnail = data.thumbnailImg
                        
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
                        
                            // COVID
                        
                            $('#active').html(data.Active);
                            $('#confirmed').html(data.Confirmed);
                            $('#deaths').html(data.Deaths);
                            $('#recovered').html(data.Recovered);
                        
                            // CURRENCY COMPARING

                            let getCurrencies = data.rates
                            let compareToUSD = data.base
                            let compareToEUR = "EUR"
                            let compareToGBP = "GBP"
                        
                            const listOfCurrency = Object.entries(getCurrencies)
                            for (const [cName, cValue] of listOfCurrency) {
                            
                                $('#exchangeRate').html("<b>Exchange rate</b> ⚖");   
                            
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
                            const poiFromWiki = data.placesNearBy

                            for (let i = 0; i < poiFromWiki.length; i++) {
                                var markerPlaces = L.marker([poiFromWiki[i].lat, poiFromWiki[i].lng], {icon: wikiMarker}).addTo(mymap)
                            
                                var nearByName = poiFromWiki[i].title
                                var summary = poiFromWiki[i].summary
                                var thumnail = poiFromWiki[i].thumbnailImg
                                var linkClick = poiFromWiki[i].wikipediaUrl

                                markerPlaces.bindPopup(
                                    `<div style="text-align: center;">
                                    <a href="https://${linkClick}" target="blank">
                                    <img class="thumnail" id="thumnail" src="${thumnail}" alt="Picture of the location">
                                    <h4>${nearByName}</h4>
                                    <p>${summary}</p>
                                    </a>
                                    </div>`
                                ).openPopup()
                            
                            }
                        
                            for (let i = 0; i < poi.length; i++) {
                                var markerPlaces = L.marker([poi[i].lat, poi[i].lng], {icon: wikiMarker}).addTo(mymap)
                            
                                var nearByName = poi[i].title
                                var summary = poi[i].summary
                                var urlClick = poi[i].wikipediaUrl

                                markerPlaces.bindPopup(
                                    `<div style="text-align: center;">
                                    <a href="https://${urlClick}" target="blank">
                                    <h4>${nearByName}</h4>
                                    <p>${summary}</p>
                                    </a>
                                    </div>`
                                ).openPopup()
                            
                            }
                        
                            var lat = data.lat
                            var lng = data.lng
                            var wikiURL = data.wikipediaUrl
                        
                            // mymap.setView([lat, lng], 14);
                        
                            var marker = L.marker([lat, lng], {icon: wikiMarker}).addTo(mymap)
                                marker.bindPopup(
                                    `<div style="text-align: center;">
                                    <a href="https://${wikiURL}" target="blank">
                                    <img class="thumnail" id="thumnail" src="${wikiThumnail}" alt="Picture of the location">
                                    </a>
                                    <p>Picture of ${cityName} City</p>
                                    </div>`
                                    ).openPopup()
                                
                                    var circle = L.circle([lat, lng], {
                                            color: "red",
                                            fillColor: "#f03",
                                            fillOpacity: 0.5,
                                            radius: 50
                                    }).addTo(mymap)
                                
                            // HIGHLIGHT COUNTRY BORDER
                                
                            let geojsonFeature = data.border
                                
                                for (i = 0; i < geojsonFeature.length; i++) {
                                
                                    const name = geojsonFeature[i].properties.name
                                
                                        if (countryName == name) {
                                            geojsonFeature = geojsonFeature[i]
                                        }
                                    
                                }
                            
                            L.geoJSON(geojsonFeature, { color: "red" }).addTo(mymap) // <-- highlighting border

                            let features = L.geoJSON(geojsonFeature) // <-- getting border for bound

                            // display the whole border into map

                            mymap.fitBounds(features.getBounds(), {
                                padding: [20, 20]
                            });
                        },
                        error: function(request,error) {
                            // alert(request)
                            $(".loading").css("display", "none");
                            $(".showCountryName").css("display", "block");
                            $('#countryName').html(`Error, "${selCountry}" isn't available right now...`);
                            $('#flag').html(`😔`);                                    
                        }
                    })    
                });
                b.appendChild(c);
              }
              x[i].appendChild(b);
              a.addEventListener("click", function(e) {
                  /*when the select box is clicked, close any other select boxes,
                  and open/close the current select box:*/
                  e.stopPropagation();
                  closeAllSelect(this);
                  this.nextSibling.classList.toggle("select-hide");
                  this.classList.toggle("select-arrow-active");
                });
            }
            function closeAllSelect(elmnt) {
              /*a function that will close all select boxes in the document,
              except the current select box:*/
              var x, y, i, xl, yl, arrNo = [];
              x = document.getElementsByClassName("select-items");
              y = document.getElementsByClassName("select-selected");
              xl = x.length;
              yl = y.length;
              for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                  arrNo.push(i)
                } else {
                  y[i].classList.remove("select-arrow-active");
                }
              }
              for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                  x[i].classList.add("select-hide");
                }
              }
            }
            /*if the user clicks anywhere outside the select box,
            then close all select boxes:*/
            document.addEventListener("click", closeAllSelect);
        }
      })


    // SEARCH INPUT

    $.ajax({
        type: "GET",
        url: "libs/php/getGazetteerBySearch.php",
        success: function(data) {

            // console.log(data)

            const countryName = data.name
            const countryISO = data.iso
            
            for ( var i = 0; i < countryName.length; i++ ) {
            
                let country = countryName[i]

                countriesForSearch.push({
                    name: country, 
                    code: countryISO[i]})
 
                autocomplete(document.getElementById("myInput"), countriesForSearch.map(country => country.name).sort());
            
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

                            $.ajax({
                                type: "GET",
                                url: `libs/php/selCountry.php?selCountry=${countriesForSearch.find(c => c.name == selCountry).code}`,
                                success: function(data) {

                                    $(".loading").css("display", "none");
                                    $(".showCountryName").css("display", "block");
                                
                                    // console.log(data)
                                
                                    let countryName = data.country
                                    let cityName = data.capital
                                    let countryFlag = data.flag
                                
                                    let showTime = data.countryTime.slice(11, 16)                               
                                                                    
                                    // WEATHER ICONS

                                    let weatherDescription = data.description
                                    let weatherTemp = data.temp
                                    let feels_like = data.feels_like
                                    let humidityPercentage = data.humidity

                                    function convertToCelsius(kelvin) {
        
                                        const celsius = 273.15
        
                                        return Math.floor(kelvin - celsius)
                                      }
        
                                    let mainTemp = convertToCelsius(weatherTemp)
                                    let feelsLike = convertToCelsius(feels_like)
                                
                                    const getTime = data.countryTime.slice(11, 13)
                                
                                    // console.log(getTime)
                                
                                    if (weatherDescription.includes("sun") || weatherDescription.includes("sunny") || weatherDescription.includes("clear")){
                                    
                                        (getTime >= 6 && getTime <= 18) ? $("#changeIcon").html("&#127774") : $("#changeIcon").html("🌕")
                                    
                                    } else if (weatherDescription.includes("cloudy")){
                                        $("#changeIcon").html("☁️")
                                    } else if (weatherDescription.includes("rain") || weatherDescription.includes("rainny") || weatherDescription.includes("overcast") || weatherDescription.includes("drizzle")){
                                        $("#changeIcon").html("&#127783")
                                    } else if (weatherDescription.includes("cloud") || weatherDescription.includes("clouds")){    

                                        if (getTime >= 6 && getTime <= 18) {
                                            $("#changeIcon").html("&#127780")
                                        } else {
                                            $("#changeIcon").html(cloudyNight)
                                            $(".cloudyPicture").css("display", "block")
                                        }  
                                        
                                    } else if (weatherDescription.includes("snow")){
                                        $("#changeIcon").html("❄️")
                                    } else if (weatherDescription.includes("thunder") || weatherDescription.includes("storm")){
                                        $("#changeIcon").html("⛈")
                                    } else if (weatherDescription.includes("mist") || weatherDescription.includes("fog")){
                                        $("#changeIcon").html("🌫")
                                    } else {
                                        $("#changeIcon").html("🌍")
                                    }
                                
                                    let cityPopulation = data.population
                                
                                    let iso = data.iso_code
                                    let currencyName = data.name
                                    let currencySymbol = data.symbol   
                                
                                    $('#countryName').html("<b>Country:</b> " + countryName);
                                    $('#cityName').html("<b>Capital City:</b> " + cityName);
                                    $('#flag').html(countryFlag);
                                    $('#time').html(`(${showTime})`);

                                    $('#temperature').html(mainTemp + "˚C | ");
                                    $('#humidity').html("  HUMIDITY: " + humidityPercentage + "%");  
                                    $('#feelsLike').html("  FEELS LIKE " + feelsLike + "˚C");
                                    $('#weatherCondition').html(weatherDescription.toUpperCase());                                             
                                
                                    $('#population').html("<b>Population:</b> " + cityPopulation + " citizens");
                                
                                    $('#isoCode').html("<b>Currency;</b> " + iso + ", ");
                                    $('#currencyName').html(currencyName);
                                    $('#currencySymbal').html(currencySymbol);
                                
                                    // WIKI LINK
                                
                                    let wikiLink = data.wikipediaUrl
                                    let wikiSummary = data.summary
                                    let wikiThumnail = data.thumbnailImg
                                
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
                                
                                    // COVID
                                
                                    $('#active').html(data.Active);
                                    $('#confirmed').html(data.Confirmed);
                                    $('#deaths').html(data.Deaths);
                                    $('#recovered').html(data.Recovered);
                                
                                    // CURRENCY COMPARING

                                    let getCurrencies = data.rates
                                    let compareToUSD = data.base
                                    let compareToEUR = "EUR"
                                    let compareToGBP = "GBP"
                                
                                    const listOfCurrency = Object.entries(getCurrencies)
                                    for (const [cName, cValue] of listOfCurrency) {
                                    
                                        $('#exchangeRate').html("<b>Exchange rate</b> ⚖");   
                                    
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
                                    const poiFromWiki = data.placesNearBy

                                    for (let i = 0; i < poiFromWiki.length; i++) {
                                        var markerPlaces = L.marker([poiFromWiki[i].lat, poiFromWiki[i].lng], {icon: wikiMarker}).addTo(mymap)
                                    
                                        var nearByName = poiFromWiki[i].title
                                        var summary = poiFromWiki[i].summary
                                        var thumnail = poiFromWiki[i].thumbnailImg
                                        var linkClick = poiFromWiki[i].wikipediaUrl
    
                                        markerPlaces.bindPopup(
                                            `<div style="text-align: center;">
                                            <a href="https://${linkClick}" target="blank">
                                            <img class="thumnail" id="thumnail" src="${thumnail}" alt="Picture of the location">
                                            <h4>${nearByName}</h4>
                                            <p>${summary}</p>
                                            </a>
                                            </div>`
                                        ).openPopup()
                                    
                                    }
                                
                                    for (let i = 0; i < poi.length; i++) {
                                        var markerPlaces = L.marker([poi[i].lat, poi[i].lng], {icon: wikiMarker}).addTo(mymap)
                                    
                                        var nearByName = poi[i].title
                                        var summary = poi[i].summary
                                        var urlClick = poi[i].wikipediaUrl
    
                                        markerPlaces.bindPopup(
                                            `<div style="text-align: center;">
                                            <a href="https://${urlClick}" target="blank">
                                            <h4>${nearByName}</h4>
                                            <p>${summary}</p>
                                            </a>
                                            </div>`
                                        ).openPopup()
                                    
                                    }
                                
                                    var lat = data.lat
                                    var lng = data.lng
                                    var wikiURL = data.wikipediaUrl
                                
                                    // mymap.setView([lat, lng], 14);
                                
                                    var marker = L.marker([lat, lng], {icon: wikiMarker}).addTo(mymap)
                                        marker.bindPopup(
                                            `<div style="text-align: center;">
                                            <a href="https://${wikiURL}" target="blank">
                                            <img class="thumnail" id="thumnail" src="${wikiThumnail}" alt="Picture of the location">
                                            </a>
                                            <p>Picture of ${cityName} City</p>
                                            </div>`
                                            ).openPopup()
                                        
                                            var circle = L.circle([lat, lng], {
                                                    color: "red",
                                                    fillColor: "#f03",
                                                    fillOpacity: 0.5,
                                                    radius: 50
                                            }).addTo(mymap)
                                        
                                    // HIGHLIGHT COUNTRY BORDER
                                        
                                    let geojsonFeature = data.border
                                    // console.log(geojsonFeature)
                                        
                                        for (i = 0; i < geojsonFeature.length; i++) {
                                        
                                            const name = geojsonFeature[i].properties.name
                                        
                                                if (countryName == name) {
                                                    geojsonFeature = geojsonFeature[i]
                                                }
                                            
                                        }
                                    
                                    L.geoJSON(geojsonFeature, { color: "red" }).addTo(mymap) // <-- highlighting border

                                    let features = L.geoJSON(geojsonFeature) // <-- getting border for bound

                                    // display the whole border into map
    
                                    mymap.fitBounds(features.getBounds(), {
                                        padding: [20, 20]
                                    });
                                },
                                error: function(request,error) {
                                    // alert(request)
                                    $(".loading").css("display", "none");
                                    $(".showCountryName").css("display", "block");
                                    $('#countryName').html(`Error, "${selCountry}" isn't available right now...`);
                                    $('#flag').html(`😔`);                                    
                                }
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
        },
    })
}

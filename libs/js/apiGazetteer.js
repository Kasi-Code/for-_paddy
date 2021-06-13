// $(window).on('load', function () { if ($('#preloader').length) {
//     $('#preloader').delay(100).fadeOut('slow', function () { $(this).remove();
//     }); }
// });

const getLocationBtn = document.querySelector(".getLocationBtn");

getLocationBtn.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude
        lat = position.coords.latitude

        fetch(`/libs/php/getGazetteer.php?lat=${lat}&long=${long}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                let countryName = data.country.components.state
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
                
                const kelvin = weatherTemp
                const celsius = kelvin - 273
                let newton = celsius * ( 33 / 100 )
                newton = Math.floor(newton)

                $('#countryName').html(countryName);
                $('#cityName').html(cityName);
                $('#flag').html(countryFlag);

                $('#weatherCondition').html(weatherDescription.toUpperCase());
                $('#temperature').append(newton + "˚C");

                $('#population').append(cityPopulation);

                $('#isoCode').append(iso + ", ");
                $('#currencyName').append(currencyName);
                $('#currencySymbal').append(currencySymbol);

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
            }) 
            .catch(error => {console.log(error)})
    })
})


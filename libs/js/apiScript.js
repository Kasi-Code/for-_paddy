$(window).on('load', function () { if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () { $(this).remove();
    }); }
});
$('#btnSubmit1').click(function() {

    $.ajax({
        url: "libs/php/getLangInfo.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {

            console.log(JSON.stringify(result));

            let selectedLang = $('#selLang').val()

            if (result.status.name == "ok") {
                if (selectedLang == "Arabic") {
                    $('#selectedLang').html(selectedLang + ":");
                    $('#txtName').html(result['data'][0]['alternateNames'][2]["name"]);
                } else if (selectedLang == "Russian") {
                    $('#selectedLang').html(selectedLang + ":");
                    $('#txtName').html(result['data'][0]['alternateNames'][3]["name"]);
                } else if (selectedLang == "Thai") {
                    $('#selectedLang').html(selectedLang + ":");
                    $('#txtName').html(result['data'][0]['alternateNames'][54]["name"]);
                }

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    }); 
    return false;
});
$('#btnSubmit2').click(function() {

    $.ajax({
        url: "libs/php/getEarthInfo.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {

            console.log(JSON.stringify(result));

            let event17 = result.data[6]
            let event11 = result.data[0]
            let event07 = result.data[2]

            let selectedYear = $('#selYear').val()

            if (result.status.name == "ok") {

                if (selectedYear == "2017") {
                    $('#selectedYear').html("Earthquakes in " + selectedYear + ":");
                    $('#displayDatetime').html("Event: " + event17["datetime"] + "  |  ");
                    $('#displayDepth').html("Depth: " + event17["depth"] + "  |  ");
                    $('#displayMagnitude').html("Magnitude " + event17["magnitude"]);
                } else if (selectedYear == "2011") {
                    $('#selectedYear').html("Earthquakes in " + selectedYear + ":");
                    $('#displayDatetime').html("Event: " + event11["datetime"] + "  |  ");
                    $('#displayDepth').html("Depth: " + event11["depth"] + "  |  ");
                    $('#displayMagnitude').html("Magnitude " + event11["magnitude"]);
                } else if (selectedYear == "2007") {
                    $('#selectedYear').html("Earthquakes in " + selectedYear + ":");
                    $('#displayDatetime').html("Event: " + event07["datetime"] + "  |  ");
                    $('#displayDepth').html("Depth: " + event07["depth"] + "  |  ");
                    $('#displayMagnitude').html("Magnitude " + event07["magnitude"]);
                }

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    }); 
    return false;
});



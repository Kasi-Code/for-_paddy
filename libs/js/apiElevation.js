$(window).on('load', function () { if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () { $(this).remove();
    }); }
});

$('#btnSubmit3').click(function() {

    $.ajax({
        url: "libs/php/getElevationInfo.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {

            console.log(JSON.stringify(result));

            let selElevation = $('#selElevation').val()

            if (result.status.name == "ok") {
                if (selElevation == 8) {
                    
                    let display8 = result.data[1].summary
                    let getImage8 = result.data[1].thumbnailImg

                    $('#selectedElevation').html("Elevation " + selElevation + ";");
                    $('#display').html(display8);
                    $("#image").attr("src", getImage8)
                } else if (selElevation == 60) {
                    
                    let display60 = result.data[2].summary
                    let getImage60 = result.data[2].thumbnailImg

                    $('#selectedElevation').html("Elevation " + selElevation + ";");
                    $('#display').html(display60);
                    $("#image").attr("src", getImage60)
                } else if (selElevation == 262) {
                    
                    let display262 = result.data[0].summary
                    let getImage262 = result.data[0].thumbnailImg

                    $('#selectedElevation').html("Elevation " + selElevation + ";");
                    $('#display').html(display262);
                    $("#image").attr("src", getImage262)
                }

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    }); 
    return false;
});
$(document).ready(function() {
    $("#search").keyup(function() {
        $("#countryName").html("")
        var searchField = $("search").val()
        var expression = new RegExp(searchField, "i")
        $.getJSON("/libs/php/getGazetteer.php", function(data) {
            $.each(data, function(key, value) {

                var searchFor = value.countryBorders.features.properties

                if(searchFor.name.search(expression) != -1) {
                    $("#countryName").append(searchFor.name)
                }
            })
        })
    })
})
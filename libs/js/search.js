$(document).ready(function() {
    $("#search").keyup(function() {
        $("#countryName").html("")
        var searchField = $("search").val()
        var expression = new RegExp(searchField, "i")
        $.getJSON("/libs/php/getGazetteer.php", function(data) {
            $.each(data, function(key, value) {
                if(value.name.search(expression) != -1 || value.location.search(expression) != -1) {
                    $("#countryName").append()
                }
            })
        })
    })
})
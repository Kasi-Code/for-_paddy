// $(document).ready(function() {
//     $("#search").keyup(function() {
//         $("#countryName").html("")
//         var searchField = $("search").val()
//         var expression = new RegExp(searchField, "i")
//         $.getJSON("/libs/php/getGazetteer.php", function(data) {
//             $.each(data, function(key, value) {

//                 var searchFor = value.countryBorders.properties

//                 if(searchFor.name.search(expression) != -1) {
//                     $("#isoCode").append(searchFor.iso_a3)
//                 }
//             })
//         })
//     })
// })

const search = document.getElementById("search")
const name = document.getElementById("countryName")

const searchState = async searchText => {
    const res = await fetch("/libs/php/getGazetteerBySearch.php")
    const states = await res.json()

    console.log(states)
}

search.addEventListener("input", () => searchState(search.value))
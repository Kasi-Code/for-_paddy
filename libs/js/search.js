
const search = document.getElementById("search")
const matchList = document.getElementById("searchResults")

const searchState = async searchText => {
    const res = await fetch("/libs/php/getGazetteerBySearch.php")
    let states = await res.json()
    const result = states.countryBorders
    // console.log(result)

    var matches = result.filter(state => {
        const regex = new RegExp(`^${searchText}`, "gi")
        return state.properties.name.match(regex) || state.properties.iso_a2.match(regex)
    })

    if (searchText.length === 0) {
        matches = []
        matchList.innerHTML = ""
    }

    // console.log(matches)
    outputHTML(matches)
}

const outputHTML = matches => {
    
    if (matches.length > 0) {
        const html = matches.map(match => 
            // $('#searchName').html(`${match.properties.name} (${match.properties.iso_a2})`)
            `
            <div class="searchList">
                <p style="font-weight: bold;">${match.properties.name} (${match.properties.iso_a2})</p>
                <hr>
            </div>
            `
        )
        .join("")
        
        // console.log(html)
        matchList.innerHTML = html
    }
}



search.addEventListener("input", () => searchState(search.value))

const submitBtm = document.getElementById("submitBtm");

const id_numberV = document.getElementById("id_number");
const locationV = document.getElementById("location");

const search_first_name = document.getElementById("search_first_name");
const search_last_name = document.getElementById("search_last_name");
const search_id_number = document.getElementById("search_id_number");

let selectedRow = null
let personnelForSearch = []

let formData = {}
let matches;

// WHEN CLICKED DELETE BUTTON

$('tbody').on('click', '.deleteBtn', function(e){
    onDelete(e.target.dataset.id)
})

$('tbody').on('click', '.deleteLocationBtn', function(e){
    deleteLocation(e.target.dataset.id)
})

$('tbody').on('click', '.deleteDepartmentBtn', function(e){
    deleteDepartment(e.target.dataset.id)
})

// WHEN CLICKED EDIT BUTTON

$('tbody').on('click', '.editBtn', function(e){

    event.preventDefault();
    $(".searchStaffDiv").css("display", "none")
    $(".addStaffDiv").css("display", "block")
    $("#submitBtm").css("display", "none")
    $("#editBtnForm").css("display", "block")

    $(".searchButton").css("display", "block")
    $(".inputButton").css("display", "none")

    onEdit(this, e.target.dataset.id)

    $('#cancelBtm').on('click', () => {
        
        event.preventDefault();
        resetForm();

        $("#submitBtm").css("display", "block")
        $("#editBtnForm").css("display", "none")
    })
})

$('tbody').on('click', '.editLocationBtn', function(e){

    // switchToInput()

    $("#submitLocationDiv").css("display", "none")
    $("#editLocationBtnForm").css("display", "block")

    onEditLocation(this, e.target.dataset.id)

    $('#cancelLocationBtm').on('click', () => {
        
        event.preventDefault();
        document.getElementById("add_location").value = "";

        $("#submitLocationDiv").css("display", "block")
        $("#editLocationBtnForm").css("display", "none")
        // location.reload()
    })
})

$('tbody').on('click', '.editDepartmentBtn', function(e){

    $("#submitOfficeBtm").css("display", "none")
    $("#editOfficeBtnForm").css("display", "block")

    onEditDepartment(this, e.target.dataset.id)

    $('#cancelOfficeBtm').on('click', () => {
        
        event.preventDefault();

        $("#inputDivDepartment").load(location.href + " #inputDivDepartment");
    })
})

// SWITCHES SEARCH AND INPUT

$('#searchButton').on('click', () => {

    $(".searchStaffDiv").css("display", "block")
    $(".addStaffDiv").css("display", "none")

    $(".searchButton").css("display", "none")
    $(".inputButton").css("display", "block")

    resetTbody()
    // resetForm()
})

$('#inputButton').on('click', switchToInput = () => {    

    resetTbody()
    getAll()

    $(".searchStaffDiv").css("display", "none")
    $(".addStaffDiv").css("display", "block")

    $(".searchButton").css("display", "block")
    $(".inputButton").css("display", "none")
})

// SHOW BUTTON TO SELECT ADD LOCATION OR DEPARTMENT

$('#officeButton').on('click', () => {

    resetTbody()
    resetForm()

    $(".addLocationOrDepartment").css("display", "block")
    $(".homeButton").css("display", "block")

    $(".addStaffDiv").css("display", "none")
    $(".addLocationDiv").css("display", "none")
    $(".addOfficeDiv").css("display", "none")
    $(".searchStaffDiv").css("display", "none")
    $(".searchButton").css("display", "none")
    $(".inputButton").css("display", "none")
})

$('#homeButton').on('click', () => {

    location.reload()

    
})

const formSubmit = ()=> {
        const formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
}

const resetTbody = ()=> {

    matches = []

    var tbody = document.getElementById('id_data')
    tbody.innerHTML = ""

}

const insertNewRecord = (data)=> {

    var table = document.getElementById("list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    $(cell1).html(data.id_number);
    // cell1.innerHTML = data.id_number;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.first_name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.last_name;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.department;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.location;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<button class="editDeleteBtm editBtn" data-id="${data.id_number}" id="editBtn-${data.id_number}">Edit</button>
                       <button class="editDeleteBtm deleteBtn" data-id="${data.id_number}" id="deleteBtn-${data.id_number}">Delete</button>`;

    cell1.setAttribute("class", "tableBody");
    cell2.setAttribute("class", "tableBody");
    cell3.setAttribute("class", "tableBody");
    cell4.setAttribute("class", "tableBody");
    cell5.setAttribute("class", "tableBody");
    cell6.setAttribute("class", "tableBody");
    cell7.setAttribute("class", "tableBody");
}

const insertNewLocation = (data)=> {

    var table = document.getElementById("locationList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    $(cell1).html(data.id_number);
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.location;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<button class="editDeleteBtm editLocationBtn" data-id="${data.id_number}" id="editBtn-${data.id_number}">Edit</button>
                       <button class="editDeleteBtm deleteLocationBtn" data-id="${data.id_number}" id="deleteBtn-${data.id_number}">Delete</button>`;

    cell1.setAttribute("class", "tableBody");
    cell2.setAttribute("class", "tableBody");
    cell3.setAttribute("class", "tableBody");
}

const insertDepartment = (data)=> {

    var table = document.getElementById("departmentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    $(cell1).html(data.id_number);
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.department;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.location;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button class="editDeleteBtm editDepartmentBtn" data-id="${data.id_number}" id="editBtn-${data.id_number}">Edit</button>
                       <button class="editDeleteBtm deleteDepartmentBtn" data-id="${data.id_number}" id="deleteBtn-${data.id_number}">Delete</button>`;

    cell1.setAttribute("class", "tableBody");
    cell2.setAttribute("class", "tableBody");
    cell3.setAttribute("class", "tableBody");
    cell4.setAttribute("class", "tableBody");
}

const resetForm = ()=> {
    // document.getElementById("id_number").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    // document.getElementById("location").value = "";

    // document.getElementById("search_first_name").value = "";
    // document.getElementById("search_last_name").value = "";
    // document.getElementById("search_id_number").value = "";
    selectedRow = null;
}

const onEdit = (td, id)=> {

    selectedRow = td.parentElement.parentElement;

    // document.getElementById("id_number").value = selectedRow.cells[0].innerHTML;
    document.getElementById("first_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("last_name").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("department").value = selectedRow.cells[4].innerHTML;
    // document.getElementById("location").value = selectedRow.cells[5].innerHTML;

    $('#doneBtm').on('click', onSubmit = () => {
        
        event.preventDefault();
    
        const first_nameV = document.getElementById("first_name").value;
        const last_nameV = document.getElementById("last_name").value;
        const emailV = document.getElementById("email").value;
        const departmentV = document.getElementById("department").value;
            
            $.ajax({
                type: "POST",
                url: `companydirectory/libs/php/updatePersonnelByID.php?first_name=${first_nameV}&last_name=${last_nameV}&email=${emailV}&departmentID=${departmentV}&id=${id}`,
                success: function(data) {

                    getAll()
                    getAllDepartments()
                    $("#id_data").load(location.href + " #id_data");
                    $("#addStaffDiv").load(location.href + " #addStaffDiv");

                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })
    })
}

const onDelete = (id)=> {

    if (confirm('Are you sure to delete this record ?')) {     
        
            $.ajax({
                type: "GET",
                url: `companydirectory/libs/php/deletePersonnelByID.php?id=${id}`,
                success: function(data) {
    
                    getAll()

                    $("#id_data").load(location.href + " #id_data");
                   
                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })      
    }
}

$('#submitBtm').on('click', onSubmit = () => {

    event.preventDefault();

    const first_nameV = document.getElementById("first_name").value;
    const last_nameV = document.getElementById("last_name").value;
    const emailV = document.getElementById("email").value;
    const departmentV = document.getElementById("department").value;
        
        $.ajax({
            type: "POST",
            url: `companydirectory/libs/php/insertAll.php?first_name=${first_nameV}&last_name=${last_nameV}&email=${emailV}&departmentID=${departmentV}`,
            success: function(data) {

                getAll()

                $("#id_data").load(location.href + " #id_data");

                resetForm()

            },
            error:  function(request,error) {
                console.log(request)                                   
            }
        })
})

// ADDING LOCATION

$('#addLocation').on('click', () => {

    event.preventDefault();
    
    $("#addLocationOrDepartment").css("display", "none")
    $("#editLocationBtnForm").css("display", "none")
    $(".addLocationDiv").css("display", "block")
    $(".list").css("display", "none")
    $(".departmentList").css("display", "none")
    $(".locationList").css("display", "block")
    
    resetTbody()
    resetForm()
})

$('#submitLocation').on('click', submitLocation = () => {

    event.preventDefault();

    const locationV = document.getElementById("add_location").value;
        
        $.ajax({
            type: "POST",
            url: `companydirectory/libs/php/insertLocation.php?locationName=${locationV}`,
            success: function(data) {

                getAllLocation()

                $("#location_data_list").load(location.href + " #location_data_list");

                document.getElementById("add_location").value = "";

            },
            error:  function(request,error) {
                console.log(request)                                   
            }
        })
})

const deleteLocation = (id)=> {

    event.preventDefault();

    if (confirm('Are you sure to delete this record ?')) {            
        
            $.ajax({
                type: "GET",
                url: `companydirectory/libs/php/deleteLocationByID.php?id=${id}`,
                success: function(data) {

                    getAllLocation()

                    $("#location_data_list").load(location.href + " #location_data_list");

                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })

        $("#location_data_list").load(location.href + " #location_data_list");
    }
}

const onEditLocation = (td, id)=> {

    selectedRow = td.parentElement.parentElement;

    document.getElementById("add_location").value = selectedRow.cells[1].innerHTML;

    $('#doneLocationBtm').on('click', onSubmit = () => {

        event.preventDefault();
    
        const location_nameV = document.getElementById("add_location").value;
            
            $.ajax({
                type: "POST",
                url: `companydirectory/libs/php/updateLocationByID.php?location_name=${location_nameV}&id=${id}`,
                success: function(data) {

                    getAllLocation()

                    $("#location_data_list").load(location.href + " #location_data_list");     

                    document.getElementById("add_location").value = "";
                    $("#submitLocationBtnForm").load(location.href + " #submitLocationBtnForm");    
                    
                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })             
    })
}

// ADDING DEPARTMENT / OFFICE

$('#addDepartment').on('click', () => {

    event.preventDefault();

    $("#addLocationOrDepartment").css("display", "none")
    $("#editLocationBtnForm").css("display", "none")
    $(".addOfficeDiv").css("display", "block")
    $(".list").css("display", "none")
    $(".locationList").css("display", "none")
    $(".departmentList").css("display", "block")

    resetTbody()
    resetForm()
})

$('#submitOffice').on('click', submitDepartment = () => {

    event.preventDefault();

    const departmentNameV = document.getElementById("add_department").value;
    const departmentLocationV = document.getElementById("select_location").value;
        
        $.ajax({
            type: "POST",
            url: `companydirectory/libs/php/insertDepartment.php?name=${departmentNameV}&locationID=${departmentLocationV}`,
            success: function(data) {

                getAllDepartments()

                $("#department_data_list").load(location.href + " #department_data_list");

                document.getElementById("add_department").value = "";

            },
            error:  function(request,error) {
                console.log(request)                                   
            }
        })
})

const deleteDepartment = (id)=> {

    event.preventDefault();

    if (confirm('Are you sure to delete this record ?')) {            
        
            $.ajax({
                type: "GET",
                url: `companydirectory/libs/php/deleteDepartmentByID.php?id=${id}`,
                success: function(data) {

                    getAllDepartments()

                    $("#department_data_list").load(location.href + " #department_data_list");

                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })
    }
}

const onEditDepartment = (td, id)=> {

    selectedRow = td.parentElement.parentElement;

    document.getElementById("add_department").value = selectedRow.cells[1].innerHTML;
    document.getElementById("select_location").value = selectedRow.cells[1].innerHTML;

    $('#doneOfficeBtm').on('click', onSubmit = () => {

        event.preventDefault();
    
        const department_nameV = document.getElementById("add_department").value;
        const location_V = document.getElementById("select_location").value;
            
            $.ajax({
                type: "POST",
                url: `companydirectory/libs/php/updateDepartmentByID.php?department_name=${department_nameV}&location_V=${location_V}&id=${id}`,
                success: function(data) {                  
            
                    getAllDepartments()

                    $("#department_data_list").load(location.href + " #department_data_list");  
                    $("#inputDivDepartment").load(location.href + " #inputDivDepartment"); 

                    getAllLocation()

                },
                error:  function(request,error) {
                    console.log(request)                                   
                }
            })
    })
}

const getAll = ()=> {

    $.ajax({
        url: "companydirectory/libs/php/getAll.php",
        type: "GET",
        dataType: "json",
        success: function(result) {
            // console.log(result)

            let personnel = result.data

            personnel.forEach(data => {

            formData["id_number"] = data.id
            formData["first_name"] = data.firstName
            formData["last_name"] = data.lastName
            formData["email"] = data.email
            formData["department"] = data.department
            formData["location"] = data.location

            insertNewRecord(formData)
            })
        },
    })

}

const getAllLocation = ()=> {

    $.ajax({
        url: "companydirectory/libs/php/getAllLocations.php",
        type: "GET",
        dataType: "json",
        success: function(result) {

            result.data.forEach(location => {
                
                $("#select_location").append(`<option value="${location.id}">${location.name}</option>`);
            })
        
            let location = result.data

            getAll()

            $("#id_data").load(location.href + " #id_data");

            location.forEach(data => {

            formData["id_number"] = data.id
            formData["location"] = data.name

            insertNewLocation(formData)
            })
        },
    })

}

const getAllDepartments = ()=> {

    $.ajax({
        url: "companydirectory/libs/php/getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: function(result) {

            result["data"].forEach(department => {
                
                $(".department").append(`<option value="${department["id"]}">${department["name"]}</option>`);
            })

            let department = result.data

            department.forEach(data => {
 
             formData["id_number"] = data.id
             formData["department"] = data.name
             formData["location"] = data.location
 
             insertDepartment(formData)
             })
        },
    })
}

window.onload = ()=> {

    // getAll()

    getAllLocation()

    getAllDepartments()
    
    // SEARCH INPUT

    const searchStates = async (FN, LN, ID) => {
        const res = await fetch("companydirectory/libs/php/getAll.php")
        const states = await res.json()
        
        matches = states.data.filter(state => {
            const regexFN = new RegExp(`^${FN}`, "gi")
            const regexLN = new RegExp(`^${LN}`, "gi")
            const regexID = new RegExp(`^${ID}`, "gi")

            resetTbody()

            return state.firstName.match(regexFN) && state.lastName.match(regexLN) && state.id.match(regexID)
        })

        if (FN.length === 0 && LN.length === 0 && ID.length === 0) {

            resetTbody()

        }

        outputHtml(matches)
    }

        const outputHtml = matches => {

            if (matches) {
                
                return matches.forEach(matched => {
        
                    formData["id_number"] = matched.id
                    formData["first_name"] = matched.firstName
                    formData["last_name"] = matched.lastName
                    formData["email"] = matched.email
                    formData["department"] = matched.department
                    formData["location"] = matched.location

                    insertNewRecord(formData)
                    
                })          

            }
        }

    [search_first_name, search_last_name, search_id_number].forEach(function(input) {
    
        input.addEventListener("input", ()=> searchStates(search_first_name.value, search_last_name.value, search_id_number.value))

    })                
}
